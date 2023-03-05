// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Networks
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { arbitrum, goerli, hardhat, mainnet, optimism, polygon, sepolia } from '@wagmi/chains'

// @ts-ignore
goerli.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
sepolia.iconUrl = '/icons/NetworkEthereumTest.svg'

export const ETH_CHAINS = [mainnet, optimism, goerli]
export const ETH_CHAINS_PROD = [optimism, goerli]
export const ETH_CHAINS_TEST = [mainnet, optimism, goerli, hardhat]
