import { defineConfig } from '@wagmi/cli'
import { foundry, react, actions } from '@wagmi/cli/plugins'
import * as chains from '@wagmi/chains'

const HYPERCERT_DEPLOYMENT_ADDRESS = '0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07'

/**
 * Wagmi cli will automatically generate react hooks from your forge contracts
 * @see https://wagmi.sh/cli/getting-started
 * Generates react hooks from your forge contracts
 * @see https://wagmi.sh/cli/plugins/foundry
 * Or from hardhat
 * @see https://wagmi.sh/cli/plugins/hardhat
 * Or from an arbitrary fetch request
 * @see https://wagmi.sh/cli/plugins/fetch
 */
/** @type {import('@wagmi/cli').Config} */
export default defineConfig({
  out: 'lib/blockchain.ts',
  contracts: [],
  plugins: [
    foundry({
      project: '../contracts',
      deployments: {
        HypercertMinter: {
          [chains.optimism.id]: HYPERCERT_DEPLOYMENT_ADDRESS,
          [chains.goerli.id]: HYPERCERT_DEPLOYMENT_ADDRESS,
        },
      },
    }),
    react({
      useContract: true,
    }),
    actions(),
  ],
})
