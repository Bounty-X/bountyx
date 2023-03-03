// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Alchemy, Network, Nft } from 'alchemy-sdk'

import { getBountyxStorage } from '@/bountyxlib/bountyx-storage'
import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'

const settings = {
  apiKey: 'BJaIUlfPThKFKXvdPfqf19yxXdbYmZ0H', // Todo clean this up
  network: Network.ETH_GOERLI, // Todo clean this up
}

const alchemy = new Alchemy(settings)

export const getNftsForOwner = async (args: { address: any; collection: string }): Promise<HypercertMetadata[]> => {
  console.log('NFT_STORAGE_TOKEN', process.env.NFT_STORAGE_TOKEN)
  console.log('WEB3_STORAGE_TOKEN', process.env.WEB3_STORAGE_TOKEN)

  const nftsForOwner = await alchemy.nft.getNftsForOwner(args.address)
  const bountyXNFTs: HypercertMetadata[] = []
  if (nftsForOwner.totalCount > 0) {
    const hypercertNFTs = nftsForOwner.ownedNfts.filter((nft) => nft.contract.address.toLowerCase() === args.collection.toLowerCase())
    for (const nft of hypercertNFTs) {
      if (!nft.tokenUri) {
        throw Error('No token uri defined')
      }
      console.log(nft.tokenUri.raw.replace('ipfs://', ''))
      const hcMetadata = await getBountyxStorage().getBountyxMetadata(nft.tokenUri.raw.replace('ipfs://', ''))
      console.log(nft)
      const bxMetadata: HypercertMetadata = {
        name: hcMetadata.name,
        description: hcMetadata.description,
        image: hcMetadata.image,
        external_url: hcMetadata.external_url,
        properties: hcMetadata.properties,
        hypercert: hcMetadata.hypercert,
        version: hcMetadata.version,
        tokenId: nft.tokenId,
        collection: nft.contract.address,
      }
      bountyXNFTs.push(bxMetadata)
    }
  }
  return bountyXNFTs
}
