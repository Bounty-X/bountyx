import { useEffect, useState } from 'react'
import * as React from 'react'

import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { HypercertClaimdata } from '@/bountyxlib/types/claimdata'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'
import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata'

import { BountyIconListItem } from './bounty-icon-list-item'

export default function CertificateImageHtml({
  projectMetadata,
  bounties,
  backgroundUrl,
}: {
  projectMetadata: ProjectMetadata
  bounties: BountyxMetadata[]
  backgroundUrl: string
}) {
  // Declare a new state variable, which we'll call "count"

  const renderBounties = (): any[] => {
    if (!bounties) return []

    const list: any[] = []
    bounties.forEach((item: BountyxMetadata) => {
      list.push(<BountyIconListItem bountyMetadata={item} />)
    })
    return list
  }

  const renderImpactBadges = (): any[] => {
    let impactScopeBadgeList: any[] = []
    let impactScopeNameList: string[] = []
    bounties.forEach((bounty) => {
      if (!impactScopeNameList.includes(bounty.issuer?.issuerName!)) {
        impactScopeNameList.push(bounty.issuer?.issuerName!)
        impactScopeBadgeList.push(<div className="badge-outline badge mr-2">{bounty.issuer?.issuerName!}</div>)
      }
    })
    return impactScopeBadgeList
  }

  const timeline = bounties.at(0)?.group === 'Eth Denver 2023' ? '2023-02-25 ⟶ 2023-03-04' : '2023-03-13 ⟶ 2023-03-31'

  return (
    <>
      <div
        className="border--slate-700 divide--slate-700 relative h-[525px] w-[375px] divide-y overflow-hidden rounded-3xl border-2 bg-base-200 bg-cover"
        style={{ backgroundImage: `url(${backgroundUrl})` }}>
        <div className="my-4 mx-8">{renderBounties()}</div>
        <div className=" absolute left-0 top-[300px] h-[225px] w-[375px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <div className="mx-10">
            <div className="my-4">
              <span className="font-sans text-3xl font-bold decoration-white antialiased">{projectMetadata.name}</span>
            </div>
            <div className="my-2">
              <span className="text-small font-sans decoration-white antialiased">{timeline}</span>
            </div>
            <div className="badge-outline badge mr-2">{bounties.at(0)?.group}</div>
            <div className="mt-10 mb-2 flex-row">
              <span className="text-small font-sans decoration-white antialiased">Impacted Organizations</span>
            </div>
            {renderImpactBadges()}
          </div>
        </div>
      </div>
    </>
  )
}
