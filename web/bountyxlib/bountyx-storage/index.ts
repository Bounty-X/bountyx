import { BountyxStorage } from './bountyx-storage'
import { Constants } from '@/config/constants'

export { BountyxStorage }

let bountyxStorage: BountyxStorage

export const getBountyxStorage = () => {
  if (!bountyxStorage) {
    bountyxStorage = new BountyxStorage({
      nftStorageToken: Constants.NFT_STORAGE_TOKEN,
      web3StorageToken: Constants.WEB3_STORAGE_TOKEN,
    })
  }
  return bountyxStorage
}
