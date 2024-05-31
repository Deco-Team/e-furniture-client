/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { createTextToImage, createTextToModelTask, getTextToModelTask } from '@actions/ai/ai.action'
import ARModal from '@components/product/ARModal'
import { Button, ButtonGroup, Image, Textarea, useDisclosure } from '@nextui-org/react'
import { notifyLoading, notifySuccess } from '@utils/toastify'
import React, { useEffect, useState } from 'react'
import { MdViewInAr } from 'react-icons/md'

const TextToImageForm = () => {
  const [btn2D, setBtn2D] = useState<
    'danger' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | undefined
  >('primary')
  const [btn3D, setBtn3D] = useState<
    'danger' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | undefined
  >('default')
  const [apiState, setApiState] = useState<'2D' | '3D'>('2D')
  const [input, setInput] = useState('')
  const [saveInput, setSaveInput] = useState('')
  const [output, setOutput] = useState<any>()
  const [isLoading, setisLoading] = useState(false)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const getRender = async () => {
    notifyLoading()
    setisLoading(true)
    setSaveInput(input)
    if (apiState === '2D') {
      const response = await createTextToImage({ text: input })
      setOutput(response?.data.imageUrl)
      notifySuccess('Đã tạo ảnh thành công')
      setisLoading(false)
    } else {
      const response = await createTextToModelTask({ prompt: input })
      if (response?.task_id) {
        const result = await getTextToModelTask(response?.task_id)
        const intervalId = setInterval(async () => {
          const result = await getTextToModelTask(response?.task_id)
          if (result?.progress === 100) {
            setOutput(result)
            notifySuccess('Đã tạo ảnh thành công')
            setisLoading(false)
            setInput('')
            clearInterval(intervalId)
          }
        }, 3000)
      }
    }
  }

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <form>
      {/* Start Dimension Options */}
      <div className='flex items-center justify-between mb-5'>
        <p>Không gian</p>
        <ButtonGroup isDisabled={isLoading}>
          <Button
            color={btn2D}
            onPress={() => {
              setBtn2D('primary')
              setBtn3D('default')
              setApiState('2D')
            }}
          >
            2D
          </Button>
          <Button
            color={btn3D}
            onPress={() => {
              setBtn2D('default')
              setBtn3D('primary')
              setApiState('3D')
            }}
          >
            3D
          </Button>
        </ButtonGroup>
      </div>
      {/* End Dimension Options */}
      {/* Start Prompt Input */}
      <div className='mb-5'>
        <Textarea
          value={input}
          onValueChange={setInput}
          label='Mô tả'
          placeholder='Nhập mô tả đồ nội thất bạn mong muốn'
          variant='bordered'
          isRequired
        />
      </div>
      {/* End Prompt Input */}

      <Button
        className='w-full bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed'
        size='lg'
        onClick={getRender}
        isDisabled={!input || isLoading}
      >
        Tạo
      </Button>
      {output && (
        <>
          {apiState === '2D' && (
            <>
              <Image className='mt-5' src={output} />
              <p className='mt-5 text-center'>{saveInput}</p>
            </>
          )}
        </>
      )}
      {output && (
        <>
          {apiState === '3D' && (
            <>
              <Image
                isBlurred
                removeWrapper
                shadow='sm'
                width='100%'
                alt={output.input.prompt}
                className='w-full object-cover aspect-square col-span-2 mb-2 mt-5'
                src={output.output.rendered_image}
                // src='https://source.unsplash.com/random'
              />
              <Button
                startContent={<MdViewInAr className='text-2xl' />}
                className=' text-black h-10 w-36 text-lg max-sm:hidden'
                onClick={onOpen}
              >
                Xem 3D
              </Button>
              <ARModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                src={output.output.model}
                productName={output.input.prompt}
              />
            </>
          )}
        </>
      )}
    </form>
  )
}

export default TextToImageForm
