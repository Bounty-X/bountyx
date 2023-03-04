import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

interface BountyListItemProps {
  bounty: BountyxMetadata
}

export const BountyListItem = ({ bounty }: BountyListItemProps) => {
  return (
    <div className="flex flex-row bg-base-300 rounded-box">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={bounty.issuer.issuerLogoUrl} alt={bounty.issuer.issuerName} />
        </div>
        <p>{bounty.issuer.issuerName}</p>
        {/* <p>{bounty.description}</p> */}
        <p>{`Bounty Reward: ${bounty.reward.rewardAmountUsd} USD`}</p>
      </div>
    </div>
  )
}
