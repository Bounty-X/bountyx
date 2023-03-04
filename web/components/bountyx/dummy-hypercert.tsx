import { useEffect, useState } from 'react'

import { getBountyxStorage } from '@/bountyxlib/bountyx-storage'
import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'

interface DummyHypercertProps {
  metadata: HypercertMetadata & BountyxMetadataCollection
}

export const DummyHypercert = ({ metadata }: DummyHypercertProps) => {
  // const [metadata, setMetadata] = useState<HypercertMetadata & BountyxMetadataCollection>({} as any)

  // useEffect(() => {
  //   const receiveBountyxHypercert = async () => {
  //     const receivedData = await getBountyxStorage().getBountyxMetadata('bafkreihqfy7tkimvuldlg33fncg5ubhkqadq33a2gd36z6sciw6f7pxbly')
  //     console.log('Received bountyx data', receivedData)
  //     setMetadata(receivedData)
  //   }
  //   receiveBountyxHypercert()
  // }, [])

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={metadata?.image} alt="Background" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{metadata?.name}</h2>
        <p>{metadata?.hypercert?.work_scope?.name}</p>
        <div className="badge-secondary badge">{metadata?.hypercert?.work_scope?.display_value}</div>
        <p>{metadata?.hypercert?.impact_scope?.name}</p>
        <div className="badge-secondary badge">{metadata?.hypercert?.impact_scope?.display_value}</div>
        <p>{metadata?.hypercert?.rights?.name}</p>
        <div className="badge-secondary badge">{metadata?.hypercert?.rights?.display_value}</div>
        <div className="card-actions justify-center">
          <p>{metadata?.hypercert?.contributors?.name}</p>
          <div className="badge-outline badge">{metadata?.hypercert?.contributors?.display_value}</div>
        </div>
        {/* <p>{metadata?.description}</p> */}
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
