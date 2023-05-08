import * as merkleData from './merkle.json'
import MerkleTree from 'merkletreejs'
import keccak256 from 'keccak256'
import { getHyperdropLeavesPublicData } from '../api/buidlboxApi'
import { BountyxMerkleLeafData } from '@/../packages/bountyx-hyperdrop/src/types/bountyxmerkleleafdata'
// import { solidityPackedKeccak256 } from 'ethers' //TODO: update to ethersv6
import { solidityKeccak256 } from 'ethers/lib/utils.js'

const generateLeaf = (hyperdropLeaf: BountyxMerkleLeafData): Buffer => {
  return Buffer.from(
    // Hash in appropriate Merkle format
    solidityKeccak256(
      ['string', 'string', 'string', 'address', 'uint256'],
      [hyperdropLeaf.group, hyperdropLeaf.bountyName, hyperdropLeaf.issuerName, hyperdropLeaf.receiverAddress, hyperdropLeaf.reward.rewardAmount]
    ).slice(2),
    'hex'
  )
}

export type EligibleClaim = {
  address: `0x${string}`
  leaf: Buffer
  proof: string[]
  merkleRoot: string
  bountyData: BountyxMerkleLeafData
}

export const getEligibleHyperdropClaims = (address: `0x${string}`): EligibleClaim[] => {
  const eligibleClaims: EligibleClaim[] = []

  const leaves: Buffer[] = merkleData.tree.leaves.map((leaf) => Buffer.from(leaf.data))
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
  const hyperdropLeavesData: BountyxMerkleLeafData[] = getHyperdropLeavesPublicData()

  for (const bountyData of hyperdropLeavesData) {
    bountyData.receiverAddress = address

    const leaf = generateLeaf(bountyData)
    const proof: string[] = merkleTree.getHexProof(leaf)

    if (proof.length === 0) {
      continue
    } else {
      eligibleClaims.push({
        address,
        leaf,
        proof,
        merkleRoot: merkleTree.getHexRoot(),
        bountyData,
      })
    }
  }

  return eligibleClaims
}
