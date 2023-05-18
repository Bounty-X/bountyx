// SPDX-License-Identifier: UNKNOWN
pragma solidity ^0.8.16;

import { IHyperDrop } from "./interfaces/IHyperDrop.sol";
import { MerkleProof } from "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";
import { Ownable } from "openzeppelin-contracts/access/Ownable.sol";

import { IHypercertToken } from "hypercerts/contracts/src/interfaces/IHypercertToken.sol";
import { HypercertMinter } from "hypercerts/contracts/src/HypercertMinter.sol";


contract BountyXHyperDrop is Ownable, IHyperDrop {

    // @notice thrown if an address already claimed that token
    error BountyXHyperDrop__AlreadyClaimed();
    // @notice thrown if the leaf is not a part of the merkle tree
    error BountyXHyperDrop__NotClaimable();
    // @notice thrown if the provided merkle tree root is not a part of the drop
    error BountyXHyperDrop__InvalidRoot();
    // @notice thrown if the provided leafs and proofs length mismatch for the batch claim
    error BountyXHyperDrop__InvalidClaimInput();

    event ClaimedSingle(address indexed to, bytes32 indexed leaf);
    event Claimed(address indexed to, bytes32[] indexed leaves);
    event MerkleRootAdded(bytes32 indexed newRoot, address indexed publisher);

    // @notice merkle tree roots for the hyperdrops
    mapping(bytes32 => address) hyperdropMerkleRoots;

    // @notice Mapping of addresses to leafs of the trees that identify claimed tokens
    mapping(address => mapping(bytes32 => bool)) claims;

    // @notice Hypercert Minter address
    HypercertMinter hypercertMinter;

    constructor(HypercertMinter _hypercertMinter) {
        hypercertMinter = _hypercertMinter;
    }

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the leaf is a part of a merkle tree
     * @notice Distributes the fractions of the hypercert to the intended receivers
     */ 
    function claimSingleHyperdropWithFractions(
        address to,
        bytes32 leaf,
        bytes32[] calldata proof,
        bytes32 merkleRoot,
        uint256 units,
        uint256[] memory fractions,
        string memory uri,
        IHypercertToken.TransferRestrictions restrictions
    ) external {
        _claimSingleHyperdrop(to, leaf, proof, merkleRoot);

        hypercertMinter.mintClaimWithFractions(to, units, fractions, uri, restrictions);

        emit ClaimedSingle(to, leaf);
    }

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the batch of leafs is included in a merkle tree
     * @notice Distributes the fractions of the hypercert to the intended receivers
     */ 
    function claimHyperdropWithFractions(
        address to,
        bytes32[] calldata leaves,
        bytes32[][] calldata proofs,
        bytes32 merkleRoot,
        uint256 units,
        uint256[] memory fractions,
        string memory uri,
        IHypercertToken.TransferRestrictions restrictions
    ) external {
        _claimHyperdrop(to, leaves, proofs, merkleRoot);

        hypercertMinter.mintClaimWithFractions(to, units, fractions, uri, restrictions);

        emit Claimed(to, leaves);
    }

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the leaf is a part of a merkle tree
     * @notice Creates an allow list to claim fractions of the hypercert by intended receivers
     */ 
    function claimSingleHyperdrop(
        address to,
        bytes32 leaf,
        bytes32[] calldata proof,
        bytes32 hyperDropMerkleRoot,
        uint256 units,
        bytes32 allowListMerkleRoot,
        string memory uri,
        IHypercertToken.TransferRestrictions restrictions
    ) external {
        _claimSingleHyperdrop(to, leaf, proof, hyperDropMerkleRoot);

        hypercertMinter.createAllowlist(to, units, allowListMerkleRoot, uri, restrictions);

        emit ClaimedSingle(to, leaf);
    }

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the batch of leafs is included in a merkle tree.
     * @notice Creates an allow list to claim fractions of the hypercert by intended receivers
     */ 
    function claimHyperdrop(
        address to,
        bytes32[] calldata leaves,
        bytes32[][] calldata proofs,
        bytes32 hyperDropMerkleRoot,
        uint256 units,
        bytes32 allowListMerkleRoot,
        string memory uri,
        IHypercertToken.TransferRestrictions restrictions
    ) external {
        _claimHyperdrop(to, leaves, proofs, hyperDropMerkleRoot);

        hypercertMinter.createAllowlist(to, units, allowListMerkleRoot, uri, restrictions);

        emit Claimed(to, leaves);
    }
    
    /**
     * @notice Creates a new hyperdrop by registering a new merkle root
     */
    function createHyperdrop(bytes32 newMerkleRoot) external { //from allowlist
        hyperdropMerkleRoots[newMerkleRoot] = msg.sender;
    }

    /**
     * @notice Verifies that leaf is included in the merkle root
     */
    function isClaimableHyperdrop(bytes32 leaf, bytes32[] calldata proof, bytes32 merkleRoot) external view returns (bool) {
        if (hyperdropMerkleRoots[merkleRoot] == address(0)) revert BountyXHyperDrop__InvalidRoot();
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the leaf is a part of a merkle tree
     * @notice Distributes the fractions of the hypercert to the intended receivers
     */ 
    function _claimSingleHyperdrop(
        address to,
        bytes32 leaf,
        bytes32[] calldata proof,
        bytes32 merkleRoot
    ) internal {
        if (hyperdropMerkleRoots[merkleRoot] == address(0)) revert BountyXHyperDrop__InvalidRoot();

        if (claims[to][leaf]) revert BountyXHyperDrop__AlreadyClaimed();

        bool isClaimable = MerkleProof.verify(proof, merkleRoot, leaf);
        if (!isClaimable) revert BountyXHyperDrop__NotClaimable();
        claims[to][leaf] = true;
    }

    /**
     * @notice Allows to claim a hypercert if an address is eligible and the batch of leafs is included in a merkle tree
     * @notice Distributes the fractions of the hypercert to the intended receivers
     */ 
    function _claimHyperdrop(
        address to,
        bytes32[] calldata leaves,
        bytes32[][] calldata proofs,
        bytes32 merkleRoot
    ) internal {
        if (hyperdropMerkleRoots[merkleRoot] == address(0)) revert BountyXHyperDrop__InvalidRoot();

        if (leaves.length != proofs.length) revert BountyXHyperDrop__InvalidClaimInput();

        for (uint i = 0; i < leaves.length; ++i) {
            bool isClaimable = MerkleProof.verify(proofs[i], merkleRoot, leaves[i]);
            if (!isClaimable) revert BountyXHyperDrop__NotClaimable();
            
            if (claims[to][leaves[i]]) revert BountyXHyperDrop__AlreadyClaimed();
            claims[to][leaves[i]] = true;
        }
    }
}