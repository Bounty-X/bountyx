import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

interface BountyListItemProps {
  bounty: BountyxMetadata
}

export const BountyListItem = ({ bounty }: BountyListItemProps) => {
  return (
    <div className="flex flex-row  rounded-box outline outline-1 outline-slate-200 mb-4">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={bounty.issuer.issuerLogoUrl} alt={bounty.issuer.issuerName} />
        </div>
        <p>{bounty.issuer.issuerName}</p>
        {/* <p>{bounty.description}</p> */}
        <p>{`Bounty Reward: ${bounty?.reward?.rewardAmountUsd} USD`}</p>
      </div>
    </div>
  )
}
