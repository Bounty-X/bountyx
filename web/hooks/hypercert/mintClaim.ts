import { useEffect, useState } from 'react'
import { HypercertMetadata } from '@hypercerts-org/hypercerts-sdk'
import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { useContractModal } from '../../components/shared/contract-interaction-dialog-context'
import { useParseBlockchainError } from '../../lib/hypercert/parse-blockchain-error'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { BigNumber } from 'ethers'
import { mintInteractionLabels } from '../../lib/hypercert/chainInteractions'
import { HyperCertMinterFactory } from '@hypercerts-org/hypercerts-protocol'
import { toast } from 'react-toastify'
import { getBountyxStorage } from '@/bountyxlib/bountyx-storage'
import { useAccountLowerCase } from './../../hooks/hypercert/account'
import { cidToIpfsUri } from '../../lib/hypercert/formatting'

export const useMintClaim = ({ onComplete }: { onComplete?: () => void }) => {
  const [cidUri, setCidUri] = useState<string>()
  const [units, setUnits] = useState<number>()
  //   const minter = HypercertMinting({ provider: undefined, chainConfig: {} })

  const stepDescriptions = {
    uploading: 'Uploading metadata to ipfs',
    writing: 'Minting hypercert on-chain',
    complete: 'Done minting',
  }

  const { address } = useAccountLowerCase()
  const { setStep, showModal, hideModal } = useContractModal()
  const parseBlockchainError = useParseBlockchainError()

  const initializeWrite = async (metaData: HypercertMetadata & BountyxMetadataCollection, units: number) => {
    setUnits(units)
    setStep('uploading')
    console.log('uploading')
    const cid = await getBountyxStorage().storeBountyxMetadata(metaData)
    console.log('CID', cid)
    setCidUri(cidToIpfsUri(cid))
  }

  const parseError = useParseBlockchainError()
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isLoadingPrepareContractWrite,
    isSuccess: isReadyToWrite,
  } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    args: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      address! as `0x${string}`,
      BigNumber.from(units || 0),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      cidUri!,
      2,
      // minter.transferRestrictions.FromCreatorOnly,
    ],
    abi: HyperCertMinterFactory.abi,
    functionName: 'mintClaim',
    onError: (error) => {
      parseError(error, 'the fallback')
      toast(parseBlockchainError(error, mintInteractionLabels.toastError), {
        type: 'error',
      })
      console.error(error)
    },
    onSuccess: () => {
      toast(mintInteractionLabels.toastSuccess, { type: 'success' })
      setStep('writing')
      console.log('writing')
    },
    enabled: !!cidUri && units !== undefined,
  })

  const { data, writeAsync, error: writeError, isError: isWriteError, isLoading: isLoadingContractWrite } = useContractWrite(config)

  const {
    isLoading: isLoadingWaitForTransaction,
    isError: isWaitError,
    error: waitError,
  } = useWaitForTransaction({
    confirmations: 1,
    hash: data?.hash,
    onSuccess: () => {
      toast(mintInteractionLabels.toastSuccess, { type: 'success' })
      setStep('complete')
      console.log('complete')
      hideModal()
      onComplete?.()
    },
  })

  useEffect(() => {
    const perform = async () => {
      if (isReadyToWrite && writeAsync) {
        await writeAsync()
      }
    }
    perform()
  }, [isReadyToWrite])

  return {
    write: async (metaData: HypercertMetadata & BountyxMetadataCollection, units: number) => {
      showModal({ stepDescriptions })
      setStep('preparing')
      await initializeWrite(metaData, units)
    },
    isLoading: isLoadingPrepareContractWrite || isLoadingContractWrite || isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
    isReadyToWrite,
  }
}
