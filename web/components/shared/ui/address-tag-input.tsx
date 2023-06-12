import React, { useEffect, useState } from 'react'
import TagsInput, { RenderTagProps } from 'react-tagsinput'
import { schemePastel1, schemePastel2 } from 'd3-scale-chromatic'

interface TagInputProps {
  label: string
  secondLabel?: string
  addresses: string[]
  onAddressesChange: (addresses: string[]) => void
  onTagColorChange: (tag: string, color: string) => void
}

export interface TagColorMap {
  [tag: string]: string // Map tag to color
}

function getRandomColor() {
  const colors = [...schemePastel1, ...schemePastel2]
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const AddressTagInput: React.FC<TagInputProps> = ({ label, secondLabel, addresses, onAddressesChange, onTagColorChange }) => {
  const [tags, setTags] = useState<string[]>([])
  const [tagColorMap, setTagColorMap] = useState<TagColorMap>({})

  function updateTagColorMap(tag: string) {
    if (!tagColorMap[tag]) {
      const tagColor = getRandomColor()
      // Set a default color for the newly added tag
      setTagColorMap((prevMap) => ({ ...prevMap, [tag]: tagColor }))
      onTagColorChange(tag, tagColor)
    }
  }

  useEffect(() => {
    setTags(addresses) // addresses don't initialize tags, so we need to do it here
    addresses.forEach((addr) => {
      updateTagColorMap(addr)
    })
  }, [addresses])

  const handleChange = (tags: string[], changed: string[], changedIndexes: number[]) => {
    setTags(tags)
    onAddressesChange(tags)

    changed.forEach((tag) => {
      updateTagColorMap(tag)
    })
  }

  const renderTag = (props: RenderTagProps) => {
    const { tag, key, disabled, onRemove } = props
    const tagClassName = disabled ? 'tag-disabled' : 'tag'
    const tagColor = tagColorMap[tag]

    return (
      <span
        key={key}
        style={{ backgroundColor: tagColor }} // Set the background color inline
        className={`inline-block text-gray-700 px-2 py-1 mr-2 mb-2 border border-gray-400 rounded ${tagClassName}`}>
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
        <span className="label-text">{label}</span>
        {secondLabel && <span className="label-text-alt">{secondLabel}</span>}
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
