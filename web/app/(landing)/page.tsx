'use client'

import { useConnectModal } from '@rainbow-me/rainbowkit'
// @ts-nocheck
import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'

export default function Home() {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="flex flex-col">
            <Image src="/hero.png" width={1500} height={500} alt="BountyX Banner"></Image>
            <h1 className="text-5xl font-bold">Multiply Your Impact</h1>
            <h2 className="py-6 text-3xl">BountyX is a gateway between winning a bounty and the next step of your project</h2>
            <h2 className="pb-6 text-2xl">Check your eligibility to claim a Bounty Hypercert</h2>
            <div className="py-4 px-4 align-center">
              {openConnectModal && (
                <button className="btn btn-info flex-auto w-64" onClick={openConnectModal}>
                  Connect Wallet
                </button>
              )}
              {isConnected && (
                <Link href="/eligibility" passHref>
                  <button className="btn btn-info flex-auto w-64">Check Eligibility</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
