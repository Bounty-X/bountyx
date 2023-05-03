// SPDX-License-Identifier: UNKNOWN
pragma solidity 0.8.19;

interface IHyperDrop {

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the leaf is a part of the merkle tree
     */ 

    function claim(address to, bytes32 leaf, bytes32[] calldata proof) external;
    
    /**
     * @notice Updates the root of the merkle tree when a new drop is added to it
     */
    function updateRoot(bytes32 newRoot) external;
}