import { HyperCert } from '@/types'

const contributors = (contrib: any) => {
  const list: any = []
  contrib.forEach((item: any) => {
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
              <div className="font-bold">{item.name}</div>
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

export const HyperCertListItem = ({ hyperCertInfo }: { hyperCertInfo: HyperCert }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={hyperCertInfo.general.renderedImage} />
      </figure>
      <div className="card-body">
        <div className="flex w-full h-full">
          <div className="grid flex-grow card bg-base-300 rounded-box">
            <div>
              <div className="text-xl font-bold">OWNERSHIP</div>
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <tbody>{contributors(hyperCertInfo.work.contributors)}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-2"></div>
          <div className="grid flex-grow card bg-base-300 rounded-box">
            <div className="text-xl font-bold">BOUNTY</div>
          </div>
        </div>
      </div>
    </div>
  )
}
