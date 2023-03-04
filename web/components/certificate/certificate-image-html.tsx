import { useEffect, useState } from 'react'
import * as React from 'react'

import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata';
import { BountyIconListItem } from './bounty-icon-list-item';

import { HypercertMetadata } from '@/bountyxlib/types/metadata'

export default function CertificateImageHtml({ metadata }: { metadata: HypercertMetadata & BountyxMetadataCollection }) {
  // Declare a new state variable, which we'll call "count"
  const [backgroundUrl, setBackgroundUrl] = useState("/ethdenverstage.png");

  const renderBounties = (): any[] => {
    if (!metadata.bounties) return []

    const list: any[] = []
    metadata.bounties.forEach((item: BountyxMetadata) => {
      list.push(<BountyIconListItem bountyMetadata={item} />)
    })
    return list
  }
  

  return <>
    <div className="overflow-hidden relative bg-base-200 h-[525px] w-[375px] rounded-3xl" style={{backgroundImage: 'url(/ethdenverstage.png)'}}>
      <div className="my-4 mx-8">
          {renderBounties()}
      </div>
      <div className=" absolute left-0 top-[200px] h-[325px] w-[375px] bg-gradient-to-t from-slate-600 via-slate-400  to-transparent">
        <div className="mx-10">
          <div className="divider decoration-white outline-white stroke-white divide-white"></div> 
          <div className="my-2">
            <span className="text-3xl font-bold antialiased font-sans decoration-white">{metadata.name}</span>
          </div>
          <div className="my-2">
            <span className="text-small antialiased font-sans decoration-white">2023-02-25 ⟶ 2023-03-04</span>
          </div>
          <div className="my-2 flex-row">
            <span className="text-small antialiased font-sans decoration-white">Impact: {metadata?.hypercert?.impact_scope?.value}</span>
          </div>
          <div className="my-2 flex-row">
            <span className="text-small antialiased font-sans decoration-white">Rights:</span>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-row">
      <div className="btn-group">
        <button className="btn btn-active">Galactic</button>
        <button className="btn">EthDenver</button>
        <button className="btn">Mountains</button>
      </div>
    </div>
  </>
}
