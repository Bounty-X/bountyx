import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
interface BountyIconListProps {
  bountyMetadata: BountyxMetadata
}

export const BountyIconListItem = ({ bountyMetadata }: BountyIconListProps) => {
  let iconUrl = bountyMetadata.issuer.issuerLogoUrl
  if (!bountyMetadata) {
    return null
  }
  console.log('bg log0', bountyMetadata.issuer.issuerName + '-logo.png')

  return (
    <div
      style={{ backgroundImage: `url(/sponsor-images/${bountyMetadata.issuer.issuerName!.replace(/\s/g, '') + '-logo.png'})` }}
      className="my-4 h-12 w-12 rounded-full bg-cover bg-center "></div>
  )
}
