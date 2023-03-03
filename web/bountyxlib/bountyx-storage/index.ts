import { BountyxStorage } from './bountyx-storage'
import { Constants } from '@/config/constants'

export { BountyxStorage }

let bountyxStorage: BountyxStorage

export const getBountyxStorage = () => {
  if (!bountyxStorage) {
    bountyxStorage = new BountyxStorage({
      nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
      web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
    })
  }
  return bountyxStorage
}
