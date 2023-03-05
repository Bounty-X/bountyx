'use client'

// @ts-nocheck
import { useState, useEffect } from 'react'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { CreateProjectForm } from '@/components/bountyx/create-project-form'
import { BountiesList } from '@/components/bountyx/bounties-list'
import { getBountiesForReceiver } from '@/lib/api/buidlboxApi'
import { useAccount } from 'wagmi'

export default function Home() {
  const [bounties, setBounties] = useState<BountyxMetadata[]>([])

  const { address } = useAccount()

  useEffect(() => {
    setBounties(getBountiesForReceiver(address!))
  })

  return (
    <div className="flex flex-col">
      <CreateProjectForm bounties={bounties} />
      <div className="flex flex-row">
        <div className="basis-1/3">
          <BountiesList bounties={getBountiesForReceiver(address!)} />
        </div>
      </div>
    </div>
  )
}
