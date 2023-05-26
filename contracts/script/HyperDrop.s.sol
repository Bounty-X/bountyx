// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";

import { HypercertMinter } from "hypercerts/contracts/src/HypercertMinter.sol";
import { BountyXHyperDrop } from "../src/BountyXHyperDrop.sol";

/**
 * @title HyperDropScriptDeployLocal
 * @notice Script for deploying HyperDrop.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy HyperDrop with forge script
 * example start anvil with `anvil` command and then run
 * forge script script/HyperDrop.s.sol:HyperDropScriptDeployLocal --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast -vvv
 * @dev Scripts can be used for any scripting not just deployment
 */
contract HyperDropScriptDeployLocal is Script {
  function run() external {
    // Use empty startBroadcast for local deployment
    // --private-key is provided in the command line
    vm.startBroadcast();

    // deploy HypercertMinter
    HypercertMinter hypercertMinter = new HypercertMinter();
    console.log("HypercertMinter Address:", address(hypercertMinter));
    // deploy HyperDrop
    BountyXHyperDrop hyperDrop = new BountyXHyperDrop(hypercertMinter);
    console.log("HyperDrop Address:", address(hyperDrop));

    bytes32 tempMerkleRoot = 0xec7abd24ed1aa16af0230b138648bedf34e720609c7cf362118cc4a1efa8f92c;
    hyperDrop.createHyperdrop(tempMerkleRoot);

    // stop broadcasting transactions
    vm.stopBroadcast();
  }
}

/**
 * @title ScriptDeployLive
 * @notice Script for deploying HyperDrop.
 * @dev https://book.getfoundry.sh/reference/forge/forge-script
 *
 * @dev This script is used to deploy HyperDrop with forge script
 * example start anvil with `anvil` command and then run
 * forge script contracts/script/HyperDrop.s.sol:HyperDropScriptDeployLive --rpc-url $FORGE_RPC_URL --broadcast -vvv
 * @dev Scripts can be used for any scripting not just deployment
 */
contract HyperDropScriptDeployLive is Script {
  function run() external {
    // read FORGE_PRIVATE_KEY from environment variables
    uint256 deployerPrivateKey = vm.envUint("FORGE_PRIVATE_KEY");

    // start broadcast any transaction after this point will be submitted to chain
    vm.startBroadcast(deployerPrivateKey);

    address HYPERCERT_DEPLOYMENT_ADDRESS = 0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07;
    // deploy HypercertMinter
    HypercertMinter hypercertMinter = HypercertMinter(HYPERCERT_DEPLOYMENT_ADDRESS);
    console.log("HypercertMinter Address:", address(hypercertMinter));
    // deploy HyperDrop
    BountyXHyperDrop hyperDrop = new BountyXHyperDrop(hypercertMinter);
    console.log("HyperDrop Address:", address(hyperDrop));

    // stop broadcasting transactions
    vm.stopBroadcast();
  }
}