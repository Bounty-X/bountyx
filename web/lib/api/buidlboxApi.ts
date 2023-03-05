import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

import { challenges } from './challenges'

export const getBountiesForReceiver = (receiver: string): BountyxMetadata[] => {
  if (!receiver) return []

  const bounties: BountyxMetadata[] = []

  for (const challenge of challenges) {
    for (const reward of challenge.rewards) {
      if (receiver.toLowerCase() !== reward.receiver.receiverAddress.toLowerCase()) {
        continue
      }

      const bountyXMetadata = {
        name: challenge.name,
        description: challenge.description,
        issuer: {
          issuerAddress: '0xa0facBd53826095f65CBe48F43ddba293d8FD19b',
          issuerName: challenge.submittedByOrgName,
          issuerLogoUrl: challenge.submittedByOrgLogo,
          // [k: string]: unknown;
        },
        receiver: {
          receiverAddress: reward.receiver.receiverAddress, // for now
          //[k: string]: unknown;
        },
        reward: {
          rewardAmountUsd: parseInt(reward.rewardAmountUsd),
          rewardToken: challenge.rewardToken,
          // [k: string]: unknown;
        },
        signature: '',
      }

      bounties.push(bountyXMetadata)
    }
  }

  return bounties
}

export const getAllBounties = (): BountyxMetadata[] => {
  const bounties: BountyxMetadata[] = []

  for (const challenge of challenges) {
    for (const reward of challenge.rewards) {
      const bountyXMetadata = {
        name: challenge.name,
        description: challenge.description,
        issuer: {
          issuerAddress: '0xa0facBd53826095f65CBe48F43ddba293d8FD19b',
          issuerName: challenge.submittedByOrgName,
          issuerLogoUrl: challenge.submittedByOrgLogo,
          // [k: string]: unknown;
        },
        receiver: {
          receiverAddress: reward.receiver.receiverAddress, // for now
          //[k: string]: unknown;
        },
        reward: {
          rewardAmountUsd: parseInt(reward.rewardAmountUsd),
          rewardToken: challenge.rewardToken,
          // [k: string]: unknown;
        },
        signature: '',
      }

      bounties.push(bountyXMetadata)
    }
  }

  return bounties
}
