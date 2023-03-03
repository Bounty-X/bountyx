import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { BountyListItem } from './bounty-list-item'

interface BountiesListProps {
  bounties: BountyxMetadata[]
}

export const BountiesList = ({ bounties }: BountiesListProps) => {
  return (
    <div className="grid">
      {bounties.map((bounty) => (
        <BountyListItem bounty={bounty} />
      ))}
    </div>
  )
}
