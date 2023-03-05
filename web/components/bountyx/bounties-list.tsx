import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

import { BountyListItem } from './bounty-list-item'

interface BountiesListProps {
  bounties: BountyxMetadata[]
}

const renderBountiesList = (bounties: BountyxMetadata[]) => {
  console.log(bounties)
  const list: any[] = []
  bounties.forEach((bounty) => {
    list.push(<BountyListItem key={bounty.name} bounty={bounty} />)
  })
  return list
}

export const BountiesList = ({ bounties }: BountiesListProps) => {
  return (
    <div>
      <h1 className="font-bold mt-4 ml-4 mb-4">Bounties Won</h1>
      <div className="grid">{renderBountiesList(bounties)}</div>
    </div>
  )
}
