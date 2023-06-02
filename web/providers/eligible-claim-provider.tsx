import { EligibleGroupedClaim } from '@/lib/hyperdrop/hyperdrop-eligibilty'
import { createContext, useState } from 'react'

export type EligibleClaimType = {
  claim: EligibleGroupedClaim | undefined
  setClaim: (claim: EligibleGroupedClaim) => void
}

export const EligibleClaimContext = createContext<EligibleClaimType | null>(null)

export const EligibleClaimProvider = ({ children }: any) => {
  const [claim, setClaim] = useState<EligibleGroupedClaim | undefined>(undefined)
  return <EligibleClaimContext.Provider value={{ claim, setClaim }}>{children}</EligibleClaimContext.Provider>
}
