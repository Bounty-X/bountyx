'use client'
import { useContext, useRef, useState } from 'react'

import { BigNumber } from 'ethers'
import html2canvas from 'html2canvas'
import { useAccount } from 'wagmi'

import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { HypercertClaimdata } from '@/bountyxlib/types/claimdata'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'
import CertificateImageHtml from '@/components/certificate/certificate-image-html'
import { useMintClaim } from '@/hooks/hypercert/mintClaim'
import useLocalStorage from '@/hooks/utils/use-local-storage'
import { formatContributors, formatScope, formatScopeList } from '@/lib/hypercert/formatting'
import { parseListFromString } from '@/lib/hypercert/parsing'
import { BountiesContext } from '@/providers/bounties-provider'

export interface CreateProjectFormProps {
  bounties: BountyxMetadata[]
}

interface FractionOwnership {
  owner: `0x${string}`
  fraction: BigNumber
}

export interface LocalCertData {
  name: string
  description: string
  external_url: string
  contributors: string
}

// Receives a list of bounties for the same group
export default function Claim() {
  const bountiesContext = useContext(BountiesContext)
  const bounties = bountiesContext?.bounties ?? []
  const { address } = useAccount()

  const certificateElementRef = useRef(null)

  const [localCertData, setLocalCertData] = useLocalStorage<LocalCertData>('localCertData', {
    name: '',
    description: '',
    external_url: '',
    contributors: '',
  })

  const [metadata, setMetadata] = useState<HypercertMetadata & BountyxMetadataCollection>({
    ...localCertData,
    image: '',
    properties: [],
    bounties,
  })

  const [units, setUnits] = useState<number>(0)
  const [ownersToFraction, setOwnersToFraction] = useState<FractionOwnership[]>([])
  const [hypercertMinted, setHypercertMinted] = useState<boolean>(false)

  const updateMetadata = (base64Image?: string) => {
    let numberOfUnits = 0
    const workScopeList: string[] = []
    const owners: `0x${string}`[] = []

    bounties.forEach((bounty) => {
      numberOfUnits += bounty.reward.rewardAmount
      if (!workScopeList.includes(bounty.issuer?.issuerName!)) {
        workScopeList.push(bounty.issuer?.issuerName!)
      }
      owners.push(bounty.issuer?.issuerAddress! as `0x${string}`)
    })

    const workScopeStr = formatScopeList(workScopeList)
    const contributorsList = parseListFromString(localCertData.contributors, { lowercase: 'addresses', deduplicate: true })
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
      name: localCertData.name,
      description: localCertData.description,
      external_url: localCertData.external_url,
      image: base64Image ?? '',
      version: '0.0.1',
      properties: [
        {
          trait_type: 'Group',
          value: bounties && bounties.length > 0 ? bounties[0].group : '',
        },
      ],
      hypercert: hypercert,
      bounties,
    }
    setMetadata(newMetadata)
  }

  const handleChange = async (field: string, value: string) => {
    setLocalCertData({ ...localCertData, [field]: value })

    generateCertImageAndUpdateMetadata()
  }

  const { write: mintClaim } = useMintClaim({
    onComplete: () => {
      console.log('Minting is over')
      setHypercertMinted(true)
    },
  })

  const generateCertImageAndUpdateMetadata = async () => {
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
              defaultValue={localCertData.name}
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
                defaultValue={localCertData.external_url}
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
                defaultValue={localCertData.description}
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
                defaultValue={localCertData.contributors}
                className="input-bordered input w-full max-w-xs"
                onChange={(e) => handleChange('contributors', e.target.value)}
              />
            </div>
            <button type="submit" className="btn mt-[57px] py-4" disabled={hypercertMinted}>
              Claim Hypercert
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
      <div className="basis-1/3">
        <div className="h-[525px] w-[375px] bg-transparent" ref={certificateElementRef}>
          <CertificateImageHtml localCertData={localCertData} bounties={bounties} backgroundUrl={''} />
        </div>
      </div>
    </div>
  )
}
