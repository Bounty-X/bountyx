import { useHypercertContract } from '../../hooks/hypercert/contracts'

export const errorMessages: Record<string, string | undefined> = {
  AlreadyMinted: 'This HyperCert has already been claimed',
  ConflictingClaim: 'This claim conflicts with an existing claim',
  DuplicateEntry: 'This fraction has already been minted',
}

export const useParseBlockchainError = () => {
  const contract = useHypercertContract()
  return (e: any, fallbackMessage: string) => {
    const unparsedErrorData = e?.error?.data?.originalError?.data

    if (unparsedErrorData) {
      const errorData = contract?.interface?.parseError(unparsedErrorData)

      if (errorData) {
        console.log('Blockchain error', errorData)
        const errorName = errorData.errorFragment.name
        return errorMessages[errorName] || errorName
      }
    }

    console.log('Trouble parsing error', { ...e })

    return e?.reason?.replace('execution reverted: ', '') || e?.error?.data?.data?.message || e?.error?.data?.message || e?.message || fallbackMessage
  }
}
