// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

struct EIP712Signature {
    uint8 v;
    bytes32 r;
    bytes32 s;
    uint256 deadline;
}


interface IBountyxHub {    

    // called by event admin or bounty funder or contributor - allows to claim
    function issueProjectBountyHypercert(address creator, uint256 units, bytes32 merkleRoot, string memory uri, EIP712Signature endorsementSignature, string metadata) returns (uint256 projectId, uint256 tokenId);

    // called by event admin or bounty funder or contributor - allows to claim
    function mergeProjectBountyHypercert(uint256 projectId, address creator, uint256 newUnits, bytes32 merkleRoot, string memory uri, EIP712Signature endorsementSignature, string metadata) returns (uint256 newTokenId);

    // called by event admin - airdrops directly
    function issueProjectBountyHypercert(address creator, uint256 units, uint256[] calldata fractions, address[] coowners, string memory uri, EIP712Signature endorsementSignature, string metadata) returns (uint256 projectId, uint256 tokenId);

    // called by event admin - redistributes directly
    function mergeProjectBountyHypercert(uint256 projectId, address creator, uint256 newUnits, uint256[] calldata fractions, address[] coowners, string memory uri, EIP712Signature endorsementSignature, string metadata) returns (uint256 newTokenId);

    // called by funder - aggregator function that combines awardBounty + issueHypercert
    function awardBountyAndIssueHypercert() returns (uint256 hypercertId);

    // called by funder
    function awardBounty();
}