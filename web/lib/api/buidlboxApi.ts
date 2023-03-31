import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

import { groupedBountyData } from './challenges'

const getBountiesFor = (account: string, include: (account: string, receivers: string[]) => boolean): BountyxMetadata[] => {
  const bountiesMetadata: BountyxMetadata[] = []

  for (const groupedBounties of groupedBountyData) {
    for (const bounty of groupedBounties.bounties) {
      const partialBountyXMetadata = {
        group: groupedBounties.group.groupDisplayName,
        name: bounty.name,
        description: bounty.description,
        issuer: {
          issuerAddress: '0xa0facBd53826095f65CBe48F43ddba293d8FD19b',
          issuerName: bounty.submittedByOrgName,
          issuerLogoUrl: bounty.submittedByOrgLogo,
          // [k: string]: unknown;
        },
        signature: '',
      }

      if (bounty.rewardPool && bounty.rewardPoolReceivers && include(account, bounty.rewardPoolReceivers)) {
        bountiesMetadata.push({
          ...partialBountyXMetadata,
          receiver: {
            receiverAddress: account,
          },
          reward: {
            rewardAmount: parseInt(bounty.rewardPool),
            rewardToken: bounty.rewardToken,
            rewardInToken: bounty.rewardInToken ?? false,
          },
        })
      }

      for (const reward of bounty.rewards) {
        if (!include(account, [reward.receiver.receiverAddress])) {
          continue
        }

        bountiesMetadata.push({
          ...partialBountyXMetadata,
          receiver: {
            receiverAddress: account, // for now
            //[k: string]: unknown;
          },
          reward: {
            rewardAmount: parseInt(reward.rewardAmountUsd),
            rewardToken: bounty.rewardToken,
            rewardInToken: bounty.rewardInToken ?? false,
            // [k: string]: unknown;
          },
          signature: '',
        })
      }
    }
  }

  return bountiesMetadata
}

export const getBountiesForReceiver = (receiver: string): BountyxMetadata[] => {
  return getBountiesFor(receiver, (account: string, receivers: string[]) => {
    return receivers.map((item) => item.toLowerCase()).indexOf(account.toLowerCase()) !== -1
  })
}

export const getAllBounties = (): BountyxMetadata[] => {
  const bounties: BountyxMetadata[] = []

  return getBountiesFor('', (account: string, receiver: string[]) => {
    return true
  })
}
