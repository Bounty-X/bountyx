import fs from "fs"; // Filesystem
import path from "path"; // Path
import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import { logger } from "./utils/logger"; // Logging
import { getAddress, solidityPackedKeccak256 } from "ethers";
import { BountyxMerkleLeaf } from "./types/bountyxmerkleleaf";

// Output file path
const outputPath: string = path.join(__dirname, "../merkle.json");

export default class Generator {
  // Airdrop recipients
  recipients: BountyxMerkleLeaf[] = [];

  /**
   * Setup generator
   * @param {number} decimals of token
   * @param {Record<string, number>} airdrop address to token claim mapping
   */
  constructor(hyperdrop: BountyxMerkleLeaf[]) {
    //TODO: implement validation
    this.recipients = hyperdrop;
    // For each airdrop entry
    // for (const [address, tokens] of Object.entries(hyperdrop)) {
    //   // Push:
    //   this.recipients.push({
    //     // Checksum address
    //     address: getAddress(address),
    //     // Scaled number of tokens claimable by recipient
    //     value: parseUnits(tokens.toString(), decimals).toString()
    //   });
    // }
  }

  /**
   * Generate Merkle Tree leaf from address and value
   * @param {string} address of airdrop claimee
   * @param {string} value of airdrop tokens to claimee
   * @returns {Buffer} Merkle Tree node
   */
  generateLeaf(hyperdropLeaf: BountyxMerkleLeaf): Buffer {
    return Buffer.from(
      // Hash in appropriate Merkle format
      solidityPackedKeccak256(
        ["string", "string", "string", "address", "uint256"],
        [
          hyperdropLeaf.group,
          hyperdropLeaf.bountyName,
          hyperdropLeaf.issuerName,
          hyperdropLeaf.receiverAddress,
          hyperdropLeaf.reward.rewardAmount
        ]
      ).slice(2),
      "hex"
    );
  }

  async process(): Promise<void> {
    logger.info("Generating Merkle tree.");

    // Generate merkle tree
    const merkleTree = new MerkleTree(
      // Generate leafs
      this.recipients.map((hyperdropLeafData) =>
        this.generateLeaf(hyperdropLeafData)
      ),
      // Hashing function
      keccak256,
      { sortPairs: true }
    );

    // Collect and log merkle root
    const merkleRoot: string = merkleTree.getHexRoot();
    logger.info(`Generated Merkle root: ${merkleRoot}`);

    // Collect and save merkle tree + root
    await fs.writeFileSync(
      // Output to merkle.json
      outputPath,
      // Root + full tree
      JSON.stringify({
        root: merkleRoot,
        tree: merkleTree
      })
    );
    logger.info("Generated merkle tree and root saved to Merkle.json.");
  }
}
