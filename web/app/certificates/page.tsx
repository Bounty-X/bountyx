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

import { getBountyxMetadata, HypercertBountyxMetadata } from '../../../packages/bountyx-lib/lib/index'
import { useEffect, useState } from 'react'

export default function Home() {
  const [metadata, setMetadata] = useState<HypercertBountyxMetadata>()

  useEffect(() => {
    const receiveBountyxHypercert = async () => {
      const receivedData = await getBountyxMetadata('bafkreihqfy7tkimvuldlg33fncg5ubhkqadq33a2gd36z6sciw6f7pxbly')
      console.log('Received bountyx data', receivedData)
      setMetadata(receivedData)
    }
    receiveBountyxHypercert()
  }, [])

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={metadata.image} alt="Background" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{metadata.name}</h2>
        <p>{metadata.hypercert.work_scope.name}</p>
        <div className="badge badge-secondary">{metadata.hypercert.work_scope.display_value}</div>
        <p>{metadata.hypercert.impact_scope.name}</p>
        <div className="badge badge-secondary">{metadata.hypercert.impact_scope.display_value}</div>
        <p>{metadata.hypercert.rights.name}</p>
        <div className="badge badge-secondary">{metadata.hypercert.rights.display_value}</div>
        <div className="card-actions justify-center">
          <p>{metadata.hypercert.contributors.name}</p>
          <div className="badge badge-outline">{metadata.hypercert.contributors.display_value}</div>
        </div>
        <p>{metadata.description}</p>
      </div>
    </div>
  )
}
