import { useEffect, useState } from 'react'

import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { useBountyxSignAllBounties } from '@/hooks/bountyx/use-bountyx-sign-bounty'
import { getAllBounties } from '@/lib/api/buidlboxApi'

import { BountiesList } from './bounties-list'

export const EndorseBountyCard = () => {
  const [bounties, setBounties] = useState<BountyxMetadata[]>([])

  useEffect(() => {
    setBounties(getAllBounties())
  }, [])

  const [isSigned, setIsSigned] = useState<boolean>(false)

  const { data, isError, isLoading, isSuccess, signMessage } = useBountyxSignAllBounties(bounties)

  useEffect(() => {
    console.log('Signature', data)
    if (isSuccess) {
      // setBounty((prev) => ({ ...prev, signature: data }))
      setIsSigned(true)
    }
  }, [data])

  return (
    <div className="flex flex-col">
      <div className="my-10 flex flex-row items-center gap-10">
        <button className="btn-primary btn w-36" disabled={isSigned || isLoading} onClick={() => signMessage()}>
          Endorse
        </button>
        {isSigned && <div className="badge-success badge w-32 py-5">SIGNED</div>}
      </div>
      <BountiesList bounties={bounties} />
    </div>
  )
}
