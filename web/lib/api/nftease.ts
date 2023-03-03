// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy, Nft } from 'alchemy-sdk'
import { HypercertMetadata } from '../../bountyxlib/types/metadata'
import { getBountyxMetadata } from '../../bountyxlib/bountyx-storage'

const settings = {
  apiKey: 'BJaIUlfPThKFKXvdPfqf19yxXdbYmZ0H', // Todo clean this up
  network: Network.ETH_GOERLI, // Todo clean this up
}

const alchemy = new Alchemy(settings)

export const getNftsForOwner = async (args: { address: string; collection: string }): Promise<HypercertMetadata[]> => {
  const nftsForOwner = await alchemy.nft.getNftsForOwner(args.address)
  const bountyXNFTs: HypercertMetadata[] = []
  if (nftsForOwner.totalCount > 0) {
    const hypercertNFTs = nftsForOwner.ownedNfts.filter((nft) => nft.contract.address.toLowerCase() === args.collection.toLowerCase())
    for (const nft of hypercertNFTs) {
      if (!nft.tokenUri) {
        throw Error('No token uri defined')
      }
      console.log(nft.tokenUri.raw.replace('ipfs://', ''))
      const hcMetadata = await getBountyxMetadata(nft.tokenUri.raw.replace('ipfs://', ''))
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
