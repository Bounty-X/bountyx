'use client'

// @ts-nocheck
import { useState, useEffect } from 'react'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { CreateProjectForm } from '@/components/bountyx/create-project-form'

export default function Home() {
  const [bounties, setBounties] = useState<BountyxMetadata[]>([])

  return (
    <div className="flex flex-col">
      <CreateProjectForm />
    </div>
  )
}
