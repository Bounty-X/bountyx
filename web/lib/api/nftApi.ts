// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Alchemy, Network, Nft } from 'alchemy-sdk'

import { getBountyxStorage } from '@/bountyxlib/bountyx-storage'
import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'

export const getNftsForOwner = async (args: {
  address: any
  collection: string | undefined
  network: Network
}): Promise<{ tokenId: string; collection: string; metadata: HypercertMetadata & BountyxMetadataCollection }[]> => {
  console.log(args)
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: args.network,
  }

  const alchemy = new Alchemy(settings)

  const nftsForOwner = await alchemy.nft.getNftsForOwner(args.address)
  const bountyXNFTs: { tokenId: string; collection: string; metadata: HypercertMetadata & BountyxMetadataCollection }[] = []
  if (nftsForOwner.totalCount > 0) {
    const hypercertNFTs = nftsForOwner.ownedNfts.filter(
      (nft) => args.collection && nft.contract.address.toLowerCase() === args.collection.toLowerCase()
    )
    for (const nft of hypercertNFTs) {
      if (!nft.tokenUri) {
        throw Error('No token uri defined')
      }
      console.log(nft.tokenUri.raw.replace('ipfs://', ''))
      const metadata: HypercertMetadata & BountyxMetadataCollection = await getBountyxStorage().getBountyxMetadata(
        nft.tokenUri.raw.replace('ipfs://', '')
      )
      console.log(nft)
      bountyXNFTs.push({ tokenId: nft.tokenId, collection: args.collection!, metadata })
    }
  }

  return bountyXNFTs
}
