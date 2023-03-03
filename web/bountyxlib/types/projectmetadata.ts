export interface ProjectMetadata {
  /**
   * Identifies the asset to which this token represents
   */
  name: string
  /**
   * Describes the asset to which this token represents
   */
  description: string
  /**
   * An url pointing to the external website of the project
   */
  external_url: string
  /**
   * Contributors who were working on the project
   */
  contributors: string

  [key: string]: string // IFoo is indexable; not a new property
}
