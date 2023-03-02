import { HypercertsStorage } from '@hypercerts-org/hypercerts-sdk'
import { CIDString } from 'nft.storage'
import { BountyxMetadataCollection } from '../types/bountyxcollection.js'
import { HypercertMetadata } from '../types/metadata.js'
import { getBountyxMetadata, storeBountyxMetadata } from './index.js'

export class BountyxStorage extends HypercertsStorage {
  public async storeBountyxMetadata(data: HypercertMetadata & BountyxMetadataCollection): Promise<CIDString> {
    return await storeBountyxMetadata(data)
  }

  public async getBountyxMetadata(cidOrIpfsUri: string): Promise<HypercertMetadata & BountyxMetadataCollection> {
    return await getBountyxMetadata(cidOrIpfsUri)
  }
}
