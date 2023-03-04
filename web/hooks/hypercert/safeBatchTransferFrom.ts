import { useEffect, useState } from 'react'
import { useContractModal } from '../../components/shared/contract-interaction-dialog-context'
import { useParseBlockchainError } from '../../lib/hypercert/parse-blockchain-error'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { BigNumber } from 'ethers'
import { mintInteractionLabels } from '../../lib/hypercert/chainInteractions'
import { HyperCertMinterFactory } from '@hypercerts-org/hypercerts-protocol'
import { toast } from 'react-toastify'
import { useAccountLowerCase } from './account'

export const useSafeBatchTransferFrom = ({ onComplete }: { onComplete?: () => void }) => {
  const [to, setTo] = useState<`0x${string}`>()
  const [fractionId, setFractionId] = useState<BigNumber>()

  const stepDescriptions = {
    initializing: 'Preparing to transfer a fraction of the hypercert',
    transferring: 'Distributing hypercert between owners',
    complete: 'Done distributing',
  }

  const { address } = useAccountLowerCase()
  const { setStep, showModal, hideModal } = useContractModal()
  const parseBlockchainError = useParseBlockchainError()

  const initializeWrite = async (to: `0x${string}`, fractionId: BigNumber) => {
    setTo(to)
    setFractionId(fractionId)
    setStep('initializing')
    console.log('initializing')
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
      to!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fractionId!,
      BigNumber.from(1),
      '0x',
    ],
    abi: HyperCertMinterFactory.abi,
    functionName: 'safeTransferFrom',
    onError: (error) => {
      parseError(error, 'the fallback')
      toast(parseBlockchainError(error, mintInteractionLabels.toastTransferError), {
        type: 'error',
      })
      console.error(error)
    },
    onSuccess: () => {
      toast(mintInteractionLabels.toastFractionTransferSuccess, { type: 'success' })
      setStep('transferring')
      console.log('transferring')
    },
    enabled: !!to && !!fractionId,
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
      toast(mintInteractionLabels.toastFractionTransferSuccess, { type: 'success' })
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
    write: async (to: `0x${string}`, fractionId: BigNumber) => {
      showModal({ stepDescriptions })
      setStep('preparing')
      await initializeWrite(to, fractionId)
    },
    isLoading: isLoadingPrepareContractWrite || isLoadingContractWrite || isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
    isReadyToWrite,
  }
}
