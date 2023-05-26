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
    return "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // hardhat/foundry address #0
  }
  return "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"; // hardhat/foundry address #9
}
