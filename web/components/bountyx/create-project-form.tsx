'use client'
import Link from 'next/link'
import { ProjectMetadata } from '@/bountyxlib/types/projectmetadata.js'
import useLocalStorage from '@/hooks/utils/use-local-storage'
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

export interface CreateProjectFormProps {
  bounties: BountyxMetadata[]
}

export const CreateProjectForm = ({ bounties }: CreateProjectFormProps) => {
  let defaultProjectMetatadata: ProjectMetadata = {
    name: '',
    description: '',
    contributors: '',
  }

  const [projectMetadata, setProjectData] = useLocalStorage('projectMetadata', defaultProjectMetatadata)

  const handleChange = async (field: string, value: string) => {
    let newProjectMetadata = projectMetadata
    newProjectMetadata[field] = value
    setProjectData(newProjectMetadata)
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
          <button type="submit" className="btn py-4">
            Continue
          </button>
        </Link>
      </form>
    </div>
  )
}
