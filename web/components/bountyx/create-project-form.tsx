'use client'
import Link from 'next/link'
import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata.js'
import useLocalStorage from '@/hooks/utils/use-local-storage'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { HypercertMetadata } from '@/bountyxlib/types/metadata'
import { BountyxMetadataCollection } from '@/bountyxlib/types/bountyxcollection'
import { storeBountyxMetadata } from '@/bountyxlib/bountyx-storage'

export interface CreateProjectFormProps {
  bounties: BountyxMetadata[]
}

export const CreateProjectForm = ({ bounties }: CreateProjectFormProps) => {
  const [projectMetadata, setProjectData] = useLocalStorage<ProjectMetadata>('projectMetadata', {
    name: '',
    description: '',
    external_url: '',
    contributors: '',
  })

  const handleChange = async (field: string, value: string) => {
    let newProjectMetadata = projectMetadata
    newProjectMetadata[field] = value
    setProjectData(newProjectMetadata)
  }

  const uploadMetadata = async () => {
    const metadata: HypercertMetadata & BountyxMetadataCollection = {
      name: projectMetadata.name,
      description: projectMetadata.description,
      external_url: projectMetadata.external_url,
      image: 'https://d2y4rc9q318ytb.cloudfront.net/accounts/b6ded887-20df-42de-bc10-d22584e2ef9f/350x350/1671505783384-23b46dce.png',
      version: '0.0.1',
      properties: [],
      hypercert: {},
      bounties,
    }

    const cidStr = await storeBountyxMetadata(metadata)
  }

  return (
    <div className="container mx-auto px-4">
      <form>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Project Name:</span>
          </label>
          <input
            type="text"
            id="projectname"
            placeholder="Type here"
            defaultValue={projectMetadata.name}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <div className="form-control w-full max-w-xs py-4">
            <label className="label">
              <span className="label-text">Project URL:</span>
            </label>
            <input
              type="text"
              id="projectname"
              placeholder="Type here"
              defaultValue={projectMetadata.external_url}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange('external_url', e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs py-4">
            <label className="label">
              <span className="label-text">Project Description:</span>
            </label>
            <input
              type="text"
              id="projectdescription"
              placeholder="Type here"
              defaultValue={projectMetadata.description}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs py-4">
            <label className="label">
              <span className="label-text">Project Contributors:</span>
            </label>
            <input
              type="text"
              id="projectcontributors"
              placeholder="Type here"
              defaultValue={projectMetadata.contributors}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange('contributors', e.target.value)}
            />
          </div>
          <Link href="/certificates" passHref>
            <button type="submit" className="btn py-4" onClick={() => uploadMetadata()}>
              Continue
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}
