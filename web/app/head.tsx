import { siteConfig } from '@/config/site'

export default function Head() {
  const url = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const ogUrl = new URL(`${url}/og.jpg`)

  return (
    <>
      <title>{`${siteConfig.name} - ${siteConfig.description}`}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={siteConfig.description} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteConfig.name} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:url" content={url?.toString()} />
      <meta property="og:image" content={ogUrl.toString()} />
    </>
  )
}
