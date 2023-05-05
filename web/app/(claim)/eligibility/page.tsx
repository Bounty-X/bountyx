'use client'
import { EligibleClaim, getEligibleHyperdropClaims } from '@/lib/hyperdrop/hyperdrop-eligibilty'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function Eligibility() {
  //const { address, isConnected } = useAccount()
  const address = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199' as `0x{string}`
  const [eligibleClaims, setEligibleClaims] = useState<EligibleClaim[]>([])
  useEffect(() => {
    setEligibleClaims(getEligibleHyperdropClaims(address))
  }, [])

  return (
    <div>
      <p>Eligibility Page</p>
      <p>Address: {address}</p>
      {eligibleClaims.map((claim) => (
        <div>
          <p>Proof: {claim.proof}</p>
          <p>Merkle Root: {claim.merkleRoot}</p>
        </div>
      ))}
    </div>
  )
}
