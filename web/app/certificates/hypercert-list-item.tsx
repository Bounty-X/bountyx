import { HypercertMetadata } from '@/bountyxlib/types/metadata'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
const ellipsize = require('ellipsize')

const contributors = (contrib: any) => {
  if (!contrib) return []

  const list: any = []
  contrib.value.forEach((item: any) => {
    list.push(
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={'bountyx-default.png'} />
              </div>
            </div>
            <div>
              <div className="font-bold">{ellipsize(item, 9, { truncate: 'middle' })}</div>
              <span className="badge badge-ghost badge-sm">{item?.relationship == 'sponsor' ? 'Sponsor' : 'Core Contributor'}</span>
            </div>
          </div>
        </td>
      </tr>
    )
  })
  return list
}
const hypercertOwners = (contributors: string[], issuers: string[]) => {
  if (!contributors && !issuers) return []
  console.log('contributors', contributors)
  console.log('issuers', issuers)
  const owners = contributors.concat(issuers)
  const ownerPercentage = 100 / owners.length

  const ownersMap = new Map<string, number>()
  for (const owner of owners) {
    if (ownersMap.has(owner)) {
      ownersMap.set(owner, ownersMap.get(owner)! + ownerPercentage)
    } else {
      ownersMap.set(owner, ownerPercentage)
    }
  }

  const list: any = []
  ownersMap.forEach((value, key) => {
    list.push(
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={'bountyx-default.png'} />
              </div>
            </div>
            <div>
              <div className="font-bold">{ellipsize(key, 9, { truncate: 'middle' })}</div>
            </div>
          </div>
        </td>
        <td>
          <div className="text-l font-bold">{value.toFixed(2)} %</div>
        </td>
      </tr>
    )
  })
  return list
}

const sumAndFormatAmounts = (bounties: BountyxMetadata[]): string => {
  const sum = bounties.reduce((sum, addend) => {
    return sum + addend.reward.rewardAmountUsd!
  }, 0)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(sum)
}

export const HyperCertListItem = ({
  tokenId,
  collection,
  metadata,
}: {
  tokenId: string
  collection: string
  metadata: HypercertMetadata & BountyxMetadataCollection
}) => {
  if (!metadata) {
    return null
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="flex">
        <img src={metadata.image} />
      </figure>
      <div className="card-body">
        <div className="flex w-full h-full">
          <div className="grid flex-grow card bg-base-300 rounded-box">
            <div>
              <div className="text-l font-bold">CONTRIBUTORS</div>
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <tbody>{contributors(metadata.hypercert.contributors)}</tbody>
                </table>
              </div>
              <div className="text-l font-bold">OWNERS</div>
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <tbody>
                    {hypercertOwners(
                      metadata.hypercert?.contributors?.value.map((val: string) => val.toLowerCase()),
                      metadata.bounties?.map((val) => val.issuer.issuerAddress.toLowerCase())
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-2"></div>
          <div className="grid flex-grow card bg-base-300 rounded-box">
            <div className="flex w-full">
              <div className="grid h-20 flex-grow">
                <div className="mb-4">
                  <div className="text-xl font-bold">BOUNTY</div>
                  {metadata.bounties && <div className="text-l font-italic font-bold mt-8 mb-2">{sumAndFormatAmounts(metadata.bounties)}</div>}
                  <a className="link">View Transaction</a>
                </div>
              </div>
              <div className="divider divider-horizontal" />
              <div className="grid h-20 flex-grow">
                <div>
                  <div className="text-xl font-bold">NFT</div>
                  <div className="text-l font-italic font-bold mt-8 mb-2">Token ID - {ellipsize(tokenId, 9, { truncate: 'middle' })}</div>
                  <a className="link" target="_blank" href={'https://testnets.opensea.io/assets/goerli/' + collection + '/' + tokenId}>
                    View On OpenSea
                  </a>
                </div>
              </div>
            </div>
            <div className="divider" />
            <button className="btn btn-block">ACCESS TEAM CHAT</button>
            <button className="btn btn-block">CREATE GITCOIN PROJECT</button>
            <button className="btn btn-block">SELL FRACTION</button>
          </div>
        </div>
      </div>
    </div>
  )
}
