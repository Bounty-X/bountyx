import { HyperCert } from '@/types'

const contributors = (contrib) => {
  const list = []
  contrib.forEach((item) => {
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
          <div className="radial-progress" style={{ '--value': item.percentage, '--size': '4rem' }}>
            {item.percentage} %
          </div>
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
        {/* <h2 className="card-title">{hyperCertInfo.general.name}</h2>
        <p>Work</p>
        <div className="badge badge-secondary">{hyperCertInfo.work.scope}</div>
        <p>{hyperCertInfo.general.description}</p>
        <div className="card-actions justify-end">{contributors(hyperCertInfo.work.contributors)}</div> */}

        {/* <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xl font-bold">OWNERSHIP</div>
          </div>
          <div>
            <div className="text-xl font-bold">BOUNTY</div>
          </div>
        </div> */}
        <div className="flex w-full h-full">
          <div className="grid flex-grow card bg-base-300 rounded-box">
            <div>
              <div className="text-xl font-bold">OWNERSHIP</div>
              {/* <table className=" table table-auto">
                <tbody>{contributors(hyperCertInfo.work.contributors)}</tbody>
              </table> */}
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
