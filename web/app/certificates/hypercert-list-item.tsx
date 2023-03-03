import { HypercertMetadata } from '@/bountyxlib/types/metadata'

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
                <img src={item.avatar} />
              </div>
            </div>
            <div>
              <div className="font-bold">{item}</div>
              <span className="badge badge-ghost badge-sm">{item.relationship == 'sponsor' ? 'Sponsor' : 'Core Contributor'}</span>
            </div>
          </div>
        </td>
        <td>
          <div className="text-xl font-bold">{item.percentage} %</div>
        </td>
      </tr>
    )
  })
  return list
}

export const HyperCertListItem = ({ hyperCertMetadata }: { hyperCertMetadata: HypercertMetadata }) => {
  console.log(hyperCertMetadata)

  if (!hyperCertMetadata) {
    return null
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={hyperCertMetadata.image} />
      </figure>
      <div className="card-body">
        <div className="flex w-full h-full">
          <div className="grid flex-grow card bg-base-300 rounded-box">
            <div>
              <div className="text-xl font-bold">OWNERSHIP</div>
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <tbody>{contributors(hyperCertMetadata.hypercert.contributors)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-2"></div>
          <div className="grid flex-grow card bg-base-300 rounded-box">
            <div className="flex w-full">
              <div className="grid h-20 flex-grow">
                <div>
                  <div className="text-xl font-bold">BOUNTY</div>
                  <div className="text-2xl font-italic font-bold mt-8 mb-2">$5000.00 USDC</div>
                  <a className="link">View Transaction</a>
                </div>
              </div>
              <div className="divider divider-horizontal" />
              <div className="grid h-20 flex-grow">
                <div>
                  <div className="text-xl font-bold">NFT</div>
                  <div className="text-xl font-italic font-bold mt-8 mb-2">Token ID - {hyperCertMetadata.tokenId}</div>
                  <a
                    className="link"
                    href={'https://testnets.opensea.io/assets/goerli/' + hyperCertMetadata.collection + '/' + hyperCertMetadata.tokenId}>
                    View On OpenSea
                  </a>
                </div>
              </div>
            </div>
            <div className="divider" />
            <button className="btn btn-block">ACCESS TEAM CHAT</button>
          </div>
        </div>
      </div>
    </div>
  )
}
