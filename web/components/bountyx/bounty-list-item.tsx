import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
const HtmlToReactParser = require('html-to-react').Parser

interface BountyListItemProps {
  bounty: BountyxMetadata
}

const htmlToReactParser = new HtmlToReactParser()

export const BountyListItem = ({ bounty }: BountyListItemProps) => {
  const reactElement = htmlToReactParser.parse(bounty.description)

  return (
    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
      <div className="flex flex-row">
        <div className="w-12 rounded-full ml-2 mt-2 mr-2">
          <img src={bounty.issuer.issuerLogoUrl} alt={bounty.issuer.issuerName} />
        </div>
        <div className="collapse-title text-xl font-medium">{bounty.issuer.issuerName}</div>
      </div>
      <div className="badge badge-outline">first</div>
      <div className="collapse-content">
        <div tabIndex={0} />
        <p>{reactElement}</p>
      </div>
    </div>
  )
}
