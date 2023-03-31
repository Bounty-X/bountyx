import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { useSignMessage } from 'wagmi'

export const generateEndorsmentMessage = (bounty: BountyxMetadata) => {
  return `I certify that ${bounty.receiver?.receiverAddress} won a bounty from ${bounty.issuer.issuerName} and recieved a reward equal to ${bounty.reward.rewardAmount}`
}

export const generateEndorsmentMessageForAll = (bounties: BountyxMetadata[]) => {
  return `I certify that the follwoing accounts won prizes from the following ${bounties.length} issuers at ETHDenver 2023 and recieved the displayed awards`
}

//TODO: update with signTypedData when contract is ready
export const useBountyxSignBounty = (bounty: BountyxMetadata) => {
  const endorsementMessage = generateEndorsmentMessage(bounty)
  return useSignMessage({ message: endorsementMessage })
}

export const useBountyxSignAllBounties = (bounties: BountyxMetadata[]) => {
  const endorsementMessage = generateEndorsmentMessageForAll(bounties)
  return useSignMessage({ message: endorsementMessage })
}
