import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { useState } from 'react'

import { BountyListItem } from './bounty-list-item'

const ANY_EVENT = 'Any Event'

interface BountiesListProps {
  groups: string[]
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

export const BountiesList = ({ groups, bounties }: BountiesListProps) => {
  const [currentGroup, setCurrentGroup] = useState<string>(ANY_EVENT)

  return (
    <div className="flex flex-col">
      <h1 className="my-4 ml-4 font-bold">Bounties Won</h1>
      <select className="select select-bordered w-full max-w-xs m-4" onChange={(e) => setCurrentGroup(e.target.value)}>
        <option selected>{ANY_EVENT}</option>
        {groups.map((group) => (
          <option key={group}>{group}</option>
        ))}
      </select>
      {bounties.length === 0 && <span className="badge badge-info m-4">You don't have any bounties to claim</span>}
      <div className="grid">{renderBountiesList(bounties.filter((bounty) => ANY_EVENT === currentGroup || bounty.group! === currentGroup))}</div>
    </div>
  )
}
