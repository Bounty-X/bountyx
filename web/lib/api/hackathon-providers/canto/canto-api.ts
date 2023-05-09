import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { BountyxMerkleLeafData } from '@/../packages/bountyx-hyperdrop/src/types/bountyxmerkleleafdata'

import { groupedBountyData } from './canto-bounties'

const convertToBountyxMetadata = (): BountyxMetadata[] => {
  const bountiesMetadata: BountyxMetadata[] = []

  for (const groupedBounties of groupedBountyData) {
    for (const bounty of groupedBounties.bounties) {
      const partialBountyXMetadata = {
        group: groupedBounties.group.groupDisplayName,
        name: bounty.name,
        description: bounty.description,
        issuer: {
          issuerAddress: '0x0000000000000000000000000000000000000000',
          issuerName: bounty.submittedByOrgName,
          issuerLogoUrl: bounty.submittedByOrgLogo,
        },
      }

      if (bounty.rewardPool) {
        bountiesMetadata.push({
          ...partialBountyXMetadata,
          receiver: {
            receiverAddress: '0x0000000000000000000000000000000000000000',
          },
          reward: {
            rewardAmount: parseInt(bounty.rewardPool),
            rewardToken: bounty.rewardToken,
            rewardInToken: bounty.rewardInToken ?? false,
          },
        })
      }

      for (const reward of bounty.rewards) {
        bountiesMetadata.push({
          ...partialBountyXMetadata,
          receiver: {
            receiverAddress: '0x0000000000000000000000000000000000000000',
          },
          reward: {
            rewardAmount: parseInt(reward.rewardAmountUsd),
            rewardToken: bounty.rewardToken,
            rewardInToken: bounty.rewardInToken ?? false,
          },
        })
      }
    }
  }

  return bountiesMetadata
}

export const getHyperdropLeavesPublicData = (): BountyxMerkleLeafData[] => {
  const bounties: BountyxMetadata[] = convertToBountyxMetadata()
  const bountyxMerkleLeafs: BountyxMerkleLeafData[] = []
  for (const bounty of bounties) {
    bountyxMerkleLeafs.push({
      group: bounty.group ?? '',
      bountyName: bounty.name,
      issuerName: bounty.issuer.issuerName,
      receiverAddress: bounty.receiver?.receiverAddress ?? '0x',
      reward: {
        rewardAmount: bounty.reward.rewardAmount,
      },
    })
  }
  return bountyxMerkleLeafs
}
