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
    // @notice thrown if the provided merkle tree root is not a part of the drop
    error BountyXHyperDrop__InvalidRoot();

    event Claimed(address indexed to, bytes32 indexed leaf);
    event MerkleRootAdded(bytes32 indexed newRoot, address indexed publisher);

    // @notice merkle tree roots for the hyperdrops
    mapping(bytes32 => address) hyperdropMerkleRoots;

    // @notice Mapping of addresses to leafs of the trees that identify claimed tokens
    mapping(address => mapping(bytes32 => bool)) claims;

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the leaf is a part of the merkle tree
     */ 
    function claim(address to, bytes32 leaf, bytes32[] calldata proof, bytes32 merkleRoot) external {
        if (hyperdropMerkleRoots[merkleRoot] == address(0)) revert BountyXHyperDrop__InvalidRoot();

        if (claims[to][leaf]) revert BountyXHyperDrop__AlreadyClaimed();

        bool isClaimable = MerkleProof.verify(proof, merkleRoot, leaf);
        if (!isClaimable) revert BountyXHyperDrop__NotClaimable();
        claims[to][leaf] = true;

        // Mint a hypercert

        emit Claimed(to, leaf);
    }
    
    /**
     * @notice Creates a new hyperdrop by registering a new merkle root
     */
    function createHyperdrop(bytes32 newMerkleRoot) external { //from allowlist
        hyperdropMerkleRoots[newMerkleRoot] = msg.sender;
    }

    function isClaimableHyperdrop(bytes32 leaf, bytes32[] calldata proof, bytes32 merkleRoot) external view returns (bool) {
        if (hyperdropMerkleRoots[merkleRoot] == address(0)) revert BountyXHyperDrop__InvalidRoot();
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }
}