import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { BountyIconListItem } from '@/components/certificate/bounty-icon-list-item'

type EligibleClaimCardProps = {
  bounties: BountyxMetadata[]
}

export default function EligibleClaimCard({ bounties }: EligibleClaimCardProps) {
  if (bounties.length === 0) {
    return <div>No Eligible Claims</div>
  }
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure className="px-4 pt-4">
        <img src="/ethdenver-icon.jpeg" alt="Group" className="rounded-xl" />
      </figure>
      <div className="card-body py-4 items-center text-center">
        <h2 className="card-title">{bounties[0].group}</h2>
        <div className="badge">Reward: {bounties.reduce<number>((accu, bounty) => accu + bounty.reward.rewardAmount, 0)}</div>
        <div className="flex flex-row gap-2">
          {bounties.map((bounty) => (
            <BountyIconListItem bountyMetadata={bounty} />
          ))}
        </div>
        <div className="card-actions">
          <button className="btn btn-primary">Claim Hypercert</button>
        </div>
      </div>
    </div>
  )
}
