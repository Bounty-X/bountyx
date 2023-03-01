export type HyperCert = {
  general: {
    name: string
    description: string
    logoImage: string
    bgImage: string
    renderedImage: string
    link: string
  }
  work: {
    scope: string
    start: Date
    end: Date
    contributors: {
      name: string
      relationship: string
      avatar: string
      percentage: number
    }[]
  }
  advanced: {
    impactScope: string
    impactStart: Date
    impactEnd: Date | undefined
    usageRights: string
  }
  distribution: {
    allowList: string
  }
}
