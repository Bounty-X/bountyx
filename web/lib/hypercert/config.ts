export const requireEnv = (value: string | undefined, identifier: string) => {
  if (!value) {
    throw new Error(`Required env var ${identifier} does not exist`)
  }
  return value
}

// Optimism
export const DEFAULT_CHAIN_ID = 10 //requireEnv(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID, 'NEXT_PUBLIC_DEFAULT_CHAIN_ID')

// Optimism
export const CONTRACT_ADDRESS = '0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07' //requireEnv(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, 'NEXT_PUBLIC_CONTRACT_ADDRESS') as `0x${string}`

export const GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/hypercerts-admin/hypercerts-testnet' //requireEnv(process.env.NEXT_PUBLIC_GRAPH_URL, 'NEXT_PUBLIC_GRAPH_URL')

export const NFT_STORAGE_TOKEN = 'wtf' //requireEnv(process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN, 'NEXT_PUBLIC_NFT_STORAGE_TOKEN')

export const WEB3_STORAGE_TOKEN = 'wtf' //requireEnv(process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN, 'NEXT_PUBLIC_WEB3_STORAGE_TOKEN')

export const SUPABASE_URL = 'wtf' //requireEnv(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL')

export const SUPABASE_ANON_KEY = 'wtf' //requireEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, 'NEXT_PUBLIC_SUPABASE_ANON_KEY')

export const SUPABASE_TABLE = 'wtf' //requireEnv(process.env.NEXT_PUBLIC_SUPABASE_TABLE, 'NEXT_PUBLIC_SUPABASE_TABLE')

export const PLASMIC_PROJECT_ID = process.env.PLASMIC_PROJECT_ID ?? 'MISSING'
export const PLASMIC_PROJECT_API_TOKEN = process.env.PLASMIC_PROJECT_API_TOKEN ?? 'MISSING'
