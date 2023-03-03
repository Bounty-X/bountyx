import { BountyxStorage } from './bountyx-storage'

export { BountyxStorage }

export const bountyxStorage = new BountyxStorage({
  nftStorageToken: process.env.NFT_STORAGE_TOKEN,
  web3StorageToken: process.env.WEB3_STORAGE_TOKEN,
})
