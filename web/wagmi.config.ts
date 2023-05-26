import { defineConfig } from '@wagmi/cli'
import { foundry, react, actions } from '@wagmi/cli/plugins'
import * as chains from '@wagmi/chains'

const HYPERCERT_LOCAL_DEPLOYMENT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const HYPERCERT_DEPLOYMENT_ADDRESS = '0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07'

const HYPERDROP_LOCAL_DEPLOYMENT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

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
          [chains.foundry.id]: HYPERCERT_LOCAL_DEPLOYMENT_ADDRESS,
        },
        BountyXHyperDrop: {
          [chains.foundry.id]: HYPERDROP_LOCAL_DEPLOYMENT_ADDRESS,
        },
      },
    }),
    react({
      useContract: true,
    }),
    actions(),
  ],
})
