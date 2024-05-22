import { Button, ButtonGroup, Textarea } from '@nextui-org/react'
import React from 'react'

const TextToImageForm = () => {
  return (
    <form>
      {/* Start Dimension Options */}
      {/* <div className='flex items-center justify-between mb-5'>
        <p>Dimension</p>
        <ButtonGroup>
          <Button>2D</Button>
          <Button>3D</Button>
        </ButtonGroup>
      </div> */}
      {/* End Dimension Options */}

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
