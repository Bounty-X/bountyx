import { defaultNftStorageClient, getNftStorageGatewayUri } from '@hypercerts-org/hypercerts-sdk/lib/operator/index.js'
// import { HypercertMetadata } from "@hypercerts-org/hypercerts-sdk";
import axios from 'axios'
// @ts-ignore
import { NFTStorage, CIDString, Blob } from 'nft.storage'
import { BountyxMetadata } from '../types/bountyxdata.js'
import { HypercertMetadata } from '../types/metadata.js'

/**
 * Stores NFT metadata into NFT.storage
 * @param data
 * @param targetClient
 * @returns
 */
export const storeBountyxMetadata = async (data: HypercertMetadata & BountyxMetadata, targetClient?: NFTStorage): Promise<CIDString> => {
  console.log('Storing bouuntyx & hypercert metadata: ', data)
  const client = targetClient ?? defaultNftStorageClient
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const cid = await client.storeBlob(blob)
  return cid
}

/**
 * Retrieves NFT metadata from NFT.storage
 * @param cidOrIpfsUri
 * @returns
 */
export const getBountyxMetadata = async (cidOrIpfsUri: string): Promise<HypercertMetadata & BountyxMetadata> => {
  const nftStorageGatewayLink = getNftStorageGatewayUri(cidOrIpfsUri)
  console.log(`Getting metadata ${cidOrIpfsUri} at ${nftStorageGatewayLink}`)
  return axios.get<HypercertMetadata & BountyxMetadata>(nftStorageGatewayLink).then((result) => result.data)
}
