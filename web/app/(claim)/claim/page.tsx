'use client'
import { useContext, useEffect, useRef, useState } from 'react'

import html2canvas from 'html2canvas'

import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { HypercertMetadata } from '@hypercerts-org/hypercerts-sdk'
import CertificateImageHtml from '@/components/certificate/certificate-image-html'
import useLocalStorage from '@/hooks/utils/use-local-storage'
import { AddressOrEns } from '@/lib/hypercert/formatting'
import { useClaimSingleHyperdrop } from '@/hooks/hyperdrop/claim-single-hyperdrop'
import { EligibleClaimContext } from '@/providers/eligible-claim-provider'
import PieChart from '@/components/shared/diagrams/pie-chart'
import { formatAddress } from '@/lib/hypercert/formatting'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import Confetti from 'react-confetti'
import ProjectInformationForm from './project-information-form'
import { TagColorMap } from '@/components/shared/ui/address-tag-input'
import { FractionOwnership, LocalCertData, prepareBountyHypercertMintParams } from '@/lib/bountyx/bountyx-hypercert-utils'

export interface CreateProjectFormProps {
  bounties: BountyxMetadata[]
}

// Receives a list of bounties for the same group
export default function Claim() {
  const eligibleClaimContext = useContext(EligibleClaimContext)
  let claim = eligibleClaimContext?.claim
  const bounties = claim ? claim.bounties : []
  console.log('Claim is', claim)

  const { isConnected, address } = useAccount()

  const certificateElementRef = useRef(null)

  // Uncomment this to use local storage instead of state
  // const [localCertData, setLocalCertData] = useLocalStorage<LocalCertData>('localCertData', {
  //   name: '',
  //   description: '',
  //   external_url: '',
  //   contributors: [],
  //   additional_owners: [],
  // })
  const [localCertData, setLocalCertData] = useState<LocalCertData>({
    name: '',
    description: '',
    external_url: '',
    contributors: [address!],
    additional_owners: bounties.map((b) => (b.issuer.issuerAddress || `${b.issuer.issuerName}.bountyx.eth`) as AddressOrEns),
  })
  const debouncedLocalCertData = useDebounce(localCertData, 500)

  const [metadata, setMetadata] = useState<HypercertMetadata & BountyxMetadataCollection>({
    name: localCertData.name,
    description: localCertData.description,
    external_url: localCertData.external_url,
    image: '',
    properties: [],
    bounties,
  })

  const [units, setUnits] = useState<number>(0)
  const [ownersToFraction, setOwnersToFraction] = useState<FractionOwnership[]>([])
  const [futureRewardsPercent, setFutureRewardsPercent] = useState<number>(30)
  const [tagColors, setTagColors] = useState<TagColorMap>({})
  const [hypercertMinted, setHypercertMinted] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const updateData = async () => {
      const imageBase64 = await generateCertImage()
      if (imageBase64) {
        updateMetadata(imageBase64)
      }
    }
    updateData()
  }, [debouncedLocalCertData, futureRewardsPercent])

  const updateMetadata = (base64Image?: string) => {
    const {
      distribution,
      units: newUnits,
      metadata: newMetadata,
    } = prepareBountyHypercertMintParams(address!, bounties, debouncedLocalCertData, futureRewardsPercent, base64Image)

    setOwnersToFraction(distribution)
    setUnits(newUnits)
    setMetadata(newMetadata)
  }

  const handleChange = async (field: string, value: string | string[]) => {
    setLocalCertData({ ...debouncedLocalCertData, [field]: value })
  }

  const handleTagColorChange = (tag: string, color: string) => {
    setTagColors((prevColors) => ({
      ...prevColors,
      [tag]: color,
    }))
  }

  const { write: claimHyperdrop } = useClaimSingleHyperdrop({
    // Be mindful that claim can be undefined and the hook will crash
    claim: claim!,
    onComplete: () => {
      console.log('Claiming is over')
      setHypercertMinted(true)
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000) // 5000 milliseconds = 5 seconds
    },
  })

  const generateCertImage = async () => {
    window.scrollTo(0, 0)
    const certificateElement = certificateElementRef.current
    if (certificateElement) {
      const canvas = await html2canvas(certificateElement, {
        backgroundColor: null,
      })
      return canvas.toDataURL('image/base64', 1)
    }
  }

  const mintHypercert = async () => {
    console.log('Minting hypercert', metadata)
    console.log('Units', units)
    console.log('Fractions', ownersToFraction.length)
    console.log('Fractions are', JSON.stringify(ownersToFraction))
    await claimHyperdrop({ metadata, units, ownersToFraction, allowlistPercentage: 100 })
  }

  if (!isConnected) return <div>Connect your wallet please...</div>

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly items-center">
      <div className="lg:mr-8">
        <ProjectInformationForm
          localCertData={localCertData}
          handleDataChange={handleChange}
          setFutureRewardsPercent={setFutureRewardsPercent}
          handleTagColorChange={handleTagColorChange}
          mintHypercert={mintHypercert}
          hypercertMinted={hypercertMinted}
        />
      </div>
      <div className="lg:flex-1">
        <PieChart
          data={ownersToFraction.map(({ owner, fraction }) => ({
            id: owner.endsWith('.eth') ? owner : formatAddress(owner),
            label: owner,
            value: fraction.toNumber(),
            color: tagColors[owner] ?? '#000000',
          }))}
        />
      </div>
      <div className="lg:flex-1">
        <div className="h-[525px] w-[375px] bg-transparent" ref={certificateElementRef}>
          <CertificateImageHtml localCertData={localCertData} bounties={bounties} backgroundUrl={''} />
        </div>
      </div>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false} // Disable recycling
          run={showConfetti} // Control animation using the showConfetti state
        />
      )}
    </div>
  )
}
