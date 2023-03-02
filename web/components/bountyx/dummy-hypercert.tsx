// import { promises as fs } from 'fs'
// import path from 'path'

import { useEffect, useState } from 'react'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { getBountyxMetadata } from '@/bountyxlib/bountyx-storage'

// interface DummyHypercertProps {
//   bounties: any
// }

export const DummyHypercert = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={metadata?.image} alt="Background" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{metadata?.name}</h2>
        <p>{metadata?.hypercert?.work_scope.name}</p>
        <div className="badge badge-secondary">{metadata?.hypercert?.work_scope.display_value}</div>
        <p>{metadata?.hypercert?.impact_scope.name}</p>
        <div className="badge badge-secondary">{metadata?.hypercert?.impact_scope.display_value}</div>
        <p>{metadata?.hypercert?.rights.name}</p>
        <div className="badge badge-secondary">{metadata?.hypercert?.rights.display_value}</div>
        <div className="card-actions justify-center">
          <p>{metadata?.hypercert?.contributors.name}</p>
          <div className="badge badge-outline">{metadata?.hypercert?.contributors.display_value}</div>
        </div>
        <br />
        {metadata.bounties && (
          <>
            <figure>
              <img src={metadata.bounties[0].issuer?.issuerLogoUrl} alt="Metamask" />
            </figure>
            <p>Bounty Name</p>
            <div className="badge badge-secondary">{metadata.bounties[0].name}</div>
            <p>Bounty Issuer</p>
            <div className="badge badge-secondary">{metadata.bounties[0].issuer?.issuerName}</div>
            <p>Reward</p>
            <div className="badge badge-secondary">{metadata.bounties[0].reward?.rewardAmountUsd}</div>
            <p>{metadata.bounties[0].description}</p>
            <br />
          </>
        )}
        <p>{metadata?.description}</p>
      </div>
    </div>
  )
}

// export async function getStaticProps() {
//   const bountiesJson = await fs.readFile(path.join(process.cwd(), './static-data/ETHDenver_180bounties_challanges.json'), 'utf8')
//   return {
//     props: {
//       bounties: JSON.parse(bountiesJson),
//     },
//   }
// }
