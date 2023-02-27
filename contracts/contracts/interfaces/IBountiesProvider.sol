// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

interface IBountiesAccessControl {
    function authorizeBountyGroupAdmin(uint256 groupId, address admin) external;
    function revokeBountyGroupAdmin(uint256 groupId, address admin) external;
    function isAuthorized(address account) external returns (bool);
}

interface IBountiesProvider {

    // called by bounty admin
    function awardBounty(uint256 bountyId, uint256 rank, uint256 amount);
}