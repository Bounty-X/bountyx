import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { challenges } from './challenges'

export const getBountiesForReceiver = (receiver: string): BountyxMetadata[] => {
  const bounties: BountyxMetadata[] = []

  console.log(receiver)

  for (const challenge of challenges) {
    if (receiver.toLowerCase() !== challenge.receiver.receiverAddress.toLowerCase()) {
      continue
    }

    const bountyXMetadata = {
      name: challenge.name,
      description: challenge.description,
      issuer: {
        issuerAddress: '',
        issuerName: challenge.submittedByOrgName,
        issuerLogoUrl: challenge.submittedByOrgLogo,
        // [k: string]: unknown;
      },
      receiver: {
        receiverAddress: challenge.receiver.receiverAddress, // for now
        //[k: string]: unknown;
      },
      reward: {
        rewardAmountUsd: Number(challenge.rewards[0].rewardAmountUsd),
        rewardToken: challenge.rewardToken,
        // [k: string]: unknown;
      },
      signature: '',
    }

    bounties.push(bountyXMetadata)
  }

  return bounties
}
