'use client'
import { useEffect, useRef, useState } from 'react'

import { BigNumber } from 'ethers'
import html2canvas from 'html2canvas'
import { image } from 'html2canvas/dist/types/css/types/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useAccount, useNetwork } from 'wagmi'

import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { HypercertMetadata, HypercertClaimdata } from '@hypercerts-org/hypercerts-sdk'
import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata.js'
import { BountiesList } from '@/components/bountyx/bounties-list'
import CertificateImageHtml from '@/components/certificate/certificate-image-html'
import { useMintClaim } from '@/hooks/hypercert/mintClaim'
import { useMintClaimWithFractions } from '@/hooks/hypercert/mintClaimWithFractions'
import { useSafeBatchTransferFrom } from '@/hooks/hypercert/safeBatchTransferFrom'
import useLocalStorage from '@/hooks/utils/use-local-storage'
import { getAllGroups, getBountiesForReceiver } from '@/lib/api/hackathon-providers/buidlbox/buidlbox-api'
import { formatContributors, formatScope, formatScopeList } from '@/lib/hypercert/formatting'
import { parseListFromString } from '@/lib/hypercert/parsing'

import { DummyHypercert } from './dummy-hypercert'
import { getgroups } from 'process'

export interface CreateProjectFormProps {
  bounties: BountyxMetadata[]
}

interface FractionOwnership {
  owner: `0x${string}`
  fraction: BigNumber
}

