// SPDX-License-Identifier: UNKNOWN
pragma solidity 0.8.19;

interface IHyperDrop {

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the leaf is a part of the merkle tree
     */ 
    function claim(address to, bytes32 leaf, bytes32[] calldata proof, bytes32 merkleRoot) external;
    
    /**
     * @notice Creates a new hyperdrop by registering a new merkle root
     */
    function createHyperdrop(bytes32 newMerkleRoot) external;

    /**
     * @notice Verifies that leaf is included in the merkle root
     */
    function isClaimableHyperdrop(bytes32 leaf, bytes32[] calldata proof, bytes32 merkleRoot) external view returns (bool);
}