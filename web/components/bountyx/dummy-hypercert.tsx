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
  const [metadata, setMetadata] = useState<HypercertMetadata & BountyxMetadata>({} as any)

  useEffect(() => {
    const receiveBountyxHypercert = async () => {
      const receivedData = await getBountyxMetadata('bafkreihqfy7tkimvuldlg33fncg5ubhkqadq33a2gd36z6sciw6f7pxbly')
      console.log('Received bountyx data', receivedData)

      receivedData.bounties = []
      receivedData.bounties.push({
        name: 'Metamask Bounty',
        description: 'metamask description',
        issuer: {
          issuerAddress: '0x0',
          issuerName: 'Metamask',
          issuerLogoUrl: 'https://org-resources.s3.amazonaws.com/a301ff9b-d07c-419b-9bbb-6da09bd7423a/logo/logo.png',
        },
        reward: { rewardAmountUsd: 1000 },
        endorsement: 'I metamask say that I paid x usd to y',
        signature: 'signature',
      })
      console.log('Full metadata', receivedData)
      setMetadata(receivedData)
    }
    receiveBountyxHypercert()
  }, [])

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
