import { HypercertsStorage } from '@hypercerts-org/hypercerts-sdk'
import { BountyxMetadataCollection } from '../types/bountyxcollection.js'
import { HypercertMetadata } from '../types/metadata.js'
import axios from 'axios'
import { NFTStorage, CIDString, Blob } from 'nft.storage'

type HypercertStorageProps = {
  nftStorageToken?: string
  web3StorageToken?: string
}

const getCid = (cidOrIpfsUri: string) => cidOrIpfsUri.replace('ipfs://', '')

const getNftStorageGatewayUri = (cidOrIpfsUri: string) => {
  const NFT_STORAGE_IPFS_GATEWAY = 'https://nftstorage.link/ipfs/{cid}'
  return NFT_STORAGE_IPFS_GATEWAY.replace('{cid}', getCid(cidOrIpfsUri))
}

// @ts-ignore
export class BountyxStorage extends HypercertsStorage {
  nftStorageClientCopy: NFTStorage

  constructor({ nftStorageToken, web3StorageToken }: HypercertStorageProps) {
    super({ nftStorageToken, web3StorageToken })

    const _nftStorageToken = nftStorageToken ? nftStorageToken : process.env.NFT_STORAGE_TOKEN

    if (!_nftStorageToken || _nftStorageToken === '') {
      throw new Error('Invalid API key')
    }
    this.nftStorageClientCopy = new NFTStorage({ token: _nftStorageToken! })
  }

  public async storeBountyxMetadata(data: HypercertMetadata & BountyxMetadataCollection): Promise<CIDString> {
    console.log('Storing bouuntyx & hypercert metadata: ', data)
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    return this.nftStorageClientCopy.storeBlob(blob)
  }

  public async getBountyxMetadata(cidOrIpfsUri: string): Promise<HypercertMetadata & BountyxMetadataCollection> {
    const nftStorageGatewayLink = getNftStorageGatewayUri(cidOrIpfsUri)
    console.log(`Getting bountyx & hypercert metadata ${cidOrIpfsUri} at ${nftStorageGatewayLink}`)
    return axios.get<HypercertMetadata & BountyxMetadataCollection>(nftStorageGatewayLink).then((result) => result.data)
  }
}
