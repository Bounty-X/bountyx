import AddressTagInput from '@/components/shared/ui/address-tag-input'
import RangeSliderNumber from '@/components/shared/ui/range-slider-number'
import React, { ChangeEvent, FormEvent } from 'react'

interface ProjectInformationFormProps {
  localCertData: LocalCertData
  handleDataChange: (field: string, value: string | string[]) => void
  setFutureRewardsPercent: (value: number) => void
  handleTagColorChange: (tag: string, color: string) => void
  mintHypercert: () => void
  hypercertMinted: boolean
}

interface LocalCertData {
  name: string
  description: string
  external_url: string
  contributors: string[]
  additional_owners: string[]
}

const ProjectInformationForm: React.FC<ProjectInformationFormProps> = ({
  localCertData,
  handleDataChange,
  setFutureRewardsPercent,
  handleTagColorChange,
  mintHypercert,
  hypercertMinted,
}) => {
  return (
    <form
      className="mt-4 ml-4 align-middle"
      onSubmit={(e: FormEvent) => {
        e.preventDefault()
        if (!hypercertMinted) {
          mintHypercert()
        }
      }}>
      <h1 className="font-bold">Project Information</h1>
      <div className="form-control w-full max-w-xs py-4">
        <label className="label">
          <span className="label-text">What is your project name?</span>
          <span className="label-text-alt">Required</span>
        </label>
        <input
          type="text"
          id="projectname"
          placeholder="Type your project name here..."
          defaultValue={localCertData.name}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => handleDataChange('name', e.target.value)}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">What is your Project URL?</span>
            <span className="label-text-alt">Required</span>
          </label>
          <input
            type="text"
            id="projectname"
            placeholder="Give us a project/informational url... "
            defaultValue={localCertData.external_url}
            className="input-bordered input w-full max-w-xs"
            onChange={(e) => handleDataChange('external_url', e.target.value)}
          />
        </div>
        <AddressTagInput
          label="Project Contributors"
          secondLabel="Required"
          addresses={localCertData.contributors}
          onAddressesChange={(newAddresses: string[]) => handleDataChange('contributors', newAddresses)}
          onTagColorChange={handleTagColorChange}
        />
        <AddressTagInput
          label="Additional Owners"
          secondLabel="Optional"
          addresses={localCertData.additional_owners}
          onAddressesChange={(newAddresses: string[]) => handleDataChange('additional_owners', newAddresses)}
          onTagColorChange={handleTagColorChange}
        />
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Description</span>
            <span className="label-text-alt">Required</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full max-w-xs"
            id="projectdescription"
            placeholder="Describe your project..."
            defaultValue={localCertData.description}
            onChange={(e) => handleDataChange('description', e.target.value)}></textarea>
        </div>
        <RangeSliderNumber updateValue={setFutureRewardsPercent} defaultValue={30} maxValue={70} />
        <button type="submit" className="btn mt-[57px] py-4" disabled={hypercertMinted}>
          Mint Hypercert
        </button>
      </div>
    </form>
  )
}

export default ProjectInformationForm
