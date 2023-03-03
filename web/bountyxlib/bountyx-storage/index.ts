import { BountyxStorage } from './bountyx-storage'

export { BountyxStorage }

let bountyxStorage: BountyxStorage

export const getBountyxStorage = () => {
  if (!bountyxStorage) {
    bountyxStorage = new BountyxStorage({
      nftStorageToken: process.env.NFT_STORAGE_TOKEN,
      web3StorageToken: process.env.WEB3_STORAGE_TOKEN,
    })
  }
  return bountyxStorage
}
