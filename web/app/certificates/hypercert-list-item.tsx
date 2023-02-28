import { HyperCert } from '@/types'

const contributors = (contrib) => {
  const list = []
  contrib.forEach((item) => {
    list.push(<div className="badge badge-outline">{item}</div>)
  })
  return list
}

export const HyperCertListItem = ({ hyperCertInfo }: { hyperCertInfo: HyperCert }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={hyperCertInfo.general.renderedImage} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{hyperCertInfo.general.name}</h2>
        <p>Work</p>
        <div className="badge badge-secondary">{hyperCertInfo.work.scope}</div>
        <p>{hyperCertInfo.general.description}</p>
        <div className="card-actions justify-end">{contributors(hyperCertInfo.work.contributors)}</div>
      </div>
    </div>
  )
}
