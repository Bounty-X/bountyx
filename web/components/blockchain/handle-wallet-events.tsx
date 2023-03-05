import * as React from 'react'

import { useAccount } from 'wagmi'

import { siweLogout } from '@/lib/actions/siwe/siweLogout'
interface HandleWalletEventsProps {
  className?: string
  children: React.ReactNode
}

export const HandleWalletEvents = ({ className, children }: HandleWalletEventsProps) => {
  useAccount({
    async onDisconnect() {
      await siweLogout()
    },
  })
  return <>{children}</>
}

export default HandleWalletEvents
