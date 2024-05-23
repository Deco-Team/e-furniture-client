import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Textarea } from '@nextui-org/react'
import React from 'react'

const TextToImageForm = () => {
  const animals = [
    { label: 'Cat', value: 'cat', description: 'The second most popular pet in the world' },
    { label: 'Dog', value: 'dog', description: 'The most popular pet in the world' },
    { label: 'Elephant', value: 'elephant', description: 'The largest land animal' },
    { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
    { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
    { label: 'Giraffe', value: 'giraffe', description: 'The tallest land animal' },
    {
      label: 'Dolphin',
      value: 'dolphin',
      description: 'A widely distributed and diverse group of aquatic mammals'
    },
    { label: 'Penguin', value: 'penguin', description: 'A group of aquatic flightless birds' },
    { label: 'Zebra', value: 'zebra', description: 'A several species of African equids' },
    {
      label: 'Shark',
      value: 'shark',
      description: 'A group of elasmobranch fish characterized by a cartilaginous skeleton'
    },
    {
      label: 'Whale',
      value: 'whale',
      description: 'Diverse group of fully aquatic placental marine mammals'
    },
    { label: 'Otter', value: 'otter', description: 'A carnivorous mammal in the subfamily Lutrinae' },
    { label: 'Crocodile', value: 'crocodile', description: 'A large semiaquatic reptile' }
  ]

  return (
    <form>
      {/* Start Dimension Options */}
      <div className='flex items-center justify-between mb-5'>
        <p>Không gian</p>
        <ButtonGroup>
          <Button>2D</Button>
          <Button>3D</Button>
        </ButtonGroup>
      </div>
      {/* End Dimension Options */}
      <Autocomplete label='Select an animal' className='max-w-xs'>
        {animals.map((animal) => (
          <AutocompleteItem key={animal.value} value={animal.value}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      {/* Start Prompt Input */}
      <div className='mb-5'>
        <Textarea label='Mô tả' placeholder='Nhập mô tả đồ nội thất bạn mong muốn' variant='bordered' isRequired />
      </div>
      {/* End Prompt Input */}

      <Button
        className='w-full bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed'
        size='lg'
      >
        Tạo
      </Button>
    </form>
  )
}

export default TextToImageForm
