import { BountyxStorage } from './bountyx-storage'

export { BountyxStorage }

let bountyxStorage: BountyxStorage

export const getBountyxStorage = () => {
  const WEB3_STORAGE_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEMwMzAzNDg3M0RiNTFkODRhOTUyNmMxNThDNTg2ZDgzQjYzM2M5YTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc4MzE3NTAzNTgsIm5hbWUiOiJib3VudHl4In0.cwmpku2WcsqyXJ6J_MdfnLeNe6AMl70lRkOxtfQINzw'
  const NFT_STORAGE_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVDNzU1NDY3MDlDQmRjM2E5YTUzNDYzQ2MxRTM4N2I1NDFGYzE5NjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NzgzMTE4NjQxNCwibmFtZSI6ImJvdW50eXgifQ.Dj2d1wkMgNSTVAOcvR6HnZgdSUneZmmipAyVn_3eVBQ'
  if (!bountyxStorage) {
    bountyxStorage = new BountyxStorage({
      nftStorageToken: NFT_STORAGE_TOKEN,
      web3StorageToken: WEB3_STORAGE_TOKEN,
    })
  }
  return bountyxStorage
}
