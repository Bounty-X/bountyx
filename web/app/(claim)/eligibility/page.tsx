'use client'
import Card from '@/components/shared/card'
import { EligibleClaim, getEligibleHyperdropClaims } from '@/lib/hyperdrop/hyperdrop-eligibilty'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function Eligibility() {
  const { address, isConnected } = useAccount()
  // const address = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1190' as `0x${string}`
  // const isConnected = true
  const [eligibleClaims, setEligibleClaims] = useState<EligibleClaim[]>([])
  useEffect(() => {
    if (isConnected) {
      setEligibleClaims(getEligibleHyperdropClaims(address!))
    }
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
      {eligibleClaims.map((claim) => (
        <Card
          title={claim.bountyData.bountyName}
          description={claim.bountyData.issuerName}
          href={claim.bountyData.receiverAddress}
          demo={<button className="btn btn-primary">Get Started</button>}
        />
      ))}
    </div>
    //   <p>Address: {address}</p>
    //   {eligibleClaims.map((claim) => (
    //     <div>
    //       <p>Proof: {claim.proof}</p>
    //       <p>Merkle Root: {claim.merkleRoot}</p>
    //       <p>Bounty: {JSON.stringify(claim.bountyData)}</p>
    //     </div>
    //   ))}
    // </div>
  )
}
