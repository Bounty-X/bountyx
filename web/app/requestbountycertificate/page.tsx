'use client'

// @ts-nocheck
import { useEffect, useState } from 'react'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { CreateProjectForm } from '@/components/bountyx/create-project-form'
import { BountiesList } from '@/components/bountyx/bounties-list'
import { getBountiesForReceiver } from '@/lib/api/buidlboxApi'

export default function Home() {
  const [bounties, setBounties] = useState<BountyxMetadata[]>([])

  const static_receiver = process.env.NEXT_PUBLIC_HYPERCERT_OWNER_ADDRESS ? process.env.NEXT_PUBLIC_HYPERCERT_OWNER_ADDRESS : ''
  useEffect(() => {
    setBounties(getBountiesForReceiver(static_receiver))
  }, [])

  return (
    <div className="flex flex-col">
      <CreateProjectForm bounties={bounties} />
      <BountiesList bounties={bounties} />
    </div>
  )
}
