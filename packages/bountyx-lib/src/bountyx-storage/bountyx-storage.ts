import { HypercertsStorage } from "@hypercerts-org/hypercerts-sdk";
import { CIDString } from "nft.storage";
import {
  HypercertBountyxMetadata,
  getBountyxMetadata,
  storeBountyxMetadata,
} from "./index.js";

export class BountyxStorage extends HypercertsStorage {
  public async storeBountyxMetadata(
    data: HypercertBountyxMetadata
  ): Promise<CIDString> {
    return await storeBountyxMetadata(data);
  }

  public async getBountyxMetadata(
    cidOrIpfsUri: string
  ): Promise<HypercertBountyxMetadata> {
    return await getBountyxMetadata(cidOrIpfsUri);
  }
}
