import * as merkleData from './merkle.json'
import MerkleTree from 'merkletreejs'
import keccak256 from 'keccak256'
import { getBountyXMetadataItem, getHyperdropLeavesPublicData } from '../api/hackathon-providers/buidlbox/buidlbox-api'
import { BountyxMerkleLeafData } from '@/../packages/bountyx-hyperdrop/src/types/bountyxmerkleleafdata'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
// import { solidityPackedKeccak256 } from 'ethers' //TODO: update to ethersv6
import { hexlify, solidityKeccak256 } from 'ethers/lib/utils.js'
import { readBountyXHyperDrop } from '../blockchain'

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

export type EligibleGroupedClaim = {
  address: `0x${string}`
  leaves: Buffer[]
  proofs: `0x${string}`[][]
  merkleRoot: Buffer
  bounties: BountyxMetadata[]
}

export const getEligibleHyperdropClaims = async (address: `0x${string}`): Promise<EligibleGroupedClaim> => {
  const leaves: Buffer[] = merkleData.tree.leaves.map((leaf) => Buffer.from(leaf.data))
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
  const hyperdropLeavesData: BountyxMerkleLeafData[] = getHyperdropLeavesPublicData()

  const eligibleGroupedClaim: EligibleGroupedClaim = {
    address,
    leaves: [],
    proofs: [],
    merkleRoot: merkleTree.getRoot(),
    bounties: [],
  }

  for (const bountyData of hyperdropLeavesData) {
    bountyData.receiverAddress = address

    const leaf = generateLeaf(bountyData)
    const proof: `0x${string}`[] = merkleTree.getHexProof(leaf) as `0x${string}`[]

    if (proof.length === 0) {
      continue
    }

    const claimable = await readBountyXHyperDrop({
      functionName: 'isClaimableHyperdrop',
      args: [hexlify(leaf) as `0x${string}`, proof, hexlify(merkleTree.getRoot()) as `0x${string}`],
    })

    if (claimable) {
      eligibleGroupedClaim.leaves.push(leaf)
      eligibleGroupedClaim.proofs.push(proof)
      eligibleGroupedClaim.bounties.push(getBountyXMetadataItem(bountyData))
    }
  }

  return eligibleGroupedClaim
}
