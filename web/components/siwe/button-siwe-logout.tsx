'use client'

import * as React from 'react'

import classNames from 'clsx'
import { useRouter } from 'next/navigation'

import { siweLogout } from '@/lib/actions/siwe/siweLogout'

interface ButtonSIWELogoutProps {
  className?: string
  label?: string
  children?: React.ReactNode
}

export const ButtonSIWELogout = ({ className, label = 'Logout', children }: ButtonSIWELogoutProps) => {
  const handleLogout = async () => {
    await siweLogout()
  }

  const classes = classNames('ButtonSIWELogout', className)
  return (
    <button onClick={handleLogout} className={classes}>
      {children || label}
    </button>
  )
}

export default ButtonSIWELogout
