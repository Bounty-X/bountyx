import { BountyIconListItem } from '@/components/certificate/bounty-icon-list-item'
import { LinkComponent } from '@/components/shared/link-component'
import { EligibleGroupedClaim } from '@/lib/hyperdrop/hyperdrop-eligibilty'
import { EligibleClaimContext } from '@/providers/eligible-claim-provider'
import { useContext } from 'react'

type EligibleClaimCardProps = {
  claim: EligibleGroupedClaim
}

export default function EligibleClaimCard({ claim }: EligibleClaimCardProps) {
  const eligibleClaimContext = useContext(EligibleClaimContext)

  if (claim.bounties.length === 0) {
    return <div>No Eligible Claims</div>
  }
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure className="px-4 pt-4">
        <img src="/ethdenver-icon.jpeg" alt="Group" className="rounded-xl" />
      </figure>
      <div className="card-body py-4 items-center text-center">
        <h2 className="card-title">{claim.bounties[0].group}</h2>
        <div className="badge">Reward: {claim.bounties.reduce<number>((accu, bounty) => accu + bounty.reward.rewardAmount, 0)}</div>
        <div className="flex flex-row gap-2 flex-wrap">
          {claim.bounties.map((bounty) => (
            <BountyIconListItem bountyMetadata={bounty} />
          ))}
        </div>
        <div className="card-actions">
          <LinkComponent href="/claim">
            <button
              className="btn btn-primary"
              onClick={() => {
                eligibleClaimContext?.setClaim(claim)
              }}>
              Claim Hypercert
            </button>
          </LinkComponent>
        </div>
      </div>
    </div>
  )
}
