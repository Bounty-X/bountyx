import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
interface BountyIconListProps {
    bountyMetadata: BountyxMetadata
}


export const BountyIconListItem = ({ bountyMetadata } : BountyIconListProps) => {
  let iconUrl = bountyMetadata.issuer.issuerLogoUrl;
  if (!bountyMetadata) {
    return null
  }

  return (
    <div style={{ backgroundImage: `url(${bountyMetadata.issuer.issuerLogoUrl})`}}
         className="my-4 bg-cover bg-center h-12 w-12 rounded-full "></div>
  );
}
