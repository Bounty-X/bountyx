import fs from "fs"; // Filesystem
import path from "path"; // Path routing
import Generator from "./generator"; // Generator
import { logger } from "./utils/logger"; // Logging
import { BountyxMerkleLeafData } from "./types/bountyxmerkleleafdata";
import { getHyperdropLeavesData } from "./bounties/buidlbox/config-generator";

// Config file path
const configPath: string = path.join(__dirname, "../config.json");

/**
 * Throws error and exists process
 * @param {string} erorr to log
 */
function throwErrorAndExit(error: string): void {
  logger.error(error);
  process.exit(1);
}

(async () => {
  const bountyxMerkleLeafs: BountyxMerkleLeafData[] = getHyperdropLeavesData();
  fs.writeFileSync(
    configPath,
    JSON.stringify({
      hyperdrop: bountyxMerkleLeafs
    })
  );

  // Check if config exists
  if (!fs.existsSync(configPath)) {
    throwErrorAndExit("Missing config.json. Please add.");
  }

  // Read config
  const configFile: Buffer = await fs.readFileSync(configPath);
  const configData = JSON.parse(configFile.toString());

  // Check if config contains airdrop key
  if (configData["hyperdrop"] === undefined) {
    throwErrorAndExit("Missing hyperdrop param in config. Please add.");
  }

  // Collect config
  const hyperdrop: BountyxMerkleLeafData[] = configData.hyperdrop;

  // Initialize and call generator
  const generator = new Generator(hyperdrop);
  await generator.process();
})();
