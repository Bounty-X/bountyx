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

export default function Home() {
  return (
    <>
    <div className="hero min-h-screen bg-base-200 bg-[url('/astronomy-bg.jpeg')]">
      <div className="hero-content text-center">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold">The Bounty Was Just The Beginning.</h1>
          <p className="py-6">Use our Tools to Multiply your Impact</p>
          <div className="form-control mx-auto">
            <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-white italic px-4">I certify that my project is for the public good.</span> 
            </label>
          </div>
          <div className="py-4 px-4 align-center">
            <Link href="/requestbountycertificate" passHref>
              <button className="btn btn-primary flex-auto w-64">Continue My Project</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}