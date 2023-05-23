import * as merkleData from './merkle.json'
import MerkleTree from 'merkletreejs'
import keccak256 from 'keccak256'
import { getBountyXMetadataItem, getHyperdropLeavesPublicData } from '../api/hackathon-providers/buidlbox/buidlbox-api'
import { BountyxMerkleLeafData } from '@/../packages/bountyx-hyperdrop/src/types/bountyxmerkleleafdata'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
// import { solidityPackedKeccak256 } from 'ethers' //TODO: update to ethersv6
import { formatBytes32String, solidityKeccak256, toUtf8Bytes } from 'ethers/lib/utils.js'
import { getBountyXHyperDrop, readBountyXHyperDrop } from '../blockchain'

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
  bounty: BountyxMetadata
}

export const getEligibleHyperdropClaims = async (address: `0x${string}`): Promise<EligibleClaim[]> => {
  const eligibleClaims: EligibleClaim[] = []

  const leaves: Buffer[] = merkleData.tree.leaves.map((leaf) => Buffer.from(leaf.data))
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
  const hyperdropLeavesData: BountyxMerkleLeafData[] = getHyperdropLeavesPublicData()

  const hyperdopContract = getBountyXHyperDrop({ address: '0x0' })

  for (const bountyData of hyperdropLeavesData) {
    bountyData.receiverAddress = address

    const leaf = generateLeaf(bountyData)
    const proof: `0x${string}`[] = merkleTree.getHexProof(leaf) as `0x${string}`[]

    if (proof.length === 0) {
      continue
    }

    const claimable = await hyperdopContract.isClaimableHyperdrop(
      formatBytes32String(leaf.toString()) as `0x${string}`,
      proof,
      formatBytes32String(merkleTree.getRoot().toString()) as `0x${string}`
    )

    if (claimable) {
      eligibleClaims.push({
        address,
        leaf,
        proof,
        merkleRoot: merkleTree.getHexRoot(),
        bounty: getBountyXMetadataItem(bountyData),
      })
    }
  }

  return eligibleClaims
}
