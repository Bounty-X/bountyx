// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Networks
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { arbitrum, goerli, hardhat, mainnet, optimism, polygon, sepolia, canto, optimismGoerli } from '@wagmi/chains'
import { Chain } from 'wagmi'

// @ts-ignore
goerli.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
sepolia.iconUrl = '/icons/NetworkEthereumTest.svg'

export const cantoTestnet = {
  id: 7701,
  name: 'Canto Testnet',
  network: 'cantoTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Canto',
    symbol: 'CANTO',
  },
  rpcUrls: {
    public: { http: ['https://canto-testnet.plexnode.wtf'] },
    default: { http: ['https://canto-testnet.plexnode.wtf'] },
  },
  blockExplorers: {
    tuber: { name: 'Tuber', url: 'https://testnet.tuber.build' },
    default: { name: 'Tuber', url: 'https://testnet.tuber.build' },
  },
  testnet: true,
} as Chain

// @ts-ignore
cantoTestnet.iconUrl = '/icons/CantoIcon.svg'
// @ts-ignore
canto.iconUrl = '/icons/CantoIcon.svg'

export const ETH_CHAINS_PROD = [optimism, goerli]
export const ETH_CHAINS_TEST = [mainnet, optimismGoerli, goerli, hardhat]

export const NOT_ETH_CHAINS_PROD = [canto]
export const NOT_ETH_CHAINS_TEST = [cantoTestnet]
