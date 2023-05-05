import { BountyxMerkleLeafData } from "../../types/bountyxmerkleleafdata";
import { groupedBountyData } from "./ethdenver2023";

export const getHyperdropLeavesData = (): BountyxMerkleLeafData[] => {
  const bountyxMerkleLeafs: BountyxMerkleLeafData[] = [];
  for (const groupedBounties of groupedBountyData) {
    for (const bounty of groupedBounties.bounties) {
      const { name, submittedByOrgName } = bounty;
      bounty.rewards.map((reward) => {
        bountyxMerkleLeafs.push({
          group: groupedBounties.group.groupName,
          bountyName: name,
          issuerName: submittedByOrgName,
          receiverAddress: reward.receiver.receiverAddress
            ? reward.receiver.receiverAddress
            : "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720", // deterministic hardhat address #9
          reward: {
            rewardAmount: parseInt(reward.rewardAmountUsd)
          }
        });
      });
    }
  }
  return bountyxMerkleLeafs;
};
