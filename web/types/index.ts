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
    contributors: string[]
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
