'use client'
import '@rainbow-me/rainbowkit/styles.css'
import { ReactNode } from 'react'

import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { coinbaseWallet, injectedWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { WagmiConfig, configureChains, createClient, Chain } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { canto } from '@wagmi/chains'
import { ETH_CHAINS_PROD, ETH_CHAINS_TEST, NOT_ETH_CHAINS_PROD, NOT_ETH_CHAINS_TEST } from '@/config/networks'
import { siteConfig } from '@/config/site'
import { useColorMode } from '@/lib/state/color-mode'

interface Props {
  children: ReactNode
  autoConnect?: boolean
}

const CHAINS = process.env.NODE_ENV === 'production' ? [...ETH_CHAINS_PROD, ...NOT_ETH_CHAINS_PROD] : [...ETH_CHAINS_TEST, ...NOT_ETH_CHAINS_TEST]
const { chains, provider } = configureChains(CHAINS, [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
  }),
  publicProvider(),
  // jsonRpcProvider({
  //   rpc: (chain) => {
  //     if (chain.id === canto.id) {
  //       return { http: 'https://canto.slingshot.finance' }
  //     }
  //     return { http: chain.rpcUrls.default.http[0] }
  //   },
  // }),
])

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      coinbaseWallet({ chains, appName: siteConfig.name }),
      walletConnectWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function RainbowKit(props: Props) {
  const [colorMode] = useColorMode()

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={colorMode == 'dark' ? darkTheme() : lightTheme()}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
