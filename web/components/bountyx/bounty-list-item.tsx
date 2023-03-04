import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

interface BountyListItemProps {
  bounty: BountyxMetadata
}

export const BountyListItem = ({ bounty }: BountyListItemProps) => {
  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={bounty.issuer.issuerLogoUrl} alt={bounty.issuer.issuerName} />
        </div>
        <p>{bounty.issuer.issuerName}</p>
        {/* <p>{bounty.description}</p> */}
        <p>{`Bounty Reward: ${bounty?.reward?.rewardAmountUsd} USD`}</p>
      </div>
    </div>
    // <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    //   <div className="w-24 rounded-full">
    //     <img src={bounty.issuer.issuerLogoUrl} alt={bounty.issuer.issuerName} />
    //   </div>
    //   <div className="collapse-title text-xl font-medium">Focus me to see content</div>
    //   <div className="collapse-content">
    //     <p>tabIndex={0} attribute is necessary to make the div focusable</p>
    //   </div>
    // </div>
  )
}
