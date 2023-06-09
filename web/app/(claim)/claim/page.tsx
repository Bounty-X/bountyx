'use client'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'

import { BigNumber } from 'ethers'
import html2canvas from 'html2canvas'

import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { HypercertMetadata, HypercertClaimdata } from '@hypercerts-org/hypercerts-sdk'
import CertificateImageHtml from '@/components/certificate/certificate-image-html'
import useLocalStorage from '@/hooks/utils/use-local-storage'
import { formatContributors, formatScope, formatScopeList } from '@/lib/hypercert/formatting'
import { parseListFromString } from '@/lib/hypercert/parsing'
import { useClaimSingleHyperdrop } from '@/hooks/hyperdrop/claim-single-hyperdrop'
import { EligibleClaimContext } from '@/providers/eligible-claim-provider'
import AddressTagInput from '@/components/shared/ui/address-tag-input'
import RangeSliderNumber from '@/components/shared/ui/range-slider-number'

export interface CreateProjectFormProps {
  bounties: BountyxMetadata[]
}

export interface FractionOwnership {
  owner: `0x${string}`
  fraction: BigNumber
}

export interface LocalCertData {
  name: string
  description: string
  external_url: string
  contributors: string[]
}

// Receives a list of bounties for the same group
export default function Claim() {
  const eligibleClaimContext = useContext(EligibleClaimContext)
  const claim = eligibleClaimContext?.claim
  const bounties = claim ? claim.bounties : []
  console.log('Claim is', claim)

  const certificateElementRef = useRef(null)

  const [localCertData, setLocalCertData] = useLocalStorage<LocalCertData>('localCertData', {
    name: '',
    description: '',
    external_url: '',
    contributors: [],
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
  const [futureRewardsPercent, setFutureRewardsPercent] = useState<number>(30)

  useEffect(() => {
    generateCertImageAndUpdateMetadata()
  }, [localCertData])

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
    // const contributorsList = parseListFromString(localCertData.contributors, { lowercase: 'addresses', deduplicate: true })
    const contributorsList = localCertData.contributors
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
    console.log('New metadata', metadata)
  }

  const handleChange = async (field: string, value: string | string[]) => {
    setLocalCertData({ ...localCertData, [field]: value })
  }

  const { write: claimHyperdrop } = useClaimSingleHyperdrop({
    // Be mindful that claim can be undefined and the hook will crash
    claim: claim!,
    onComplete: () => {
      console.log('Claiming is over')
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
    console.log('Minting hypercert', metadata)
    console.log('Units', units)
    console.log('Fractions', ownersToFraction.length)
    console.log('Fractions are', JSON.stringify(ownersToFraction))
    await claimHyperdrop({ metadata, units, ownersToFraction, allowlistPercentage: 100 })
  }

  return (
    <div className="flex flex-row justify-evenly">
      <div className="mr-8 basis-1/3">
        <form
          className="mt-4 ml-4 align-middle"
          onSubmit={(e) => {
            e.preventDefault()
            if (!hypercertMinted) {
              mintHypercert()
            }
          }}>
          <h1 className="font-bold">Project Information</h1>
          <div className="form-control w-full max-w-xs py-4">
            <label className="label">
              <span className="label-text">What is your project name?</span>
              <span className="label-text-alt">Required</span>
            </label>
            <input
              type="text"
              id="projectname"
              placeholder="Type your project name here..."
              defaultValue={localCertData.name}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <div className="form-control w-full max-w-xs py-4">
              <label className="label">
                <span className="label-text">What is your Project URL?</span>
                <span className="label-text-alt">Required</span>
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
            <AddressTagInput
              addresses={localCertData.contributors}
              onAddressesChange={(newAddresses: string[]) => handleChange('contributors', newAddresses)}
            />
            <div className="form-control w-full max-w-xs py-4">
              <label className="label">
                <span className="label-text">Description</span>
                <span className="label-text-alt">Required</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full max-w-xs"
                id="projectdescription"
                placeholder="Describe your project..."
                defaultValue={localCertData.description}
                onChange={(e) => handleChange('description', e.target.value)}></textarea>
            </div>
            <RangeSliderNumber updateValue={setFutureRewardsPercent} defaultValue={30} maxValue={70} />
            <button type="submit" className="btn mt-[57px] py-4" disabled={hypercertMinted}>
              Mint Hypercert
            </button>
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
