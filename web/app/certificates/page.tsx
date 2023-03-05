'use client'

// @ts-nocheck
import { WalletAddress } from '@turbo-eth/core-wagmi'
import { ERC20Decimals, ERC20Name, ERC20Symbol } from '@turbo-eth/erc20-wagmi'
import { ERC721Image, ERC721Name } from '@turbo-eth/erc721-wagmi'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import Balancer from 'react-wrap-balancer'

import WalletConnect from '@/components/blockchain/wallet-connect'
import { BranchColorMode } from '@/components/shared/branch-color-mode'
import { BranchIsAuthenticated } from '@/components/shared/branch-is-authenticated'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import Card from '@/components/shared/card'
import ButtonSIWELogin from '@/components/siwe/button-siwe-login'
import ButtonSIWELogout from '@/components/siwe/button-siwe-logout'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { DEPLOY_URL, siteConfig } from '@/config/site'
import { turboIntegrations } from '@/data/turbo-integrations'
import erc20TokenSymbolToAddress from '@/lib/erc20TokenSymbolToAddress'
import { DateTime } from 'luxon'
import { HyperCert } from '@/types'
import { hypercerts } from '../../data/hypercerts'
import { HyperCertListItem } from './hypercert-list-item'
import { useEffect, useState } from 'react'
import { getNftsForOwner } from '@/lib/api/nftApi'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'
import { useAccount } from 'wagmi'
import { Network } from 'alchemy-sdk'
import { WalletConnectCustom } from '@/components/blockchain/wallet-connect-custom'

export default function Home() {
  const [certs, setCerts] = useState([])
  const { address, isConnected } = useAccount()

  const renderCerts = (): any[] => {
    if (!certs) return []

    const list: any[] = []
    certs.forEach((item: HypercertMetadata) => {
      list.push(<HyperCertListItem hyperCertMetadata={item} />)
    })
    return list
  }

  const renderScreen = () => {
    let content = null
    if (isConnected) {
      content = <div className="grid grid-cols-1 gap-1">{renderCerts()}</div>
    } else {
      content = (
        <div className="flex justify-center">
          <div>
            <div className="flex justify-center text-xl mb-4">Connect Your Wallet</div>
            <Image width="400" height="400" alt="connect your wallet" src="/no-wallet.gif" />
          </div>
        </div>
      )
    }
    return content
  }

  useEffect(() => {
    // For now
    const static_collection = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    const static_network = process.env.NEXT_PUBLIC_NETWORK ? Number(process.env.NEXT_PUBLIC_NETWORK) : 1

    console.log(address, static_collection, static_network)

    let network: Network
    switch (static_network) {
      case 5:
        network = Network.ETH_GOERLI
        break
      default:
        network = Network.ETH_MAINNET
        break
    }

    const getCerts = async (args: { address: any; collection: string | undefined; network: Network }) => {
      const hypercerts: any = await getNftsForOwner({
        address: args.address,
        collection: args.collection,
        network: args.network,
      })
      setCerts(hypercerts)
    }

    if (isConnected && static_collection) {
      getCerts({
        address: address,
        collection: static_collection,
        network,
      })
    }
  }, [])

  return renderScreen()
}
