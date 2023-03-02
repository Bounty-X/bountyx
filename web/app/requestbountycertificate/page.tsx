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
import CertificateImageHtml from '@/components/certificate/certificate-image-html'

import useLocalStorage from '@/hooks/utils/use-local-storage'

export default function Home() {
  let defaultProjectMetatadata: ProjectMetadata = {
    name: '',
    description: '',
    contributors: [],
  }

  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    let currentProjectMetadata: ProjectMetadata = {
      name: event.target.projectname.value,
      description: event.target.projectdescription.value,
      contributors: event.target.projectcontributors.value,
    }
    setProjectData(currentProjectMetadata)
    alert('we did it!')
  }

  const [projectMetadata, setProjectData] = useLocalStorage('projectMetadata', defaultProjectMetatadata)
  return (
    <>
      <div className="flex flex-row">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Project Name:</span>
              </label>
              <input
                type="text"
                id="projectname"
                placeholder="Type here"
                defaultValue={projectMetadata.name}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Project Description:</span>
              </label>
              <input
                type="text"
                id="projectdescription"
                placeholder="Type here"
                defaultValue={projectMetadata.description}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Project Contributors:</span>
              </label>
              <input
                type="text"
                id="projectcontributors"
                placeholder="Type here"
                defaultValue={projectMetadata.contributors}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <button type="submit" className="btn">
              Continue
            </button>
          </form>
        </div>
        <div className="container mx-auto px-4">
          <CertificateImageHtml />
        </div>
      </div>
    </>
  )
}
