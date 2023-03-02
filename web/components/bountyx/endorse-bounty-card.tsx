import { useState } from 'react'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { useBountyxSignBounty } from '@/hooks/bountyx/use-bountyx-sign-bounty'

export const EndorseBountyCard = () => {
  const [bounty, setBounty] = useState<BountyxMetadata>({
    name: 'Metamask Bounty',
    description: 'metamask description',
    issuer: {
      issuerAddress: '0x0',
      issuerName: 'Metamask',
      issuerLogoUrl: 'https://org-resources.s3.amazonaws.com/a301ff9b-d07c-419b-9bbb-6da09bd7423a/logo/logo.png',
    },
    receiver: {
      receiverAddress: '0x0',
    },
    reward: { rewardAmountUsd: 1000, rewardToken: 'USDC' },
  })
  const [signed, setSigned] = useState<boolean>(false)

  const { data, isError, isLoading, isSuccess, signMessage } = useBountyxSignBounty(bounty)
  if (data) {
    console.log('Signature', data)
    setBounty((prev) => ({ ...prev, signature: data }))
    setSigned(true)
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="badge badge-info">Not Signed</div>
      {isSuccess && <div className="badge badge-success">Signed</div>}
      {isError && <div className="badge badge-error">Signature Error</div>}
      <figure>
        <img src={bounty.issuer.issuerLogoUrl} alt={bounty.issuer.issuerName} />
      </figure>
      <div className="card-body">
        <div className="badge badge-secondary">{bounty.issuer.issuerName}</div>
        <h2 className="card-title">{bounty.name}</h2>
        <div className="card-actions justify-center">
          <p>Bounty Receiver</p>
          <div className="badge badge-outline">{bounty.receiver?.receiverAddress}</div>
          <p>Bounty Amount in USD</p>
          <div className="badge badge-outline">{bounty.reward.rewardAmountUsd}</div>
        </div>
        <p>{bounty.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" disabled={isLoading || signed} onClick={() => signMessage()}>
            Endorse
          </button>
        </div>
      </div>
    </div>
  )
}
