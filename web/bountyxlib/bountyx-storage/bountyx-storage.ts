import { HypercertsStorage } from '@hypercerts-org/hypercerts-sdk'
import { CIDString } from 'nft.storage'
import { BountyxMetadata } from '../types/bountyxdata.js'
import { HypercertMetadata } from '../types/metadata.js'
import { getBountyxMetadata, storeBountyxMetadata } from './index.js'

export class BountyxStorage extends HypercertsStorage {
  public async storeBountyxMetadata(data: HypercertMetadata & BountyxMetadata): Promise<CIDString> {
    return await storeBountyxMetadata(data)
  }

  public async getBountyxMetadata(cidOrIpfsUri: string): Promise<HypercertMetadata & BountyxMetadata> {
    return await getBountyxMetadata(cidOrIpfsUri)
  }
}
