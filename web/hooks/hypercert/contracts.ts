import { HypercertMinterABI } from '@hypercerts-org/hypercerts-sdk'
import { useContract, useProvider } from 'wagmi'

export const useHypercertContract = () => {
  const provider = useProvider()
  return useContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: HypercertMinterABI,
    signerOrProvider: provider,
    // signerOrProvider: {
    //
    // }
    // staticProvider: {
    //   enable: true,
    //   chainId: DEFAULT_CHAIN_ID,
    // },
  })
}
