import { useEffect, useState } from 'react'

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
  const [isSigned, setIsSigned] = useState<boolean>(false)

  const { data, isError, isLoading, isSuccess, signMessage } = useBountyxSignBounty(bounty)

  useEffect(() => {
    console.log('Signature', data)
    if (isSuccess) {
      setBounty((prev) => ({ ...prev, signature: data }))
      setIsSigned(true)
    }
  }, [data])

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      {!isSigned && <div className="badge-info badge">Not Signed</div>}
      {isSigned && <div className="badge-success badge">Signed</div>}
      {isError && <div className="badge-error badge">Signature Error</div>}
      <figure>
        <img src={bounty.issuer.issuerLogoUrl} alt={bounty.issuer.issuerName} />
      </figure>
      <div className="card-body">
        <div className="badge-secondary badge">{bounty.issuer.issuerName}</div>
        <h2 className="card-title">{bounty.name}</h2>
        <div className="card-actions justify-center">
          <p>Bounty Receiver</p>
          <div className="badge-outline badge">{bounty.receiver?.receiverAddress}</div>
          <p>Bounty Amount in USD</p>
          <div className="badge-outline badge">{bounty.reward?.rewardAmountUsd}</div>
        </div>
        <p>{bounty.description}</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn" disabled={isLoading || isSigned} onClick={() => signMessage()}>
            Endorse
          </button>
        </div>
      </div>
    </div>
  )
}
