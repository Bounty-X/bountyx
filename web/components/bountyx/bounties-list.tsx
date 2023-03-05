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
      <h1 className="my-4 ml-4 font-bold">Bounties Won</h1>
      <div className="grid">{renderBountiesList(bounties)}</div>
    </div>
  )
}
