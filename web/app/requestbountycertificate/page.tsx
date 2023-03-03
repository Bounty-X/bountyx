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

import { HyperCertListItem } from '../certificates/hypercert-list-item'
import { HyperCert } from '@/types'

import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata.js'

import { DummyHypercert } from '@/components/bountyx/dummy-hypercert'
const CertificateImageHtml = dynamic(() => import('@/components/certificate/certificate-image-html'), {
  ssr: false,
})

import useLocalStorage from '@/hooks/utils/use-local-storage'
import { useState } from 'react'

import dynamic from 'next/dynamic'


export default function Home() {
  let defaultProjectMetadata: ProjectMetadata = {
    name: '',
    description: '',
    contributors: '',
  }

  const [projectMetadata, setProjectData] = useLocalStorage('projectMetadata', defaultProjectMetadata)
    
  const handleChange = async (field: string, value: string) => {
    // Need to reconstruct object and copy so that react knows the object changed
    let newProjectMetadata: ProjectMetadata = {
      name: '',
      description: '',
      contributors: '',
    }; 
    Object.assign(newProjectMetadata, projectMetadata);
    newProjectMetadata[field] = value;
    setProjectData(newProjectMetadata);
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="container mx-auto px-4">
          <form>
            <div className="form-control w-full max-w-xs py-4">
              <label className="label">
                <span className="label-text">Project Name:</span>
              </label>
              <input
                type="text"
                id="projectname"
                placeholder="Type here"
                defaultValue={projectMetadata.name}
                className="input input-bordered w-full max-w-xs"
                onChange={e => handleChange('name', e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs py-4">
              <label className="label">
                <span className="label-text">Project Description:</span>
              </label>
              <input
                type="text"
                id="projectdescription"
                placeholder="Type here"
                defaultValue={projectMetadata.description}
                className="input input-bordered w-full max-w-xs"
                onChange={e => handleChange('description', e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs py-4">
              <label className="label">
                <span className="label-text">Project Contributors:</span>
              </label>
              <input
                type="text"
                id="projectcontributors"
                placeholder="Type here"
                defaultValue={projectMetadata.contributors}
                className="input input-bordered w-full max-w-xs"
                onChange={e => handleChange('contributors', e.target.value)}
              />
            </div>
            <Link href="/certificates" passHref>
            <button type="submit" className="btn py-4">Continue</button>
            </Link>
          </form>
        </div>
        <div className="container mx-auto px-4">
          <CertificateImageHtml projectMetadata={projectMetadata}/>
        </div>
      </div>
    </>
  )
}
