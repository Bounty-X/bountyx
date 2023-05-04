// SPDX-License-Identifier: UNKNOWN
pragma solidity 0.8.19;

import { IHyperDrop } from "./interfaces/IHyperDrop.sol";
import { MerkleProof } from "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";
import { Ownable } from "openzeppelin-contracts/access/Ownable.sol";

contract BountyXHyperDrop is Ownable, IHyperDrop {

    // @notice thrown if an address already claimed that token
    error BountyXHyperDrop__AlreadyClaimed();
    // @notice thrown if the leaf is not a part of the merkle tree
    error BountyXHyperDrop__NotClaimable();

    event Claimed(address indexed to, bytes32 indexed leaf);
    event MerkleRootUpdated(bytes32 indexed newRoot);

    // @notice root of the merkle tree for the hyperdrop, updateable
    bytes32 public merkleRoot;

    // @notice Mapping of addresses to leafs of the tree that identify claimed tokens
    mapping(address => mapping(bytes32 => bool)) claims;

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the leaf is a part of the merkle tree
     */ 
    function claim(address to, bytes32 leaf, bytes32[] calldata proof) external {
        if (claims[to][leaf]) revert BountyXHyperDrop__AlreadyClaimed();

        bool isClaimable = MerkleProof.verify(proof, merkleRoot, leaf);
        if (!isClaimable) revert BountyXHyperDrop__NotClaimable();
        claims[to][leaf] = true;

        // Mint a hypercert

        emit Claimed(to, leaf);
    }
    
    /**
     * @notice Updates the root of the merkle tree when a new drop is added to it
     */
    function updateRoot(bytes32 newRoot) external onlyOwner {
        merkleRoot = newRoot;
    }
}