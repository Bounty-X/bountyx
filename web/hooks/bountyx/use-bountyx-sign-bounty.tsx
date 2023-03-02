import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { useSignMessage } from 'wagmi'

export const generateEndorsmentMessage = (bounty: BountyxMetadata) => {
  return `I certify that ${bounty.receiver?.receiverAddress} won a bounty from ${bounty.issuer.issuerName} and recieved a reward equal to ${bounty.reward.rewardAmountUsd}`
}

//TODO: update with signTypedData when contract is ready
export const useBountyxSignBounty = (bounty: BountyxMetadata) => {
  const endorsementMessage = generateEndorsmentMessage(bounty)
  return useSignMessage({ message: endorsementMessage })
}
