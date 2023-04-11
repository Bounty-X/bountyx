// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Networks
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { arbitrum, goerli, hardhat, mainnet, optimism, polygon, sepolia, canto, optimismGoerli } from '@wagmi/chains'
import { Chain } from 'wagmi'
import { configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

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

// Uncomment when deployed live to Canto:
// export const NOT_ETH_CHAINS_PROD = [canto]
export const NOT_ETH_CHAINS_PROD = [cantoTestnet]
export const NOT_ETH_CHAINS_TEST = [cantoTestnet]

const CHAINS = process.env.NODE_ENV === 'production' ? [...ETH_CHAINS_PROD, ...NOT_ETH_CHAINS_PROD] : [...ETH_CHAINS_TEST, ...NOT_ETH_CHAINS_TEST]

const PROVIDERS = []

if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  PROVIDERS.push(
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    })
  )
}

if (process.env.NEXT_PUBLIC_INFURA_API_KEY) {
  PROVIDERS.push(
    infuraProvider({
      apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string,
    })
  )
}

// Fallback to public provider
// Only include public provider if no other providers are available.
if (PROVIDERS.length === 0) {
  PROVIDERS.push(publicProvider())
}

// @ts-ignore
export const { chains, provider } = configureChains(CHAINS, [...PROVIDERS])
