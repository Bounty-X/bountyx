import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

const HtmlToReactParser = require('html-to-react').Parser

interface BountyListItemProps {
  bounty: BountyxMetadata
}

const htmlToReactParser = new HtmlToReactParser()

export const BountyListItem = ({ bounty }: BountyListItemProps) => {
  const reactElement = htmlToReactParser.parse(bounty.description)

  return (
    <div tabIndex={0} className="collapse-arrow collapse rounded-b-none border border-base-300 bg-base-100">
      <div className="flex flex-row">
        <div className="mx-2 mt-2 w-12 rounded-full">
          <img src={bounty.issuer.issuerLogoUrl} alt={bounty.issuer.issuerName} />
        </div>
        <div className="collapse-title text-xl font-medium">{`${bounty.issuer.issuerName} - Reward: $${bounty.reward.rewardAmountUsd}`}</div>
      </div>
      <div className="collapse-content">
        <div tabIndex={0} />
        <p>{reactElement}</p>
      </div>
    </div>
  )
}
