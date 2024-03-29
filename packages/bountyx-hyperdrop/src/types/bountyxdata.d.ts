/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Bountyx metadata structure
 */
export interface BountyxMetadata {
  /**
   * Name of the bounty group, usually event name
   */
  group: string;
  /**
   * Name of the bounty
   */
  name: string;
  /**
   * Description of the bounty
   */
  description?: string;
  /**
   * Issuer of the bounty
   */
  issuer: {
    /**
     * Bounty issuer address
     */
    issuerAddress?: string;
    /**
     * Bounty issuer public name
     */
    issuerName: string;
    /**
     * Bounty issuer logo url
     */
    issuerLogoUrl?: string;
    [k: string]: unknown;
  };
  /**
   * Receiver of the bounty
   */
  receiver?: {
    receiverAddress?: string;
    [k: string]: unknown;
  };
  /**
   * Information about the reward
   */
  reward: {
    /**
     * Amount paid out by bounty issuer to the project in USD or token
     */
    rewardAmount: number;
    /**
     * Tells if the reward amount is in USD or token
     */
    rewardInToken?: boolean;
    /**
     * Token used to pay the bounty
     */
    rewardToken?: string;
    /**
     * Rank of the winner
     */
    winnerRank?: number;
    [k: string]: unknown;
  };
}