export const CreateProjectForm = () => {
  const certificateElementRef = useRef(null)

  const [group, setGroup] = useState<string>('')
  const [bounties, setBounties] = useState<BountyxMetadata[]>([])

  const { address } = useAccount()
  useEffect(() => {
    const allReceiverBounties = getBountiesForReceiver(address!)

    setBounties(allReceiverBounties.filter((bounty) => bounty.group! === group))
  }, [group])

  const [projectMetadata, setProjectData] = useLocalStorage<ProjectMetadata>('projectMetadata', {
    name: '',
    description: '',
    external_url: '',
    contributors: '',
  })

  const [metadata, setMetadata] = useState<HypercertMetadata & BountyxMetadataCollection>({
    name: projectMetadata.name,
    description: projectMetadata.description,
    external_url: projectMetadata.external_url,
    image: '',
    version: '0.0.1',
    properties: [],
    hypercert: {},
    bounties,
  })

  const [units, setUnits] = useState<number>(0)
  const [ownersToFraction, setOwnersToFraction] = useState<FractionOwnership[]>([])
  const [hypercertMinted, setHypercertMinted] = useState<boolean>(false)
  const [hyperceretTransferred, setHyperceretTransferred] = useState<boolean>(false)
  const [selectedBGIndex, setSelectedBGIndex] = useState<number>(0)

  const updateMetadata = (base64Image?: string) => {
    let numberOfUnits = 0
    const workScopeList: string[] = []
    const owners: `0x${string}`[] = []

    bounties.forEach((bounty) => {
      numberOfUnits += bounty.reward?.rewardAmount ?? 0
      if (!workScopeList.includes(bounty.issuer?.issuerName!)) {
        workScopeList.push(bounty.issuer?.issuerName!)
      }
      owners.push(bounty.issuer?.issuerAddress! as `0x${string}`)
    })

    const workScopeStr = formatScopeList(workScopeList)
    const contributorsList = parseListFromString(projectMetadata.contributors, { lowercase: 'addresses', deduplicate: true })
    const contributorsStr = formatContributors(contributorsList)

    owners.push(...(contributorsList as [`0x${string}`]))
    if (owners.length > 0) {
      const fraction = numberOfUnits / owners.length
      const distribution: FractionOwnership[] = owners.map((owner) => {
        const fractionRounded = Math.round(fraction)
        return { owner, fraction: BigNumber.from(fractionRounded) }
      })
      setOwnersToFraction(distribution)
      setUnits(numberOfUnits)
    }

    const hypercert: HypercertClaimdata = {
      work_scope: { name: 'Work', value: workScopeList, display_value: workScopeStr },
      work_timeframe: { name: 'Work Period', value: [0], display_value: '' },
      impact_scope: { name: 'Impact', value: ['all'], display_value: 'all' },
      impact_timeframe: { name: 'Impact Period', value: [0], display_value: '' },
      contributors: { name: 'Contributors', value: contributorsList, display_value: contributorsStr },
    }

    const newMetadata: HypercertMetadata & BountyxMetadataCollection = {
      name: projectMetadata.name,
      description: projectMetadata.description,
      external_url: projectMetadata.external_url,
      image: base64Image ?? '',
      version: '0.0.1',
      properties: [
        {
          trait_type: 'Event',
          value: 'ETHDenver 2023',
        },
      ],
      hypercert: hypercert,
      bounties: bounties,
    }
    setMetadata(newMetadata)
  }

  const handleChange = async (field: string, value: string) => {
    // Need to reconstruct object and copy so that react knows the object changed
    let newProjectMetadata: ProjectMetadata = {
      name: '',
      description: '',
      external_url: '',
      contributors: '',
    }
    Object.assign(newProjectMetadata, projectMetadata)
    newProjectMetadata[field] = value
    setProjectData(newProjectMetadata)

    generateCertImageAndMintHypercert()
  }

  const { write: mintClaim } = useMintClaim({
    onComplete: () => {
      console.log('Minting is over, Now transferring')
      setHypercertMinted(true)
    },
  })

  // const { write: mintClaimWithFractions } = useMintClaimWithFractions({
  //   onComplete: () => {
  //     console.log('Minting is over, Now transferring')
  //     setHypercertMinted(true)
  //   },
  // })

  const { write: safeTransferFrom } = useSafeBatchTransferFrom({
    onComplete: () => {
      console.log('All steps completed')
      setHyperceretTransferred(true)
    },
  })

  let buttonText = 'Mint Hypercert'
  if (hypercertMinted && !hyperceretTransferred) {
    buttonText = 'Transfer Fractions'
  }

  const transferHypercerts = async () => {
    if (hypercertMinted && !hyperceretTransferred) {
      for (const ownership of ownersToFraction) {
        console.log(`Transferring to ${ownership.fraction} to ${ownership.owner}`)
        await safeTransferFrom(ownership.owner, ownership.fraction)
        break
      }
    }
  }

  const [backgroundUrl, setBackgroundUrl] = useState('/astronomy-bg.jpeg')
  const handleBackgroundToggleClick = (buttonNum: number, target: EventTarget) => {
    switch (buttonNum) {
      case 0:
        setSelectedBGIndex(0)
        setBackgroundUrl('/astronomy-bg.jpeg')
        break
      case 1:
        setSelectedBGIndex(1)
        setBackgroundUrl('/ethdenverstage.png')
        break
      case 2:
        setSelectedBGIndex(2)
        setBackgroundUrl('/mountains-bg.jpeg')
        break
      default:
        break
    }
  }

  const generateCertImageAndMintHypercert = async () => {
    window.scrollTo(0, 0)
    const certificateElement = certificateElementRef.current
    if (certificateElement) {
      const canvas = await html2canvas(certificateElement, {
        backgroundColor: null,
      })
      const imageString = canvas.toDataURL('image/base64', 1)
      updateMetadata(imageString)
    }
  }

  const mintHypercert = async () => {
    //TODO: BUG. If no changes to ui - the metadata is empty

    console.log('Minting hypercert', metadata)
    console.log('Units', units)
    console.log('Fractions', ownersToFraction.length)
    console.log('Fractions are', JSON.stringify(ownersToFraction))
    await mintClaim(
      metadata,
      units
      // ownersToFraction.map((val) => val.fraction)
    )
  }

  return (
    <div className="flex flex-row justify-evenly">
      <div className="rounded-box mr-8 basis-1/3 bg-base-200 outline-2 outline-slate-400">
        <form
          className="mt-4 ml-4 align-middle"
          onSubmit={(e) => {
            e.preventDefault()
            if (!hypercertMinted) {
              mintHypercert()
              // generateCertImageAndMintHypercert()
            } else if (hypercertMinted && !hyperceretTransferred) {
              transferHypercerts()
            }
          }}>
          <h1 className="font-bold">Project Info</h1>
          <div className="form-control w-full max-w-xs py-4">
            <label className="label">
              <span className="label-text">Project Name:</span>
            </label>
            <input
              type="text"
              id="projectname"
              placeholder="Type your team's project name here..."
              defaultValue={projectMetadata.name}
              className="input-bordered input w-full max-w-xs"
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <div className="form-control w-full max-w-xs py-4">
              <label className="label">
                <span className="label-text">Project URL:</span>
              </label>
              <input
                type="text"
                id="projectname"
                placeholder="Give us a project/informational url... "
                defaultValue={projectMetadata.external_url}
                className="input-bordered input w-full max-w-xs"
                onChange={(e) => handleChange('external_url', e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs py-4">
              <label className="label">
                <span className="label-text">Project Description:</span>
              </label>
              <input
                type="text"
                id="projectdescription"
                placeholder="I don't know your project - describe it for me..."
                defaultValue={projectMetadata.description}
                className="input-bordered input w-full max-w-xs"
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs py-4">
              <label className="label">
                <span className="label-text">Project Contributors:</span>
              </label>
              <input
                type="text"
                id="projectcontributors"
                placeholder="Enter fellow contributors - comma separated"
                defaultValue={projectMetadata.contributors}
                className="input-bordered input w-full max-w-xs"
                onChange={(e) => handleChange('contributors', e.target.value)}
              />
            </div>
            <button type="submit" className="btn mt-[57px] py-4" disabled={hypercertMinted && hyperceretTransferred}>
              {buttonText}
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
      <div className="basis-1/3">
        <div className="h-[525px] w-[375px] bg-transparent" ref={certificateElementRef}>
          <CertificateImageHtml projectMetadata={projectMetadata} bounties={bounties} backgroundUrl={backgroundUrl} />
        </div>
        {/* <div className="container mx-auto mt-4">
          <div className="btn-group">
            <button className={`btn ${selectedBGIndex === 0 ? 'btn-active' : ''}`} onClick={(e) => handleBackgroundToggleClick(0, e.target)}>
              Galactic
            </button>
            <button className={`btn ${selectedBGIndex === 1 ? 'btn-active' : ''}`} onClick={(e) => handleBackgroundToggleClick(1, e.target)}>
              EthDenver
            </button>
            <button className={`btn ${selectedBGIndex === 2 ? 'btn-active' : ''}`} onClick={(e) => handleBackgroundToggleClick(2, e.target)}>
              Mountains
            </button>
          </div>
        </div> */}
      </div>
      <div className="rounded-box mr-8 basis-1/3 bg-base-200 outline-2 outline-slate-400">
        <BountiesList setGroup={(group: string) => setGroup(group)} groups={getAllGroups()} bounties={getBountiesForReceiver(address!)} />
      </div>
    </div>
  )
}
