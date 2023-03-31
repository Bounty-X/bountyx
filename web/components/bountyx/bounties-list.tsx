import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { useState } from 'react'

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
  const [currentGroup, setCurrentGroup] = useState<string>('')

  const groups: string[] = []
  bounties.map((item) => {
    if (item.group && groups.findIndex((el) => el === item.group) === -1) {
      groups.push(item.group)
    }
  })

  return (
    <div className="flex flex-col">
      <h1 className="my-4 ml-4 font-bold">Bounties Won</h1>
      <select className="select select-bordered w-full max-w-xs" onChange={(e) => setCurrentGroup(e.target.value)}>
        <option disabled selected>
          Event
        </option>
        {groups.map((group) => (
          <option>{group}</option>
        ))}
      </select>
      <div className="grid">{renderBountiesList(bounties.filter((bounty) => bounty.group! === currentGroup))}</div>
    </div>
  )
}
