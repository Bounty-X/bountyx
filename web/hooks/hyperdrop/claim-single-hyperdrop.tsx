import { useBountyXHyperDropClaimSingleHyperdrop, usePrepareBountyXHyperDropClaimSingleHyperdrop } from '@/lib/blockchain'
import { useContractModal } from '../../components/shared/contract-interaction-dialog-context'
import { mintInteractionLabels } from '../../lib/hypercert/chainInteractions'
import { cidToIpfsUri } from '../../lib/hypercert/formatting'
import { getBountyxStorage } from '@/bountyxlib/bountyx-storage'
import { useParseBlockchainError } from '../../lib/hypercert/parse-blockchain-error'
import { Address as HexString } from 'wagmi'
import { useAccountLowerCase } from '../hypercert/account'
import { HypercertMetadata, HypercertMinting } from '@hypercerts-org/hypercerts-sdk'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { BigNumber, Bytes } from 'ethers'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useWaitForTransaction } from 'wagmi'
import { EligibleGroupedClaim } from '@/lib/hyperdrop/hyperdrop-eligibilty'
import { hexlify } from 'ethers/lib/utils.js'
import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { FractionOwnership } from '@/app/(claim)/claim/page'

export const DEFAULT_ALLOWLIST_PERCENTAGE = 50

const generateAndStoreTree = async (pairs: FractionOwnership[]) => {
  const tuples = pairs.map((p) => [p.owner, p.fraction])
  const tree = StandardMerkleTree.of(tuples, ['address', 'uint256'])
  const cid = await getBountyxStorage().storeData(JSON.stringify(tree.dump()))
  return { cid, root: tree.root as HexString }
}

export const useClaimSingleHyperdrop = ({ claim, onComplete }: { claim: EligibleGroupedClaim; onComplete?: () => void }) => {
  const [cidUri, setCidUri] = useState<string>()
  const [_units, setUnits] = useState<number>()
  const [merkleRoot, setMerkleRoot] = useState<HexString>()
  const minter = HypercertMinting({ provider: undefined, chainConfig: {} })

  const stepDescriptions = {
    uploading: 'Uploading metadata to ipfs',
    preparing: 'Preparing contract write',
    writing: 'Minting hypercert on-chain',
    storingEligibility: 'Storing eligibility',
    complete: 'Done minting',
  }

  const { address } = useAccountLowerCase()
  const { setStep, showModal, hideModal } = useContractModal()
  const parseBlockchainError = useParseBlockchainError()

  const initializeWrite = async ({
    metadata,
    units,
    ownersToFraction,
    allowlistPercentage,
  }: {
    metadata: HypercertMetadata & BountyxMetadataCollection
    units: number
    ownersToFraction: FractionOwnership[]
    allowlistPercentage?: number
  }) => {
    setStep('uploading')

    if (ownersToFraction) {
      // Handle manual creation of proof and merkle tree
      const { cid: merkleCID, root } = await generateAndStoreTree(ownersToFraction)
      if (!merkleCID) {
        toast('Something went wrong while generating merkle tree from the inputs', { type: 'error' })
        hideModal()
        return
      }
      console.log('merkleCID', merkleCID)
      console.log('root', root)
      const cid = await getBountyxStorage().storeBountyxMetadata({
        ...metadata,
        allowList: cidToIpfsUri(merkleCID),
      })
      console.log('cid', cid)

      if (!cid) {
        toast('Something went wrong while uploading metadata to IPFS', {
          type: 'error',
        })
        hideModal()
        return
      }

      setCidUri(cidToIpfsUri(cid))
      setMerkleRoot(root)
      const fractionsSum = _.sum(ownersToFraction.map((x) => x.fraction.toNumber()))
      if (fractionsSum != units) {
        throw new Error(`Fractions sum ${fractionsSum} does not match units ${units}`)
      }
      setUnits(units)
    }

    setStep('Preparing')
  }

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isLoadingPrepareContractWrite,
    isSuccess: isReadyToWrite,
  } = usePrepareBountyXHyperDropClaimSingleHyperdrop({
    args: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      address! as HexString,
      hexlify(claim.leaves[0]) as `0x${string}`,
      claim.proofs[0],
      hexlify(claim.merkleRoot) as `0x${string}`, // hyperdrop merkle root
      BigNumber.from(_units || 0),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      merkleRoot!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      cidUri!,
      minter.transferRestrictions.FromCreatorOnly,
    ],
    onError: (error) => {
      toast(parseBlockchainError(error, mintInteractionLabels.toastError), {
        type: 'error',
      })
      console.error(error)
    },
    onSuccess: () => {
      setStep('writing')
    },
    enabled: !!cidUri && _units !== undefined && merkleRoot !== undefined,
  })

  const {
    data,
    error: writeError,
    isError: isWriteError,
    isLoading: isLoadingContractWrite,
    write,
  } = useBountyXHyperDropClaimSingleHyperdrop<'prepared'>(config as any) // TODO: Fix this

  const {
    isLoading: isLoadingWaitForTransaction,
    isError: isWaitError,
    error: waitError,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      toast(mintInteractionLabels.toastSuccess, {
        type: 'success',
      })
      setStep('storingEligibility')
      setStep('complete')
      hideModal()
      onComplete?.()
    },
    onError: async () => {
      toast(mintInteractionLabels.toastRejected)
    },
  })

  useEffect(() => {
    if (isReadyToWrite && write) {
      write()
    }
  }, [isReadyToWrite])

  return {
    write: async ({
      metadata,
      units,
      ownersToFraction,
      allowlistPercentage,
    }: {
      metadata: HypercertMetadata & BountyxMetadataCollection
      units: number
      ownersToFraction: FractionOwnership[]
      allowlistPercentage?: number
    }) => {
      showModal({ stepDescriptions })
      await initializeWrite({
        metadata,
        units,
        ownersToFraction,
        allowlistPercentage,
      })
    },
    isLoading: isLoadingPrepareContractWrite || isLoadingContractWrite || isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
    isReadyToWrite,
  }
}
