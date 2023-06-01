import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { createContext, useState } from 'react'

export type BountiesContextType = {
  bounties: BountyxMetadata[]
  setBounties: (bounties: BountyxMetadata[]) => void
}

export const BountiesContext = createContext<BountiesContextType | null>(null)

export const BountiesProvider = ({ children }: any) => {
  const [bounties, setBounties] = useState<BountyxMetadata[]>([])
  return <BountiesContext.Provider value={{ bounties, setBounties }}>{children}</BountiesContext.Provider>
}
