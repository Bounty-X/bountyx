'use client'

import { EligibleGroupedClaim, getEligibleHyperdropClaims } from '@/lib/hyperdrop/hyperdrop-eligibilty'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import EligibleClaimCard from './eligible-claim-card'

export default function Eligibility() {
  const { address, isConnected } = useAccount()
  const [eligibleClaims, setEligibleClaims] = useState<EligibleGroupedClaim[]>([])

  useEffect(() => {
    const checkEligibleClaims = async () => {
      if (isConnected) {
        const newClaim = await getEligibleHyperdropClaims(address!)
        setEligibleClaims([newClaim])
      }
    }
    checkEligibleClaims()
  }, [])

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
      {eligibleClaims.length > 0 && (
        <div className="flex flex-row gap-5 pl-8">
          <EligibleClaimCard claim={eligibleClaims[0]} />
        </div>
      )}
    </div>
  )
}
