import { c } from '@wagmi/cli/dist/config-c09a23a5'
import { add, set } from 'lodash'
import React, { useEffect, useState } from 'react'
import TagsInput, { RenderTagProps } from 'react-tagsinput'

interface TagInputProps {
  addresses: string[]
  onAddressesChange: (addresses: string[]) => void
}

interface TagColorMap {
  [tag: string]: string // Map tag to color
}

function randomColor300() {
  const colors = [
    'bg-slate-300',
    'bg-gray-300',
    'bg-red-300',
    'bg-orange-300',
    'bg-yellow-300',
    'bg-green-300',
    'bg-teal-300',
    'bg-blue-300',
    'bg-indigo-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-lime-300',
    'bg-emerald-300',
    'bg-cyan-300',
    'bg-lightBlue-300',
    'bg-violet-300',
    'bg-fuchsia-300',
    'bg-rose-300',
    'bg-amber-300',
    'bg-sky-300',
  ]
  const randomColorClass = colors[Math.floor(Math.random() * colors.length)]
  return randomColorClass
}

const AddressTagInput: React.FC<TagInputProps> = ({ addresses, onAddressesChange }) => {
  const [tags, setTags] = useState<string[]>([])
  const [tagColorMap, setTagColorMap] = useState<TagColorMap>({})

  useEffect(() => {
    setTags(addresses) // addresses don't initialize tags, so we need to do it here
    addresses.forEach((addr) => {
      if (!tagColorMap[addr]) {
        // Set a default color for the existing tag
        setTagColorMap((prevMap) => ({ ...prevMap, [addr]: randomColor300() }))
      }
    })
  }, [addresses])

  const handleChange = (tags: string[], changed: string[], changedIndexes: number[]) => {
    setTags(tags)
    onAddressesChange(tags)

    changed.forEach((tag) => {
      if (!tagColorMap[tag]) {
        // Set a default color for the newly added tag
        setTagColorMap((prevMap) => ({ ...prevMap, [tag]: randomColor300() }))
      }
    })
  }

  const renderTag = (props: RenderTagProps) => {
    const { tag, key, disabled, onRemove } = props
    const tagClassName = disabled ? 'tag-disabled' : 'tag'
    const tagColor = tagColorMap[tag]

    return (
      <span key={key} className={`inline-block ${tagColor} bg-sl text-gray-700 px-2 py-1 mr-2 mb-2 border border-gray-400 rounded ${tagClassName}`}>
        {tag}
        {!disabled && (
          <span className="tag-remove ml-1 cursor-pointer" onClick={() => onRemove(key)}>
            &times;
          </span>
        )}
      </span>
    )
  }

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Project Contributors</span>
        <span className="label-text-alt">Required</span>
      </label>
      <TagsInput
        value={tags}
        onChange={handleChange}
        renderTag={renderTag}
        inputProps={{
          placeholder: 'Add Eth address or ENS name and press enter',
          className: 'input input-bordered w-full max-w-xs',
        }}
      />
    </div>
  )
}

export default AddressTagInput
