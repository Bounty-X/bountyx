import { useEffect, useState } from 'react'
import * as React from 'react'

import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata';
import { BountyIconListItem } from './bounty-icon-list-item';

import { HypercertMetadata } from '@/bountyxlib/types/metadata'

export default function CertificateImageHtml({ metadata }: { metadata: HypercertMetadata & BountyxMetadataCollection }) {
  // Declare a new state variable, which we'll call "count"
  const [backgroundUrl, setBackgroundUrl] = useState("/astronomy-bg.jpeg");

  const renderBounties = (): any[] => {
    if (!metadata.bounties) return []

    const list: any[] = []
    metadata.bounties.forEach((item: BountyxMetadata) => {
      list.push(<BountyIconListItem bountyMetadata={item} />)
    })
    return list
  }

  return <>
    <div className="border-2 bg-cover border--slate-700 divide-y divide--slate-700 overflow-hidden relative bg-base-200 h-[525px] w-[375px] rounded-3xl" 
        style={{ backgroundImage: `url(${backgroundUrl})`}}>
      <div className="my-4 mx-8">
          {renderBounties()}
      </div>
      <div className=" absolute left-0 top-[300px] h-[225px] w-[375px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        <div className="mx-10">
          <div className="my-4">
            <span className="text-3xl font-bold antialiased font-sans decoration-white">{metadata.name}</span>
          </div>
          <div className="my-2">
            <span className="text-small antialiased font-sans decoration-white">2023-02-25 ⟶ 2023-03-04</span>
          </div>
          <div className="my-2 flex-row">
            <span className="text-small antialiased font-sans decoration-white">Impact: {metadata?.hypercert?.impact_scope?.value}</span>
          </div>
          <div className="my-2 flex-row">
            <span className="text-small antialiased font-sans decoration-white">Rights: public</span>
          </div>
        </div>
      </div>
    </div>
    <div className="mx-4 flex flex-row">
      <div className="btn-group">
        <button className="btn btn-active">Galactic</button>
        <button className="btn">EthDenver</button>
        <button className="btn">Mountains</button>
      </div>
    </div>
  </>
}
