export default function getWinnerAddress(
  group: string,
  bountyName: string,
  rewardAmount: number
) {
  if (
    (bountyName === "0x Labs: Build Token Swaps with 0x Swap API" &&
      rewardAmount === 3000) ||
    (bountyName === "Decentralized Frontend Hosting for DAOs" &&
      rewardAmount === 5000) ||
    (bountyName === "zkBob Bounty" && rewardAmount === 10000)
  ) {
    return "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1190";
  }
  return "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"; // hardhat/foundry address #9
}
