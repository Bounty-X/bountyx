// SPDX-License-Identifier: UNKNOWN
pragma solidity ^0.8.16;

import { IHypercertToken } from "hypercerts/contracts/src/interfaces/IHypercertToken.sol";


interface IHyperDrop {

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the leaf is a part of a merkle tree
     */ 
        function claimSingleHyperdrop(
        address to,
        bytes32 leaf,
        bytes32[] calldata proof,
        bytes32 merkleRoot,
        uint256 units,
        uint256[] memory fractions,
        string memory uri,
        IHypercertToken.TransferRestrictions restrictions
    ) external;
    
    /**
     * @notice Allows to claim a hypercert if an address is eligible and the batch of leafs is included in a merkle tree
     */ 
    function claimHyperdrop(
        address to,
        bytes32[] calldata leaves,
        bytes32[][] calldata proofs,
        bytes32 merkleRoot,
        uint256 units,
        uint256[] memory fractions,
        string memory uri,
        IHypercertToken.TransferRestrictions restrictions
    ) external;
    
    /**
     * @notice Creates a new hyperdrop by registering a new merkle root
     */
    function createHyperdrop(bytes32 newMerkleRoot) external;

    /**
     * @notice Verifies that leaf is included in the merkle root
     */
    function isClaimableHyperdrop(bytes32 leaf, bytes32[] calldata proof, bytes32 merkleRoot) external view returns (bool);
}