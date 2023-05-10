'use client'

import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { EligibleClaim, getEligibleHyperdropClaims } from '@/lib/hyperdrop/hyperdrop-eligibilty'
import { group } from 'console'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import EligibleClaimCard from './eligible-claim-card'

export default function Eligibility() {
  // const { address, isConnected } = useAccount()
  const address = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1190' as `0x${string}`
  const isConnected = true
  const [eligibleClaims, setEligibleClaims] = useState<EligibleClaim[]>([])
  useEffect(() => {
    if (isConnected) {
      setEligibleClaims(getEligibleHyperdropClaims(address!))
    }
  }, [])

  const groupedBounties: Map<string, BountyxMetadata[]> = new Map()
  for (const claim of eligibleClaims) {
    if (groupedBounties.has(claim.bounty.group)) {
      groupedBounties.get(claim.bounty.group)!.push(claim.bounty)
    } else {
      groupedBounties.set(claim.bounty.group, [claim.bounty])
    }
  }

  if (!isConnected) return <div>Connect your wallet please...</div>

  return (
    <div>
      <h1 className="text-5xl font-bold">
        {eligibleClaims.length > 0 ? 'Congrats! You are eligible for a Hypercert!' : 'Ah shoot. No Hypercert for you today :('}
      </h1>
      <p className="py-6">
        {eligibleClaims.length > 0
          ? 'You are now eligible to claim one or more Bounty Hypercerts. Celebrate your victory and get recognized within a community for creating meaningful impact!'
          : 'You are not eligible to claim a Hypercert today. But it just means you can keep participating in different hackathons, applying for bounties, and then come back to manifest your impact!'}
      </p>
      <div className="flex flex-row gap-5">
        {[...groupedBounties.values()].map((bounties) => (
          <EligibleClaimCard bounties={bounties} />
        ))}
      </div>
    </div>
  )
}
