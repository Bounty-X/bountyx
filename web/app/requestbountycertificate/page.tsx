'use client'

// @ts-nocheck
import { useState } from 'react'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { CreateProjectForm } from '@/components/bountyx/create-project-form'
import { BountiesList } from '@/components/bountyx/bounties-list'

export default function Home() {
  const [bounties, setBounties] = useState<BountyxMetadata[]>(
    Array(3).fill({
      name: 'Best project using Filecoin Virtual Machine (FVM)',
      description:
        '<p>The Filecoin Virtual Machine (FVM) team is looking for a wide variety of projects deployed on Filecoin Virtual Machine Hyperspace Testnet. </p><p>Bonus points for projects drawing on the uniqueness of Filecoin and its storage deals.</p><p>Example: Data DAOs tapping into opportunities around storage deal monitoring and renewal.</p><p></p><p>Grand prizes: 3 x $5000; </p><p>Runners up: $10000 split between up to 10 best teams, capped at $1000 per project</p>',
      issuer: {
        issuerAddress: '0x0',
        issuerName: 'Protocol Labs',
        issuerLogoUrl: 'https://org-resources.s3.amazonaws.com/d264ef74-2c79-480c-9303-2ae6ea1d97d6/logo/logo.png',
      },
      receiver: {
        receiverAddress: '0x0',
      },
      reward: { rewardAmountUsd: 25000, rewardToken: 'USDC' },
    })
  )

  return (
    <div className="flex flex-col">
      <CreateProjectForm bounties={bounties} />
      <div className="flex flex-row">
        <div className="basis-1/3">
          <BountiesList bounties={getBountiesForReceiver(static_receiver)} />
        </div>
      </div>
    </div>
  )
}
