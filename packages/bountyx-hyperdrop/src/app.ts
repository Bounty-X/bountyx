import fs from "fs"; // Filesystem
import path from "path"; // Path routing
import Generator from "./generator"; // Generator
import { logger } from "./utils/logger"; // Logging
import { BountyxMerkleLeaf } from "./types/bountyxmerkleleaf";

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
  const hyperdrop: BountyxMerkleLeaf[] = configData.hyperdrop;
  console.log("hyperdrop: ", hyperdrop);

  // Initialize and call generator
  const generator = new Generator(hyperdrop);
  await generator.process();
})();
