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
import { getNftsForOwner } from '@/lib/api/nftease'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'
import { useAccount } from 'wagmi'

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

  useEffect(() => {
    const getCerts = async (args: { address: `0x${string}` | undefined; collection: string }) => {
      console.log('connected', args.address)
      const hypercerts: any = await getNftsForOwner({
        address: '0xa0facBd53826095f65CBe48F43ddba293d8FD19b',
        //address: args.address,
        collection: args.collection,
      })
      setCerts(hypercerts)
    }

    if (isConnected) {
      getCerts({ address, collection: '0x822f17a9a5eecfd66dbaff7946a8071c265d1d07' })
    }
  }, [])

  return <div className="grid grid-cols-1 gap-1">{renderCerts()}</div>
}
