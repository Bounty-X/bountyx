'use client'

// @ts-nocheck
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">The Bounty Was Just The Beginning</h1>
            <p className="py-6">Multiply the Impact of your Project</p>
            <div className="form-control mx-auto">
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="label-text italic px-4">I certify that my project is open-source and has a public license</span>
              </label>
            </div>
            <div className="py-4 px-4 align-center">
              <Link href="/minthypercert" passHref>
                <button className="btn btn-primary flex-auto w-64">I won a bounty!</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
