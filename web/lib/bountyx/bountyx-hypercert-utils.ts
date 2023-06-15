import { BigNumber } from 'ethers'
import { AddressOrEns, formatContributors, formatScopeList } from '@/lib/hypercert/formatting'
import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { HypercertMetadata, HypercertClaimdata } from '@hypercerts-org/hypercerts-sdk'

export interface FractionOwnership {
  owner: AddressOrEns
  fraction: BigNumber
}

export interface LocalCertData {
  name: string
  description: string
  external_url: string
  contributors: AddressOrEns[]
  additional_owners: AddressOrEns[]
}

export interface BountyHypercertMintParams {
  metadata: HypercertMetadata & BountyxMetadataCollection
  distribution: FractionOwnership[]
  units: number
}

export const prepareBountyHypercertMintParams = (
  minter: `0x${string}`,
  bounties: BountyxMetadata[],
  localCertData: LocalCertData,
  futureRewardsPercent: number,
  base64Image?: string
): BountyHypercertMintParams => {
  let units = 0
  const workScopeList: string[] = []
  const owners: AddressOrEns[] = []

  bounties.forEach((bounty) => {
    units += bounty.reward.rewardAmount
    if (!workScopeList.includes(bounty.issuer?.issuerName!)) {
      workScopeList.push(bounty.issuer?.issuerName!)
    }
    if (bounty.issuer?.issuerAddress) {
      owners.push(bounty.issuer.issuerAddress as `0x${string}`)
    }
  })

  const workScopeStr = formatScopeList(workScopeList)
  const contributorsList = localCertData.contributors
  const additionalOwnersList = localCertData.additional_owners
  const contributorsStr = formatContributors(contributorsList)

  const futureRewardsFraction = (units * futureRewardsPercent) / 100
  const ownersDistributionUnits = units - futureRewardsFraction
  let distribution: FractionOwnership[] = []

  owners.push(...contributorsList, ...additionalOwnersList)
  if (owners.length > 0) {
    let futureRewardAdded = false
    const fraction = ownersDistributionUnits / owners.length
    distribution.push(
      ...owners.map((owner) => {
        const fractionRounded = Math.round(fraction)
        if (owner === minter) {
          futureRewardAdded = true
          return { owner, fraction: BigNumber.from(fractionRounded + futureRewardsFraction) }
        }
        return { owner, fraction: BigNumber.from(fractionRounded) }
      })
    )
    if (!futureRewardAdded) {
      distribution.push({ owner: minter, fraction: BigNumber.from(futureRewardsFraction) })
    }
  } else {
    distribution = [{ owner: minter!, fraction: BigNumber.from(units) }]
  }

  const hypercert: HypercertClaimdata = {
    work_scope: { name: 'Work', value: workScopeList, display_value: workScopeStr },
    work_timeframe: { name: 'Work Period', value: [0], display_value: '' },
    impact_scope: { name: 'Impact', value: ['all'], display_value: 'all' },
    impact_timeframe: { name: 'Impact Period', value: [0], display_value: '' },
    contributors: { name: 'Contributors', value: contributorsList, display_value: contributorsStr },
  }

  const metadata: HypercertMetadata & BountyxMetadataCollection = {
    name: localCertData.name,
    description: localCertData.description,
    external_url: localCertData.external_url,
    image: base64Image ?? '',
    version: '0.0.1',
    properties: [
      {
        trait_type: 'Group',
        value: bounties && bounties.length > 0 ? bounties[0].group : '',
      },
    ],
    hypercert: hypercert,
    bounties,
  }

  return { metadata, distribution, units }
}
