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

import { render } from 'react-dom'

import { useState } from 'react'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import CertificateImageHtml from '@/components/certificate/certificate-image-html'
import { CreateProjectForm } from '@/components/bountyx/create-project-form'
import { BountiesList } from '@/components/bountyx/bounties-list'

export default function Home() {
  const [bounties, setBounties] = useState<BountyxMetadata[]>(
    Array(3).fill({
      name: 'Best project using Filecoin Virtual Machine (FVM)',
      description:
        '<p>The Filecoin Virtual Machine (FVM) team is looking for a wide variety of projects deployed on Filecoin Virtual Machine Hyperspace Testnet. </p><p>Bonus points for projects drawing on the uniqueness of Filecoin and its storage deals.</p><p>Example: Data DAOs tapping into opportunities around storage deal monitoring and renewal.</p><p></p><p>Grand prizes: 3 x $5000; </p><p>Runners up: $10000 split between up to 10 best teams, capped at $1000 per project</p>',
      issuer: {
        issuerAddress: '0x0',
        issuerName: 'Protocol Labs',
        issuerLogoUrl: 'https://org-resources.s3.amazonaws.com/d264ef74-2c79-480c-9303-2ae6ea1d97d6/logo/logo.png',
      },
      receiver: {
        receiverAddress: '0x0',
      },
      reward: { rewardAmountUsd: 25000, rewardToken: 'USDC' },
    })
  )

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <CreateProjectForm bounties={bounties} />
        <div className="container mx-auto px-4">
          <CertificateImageHtml />
        </div>
      </div>
      <BountiesList bounties={bounties} />
    </div>
  )
}
