import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { BountyxMerkleLeafData } from '@/../packages/bountyx-hyperdrop/src/types/bountyxmerkleleafdata'

import { groupedBountyData } from './buidlbox-bounties'

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
          // receiver: {
          //   receiverAddress: '0x0000000000000000000000000000000000000000',
          // },
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
          // receiver: {
          //   receiverAddress: '0x0000000000000000000000000000000000000000',
          // },
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

export const getBountiesForReceiver = (receiver: string): BountyxMetadata[] => {
  return convertToBountyxMetadata()
}

export const getAllBounties = (): BountyxMetadata[] => {
  return convertToBountyxMetadata()
}

export const getAllGroups = (): string[] => {
  return groupedBountyData.map((item) => item.group.groupDisplayName)
}

export const getHyperdropLeavesPublicData = (): BountyxMerkleLeafData[] => {
  const bounties: BountyxMetadata[] = convertToBountyxMetadata()
  const bountyxMerkleLeafs: BountyxMerkleLeafData[] = []
  for (const bounty of bounties) {
    bountyxMerkleLeafs.push({
      group: bounty.group ?? '',
      bountyName: bounty.name,
      issuerName: bounty.issuer.issuerName,
      receiverAddress: bounty.receiver?.receiverAddress ?? '0x0000000000000000000000000000000000000000',
      reward: {
        rewardAmount: bounty.reward.rewardAmount,
      },
    })
  }
  return bountyxMerkleLeafs
}

export const getBountyXMetadataItem = (leafData: BountyxMerkleLeafData): BountyxMetadata => {
  //TODO: temp before persistency is built
  const bountyxMetadataItems: BountyxMetadata[] = convertToBountyxMetadata()
  const metadataItem = bountyxMetadataItems.find(
    (item) =>
      leafData.bountyName === item.name &&
      leafData.issuerName === item.issuer.issuerName &&
      leafData.group === item.group &&
      leafData.reward.rewardAmount === item.reward.rewardAmount
  )
  if (!metadataItem) {
    throw new Error('Cannot locate bountyx metadata item')
  }
  return metadataItem
}
