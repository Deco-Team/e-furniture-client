/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { createTextToImage, createTextToModelTask, getTextToModelTask } from '@actions/ai/ai.action'
import { getCustomer } from '@actions/customers/customer.actions'
import ARModal from '@components/product/ARModal'
import { Button, ButtonGroup, Image, Textarea, useDisclosure } from '@nextui-org/react'
import { useCredit } from '@src/hooks/useCredits'
import { notifySuccess } from '@utils/toastify'
import React, { useEffect, useState } from 'react'
import { MdViewInAr } from 'react-icons/md'
import NextLink from 'next/link'

const TextToImageForm = () => {
  const [btn2D, setBtn2D] = useState<'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'>('solid')
  const [btn3D, setBtn3D] = useState<'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'>('light')
  const [apiState, setApiState] = useState<'2D' | '3D'>('2D')
  const [input, setInput] = useState('')
  const [saveInput, setSaveInput] = useState('')
  const [output, setOutput] = useState<any>()
  const [isLoading, setisLoading] = useState(false)
  const [errorInput, setErrorInput] = useState(false)
  const { credit, setCredit } = useCredit()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const getRender = async () => {
    if (input.length <= 10) {
      setErrorInput(true)
    } else {
      setisLoading(true)
      setSaveInput(input)
      if (apiState === '2D') {
        const response = await createTextToImage({ text: input })
        setOutput(response?.data.imageUrl)
        notifySuccess('Đã tạo ảnh thành công')
        setisLoading(false)
        getCredits()
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
              getCredits()
            }
          }, 3000)
        }
      }
    }
  }

  const getCredits = async () => {
    const customer = await getCustomer()
    setCredit(customer?.credits || 0)
  }

  useEffect(() => {
    getCredits()
    return () => {}
  }, [])

  return (
    <form>
      {/* Start Dimension Options */}
      <div className='flex items-center justify-between mb-2'>
        <p>Không gian</p>
        <ButtonGroup size='sm' isDisabled={isLoading} className='border-1.5 border-black rounded-lg'>
          <Button
            radius='sm'
            variant={btn2D}
            onPress={() => {
              setBtn2D('solid')
              setBtn3D('light')
              setApiState('2D')
              setOutput(undefined)
            }}
            className={`font-semibold min-w-14 ${apiState === '2D' && 'bg-[var(--primary-orange-text-color)] text-white'}`}
          >
            2D
          </Button>
          <Button
            radius='sm'
            variant={btn3D}
            onPress={() => {
              setBtn2D('light')
              setBtn3D('solid')
              setApiState('3D')
              setOutput(undefined)
            }}
            className={`font-semibold min-w-14 ${apiState === '3D' && 'bg-[var(--primary-orange-text-color)] text-white'}`}
          >
            3D
          </Button>
        </ButtonGroup>
      </div>
      <p className='text-end mb-2 mr-1'>
        <span className='text-red-600'>*</span> {apiState === '2D' ? '10 credits' : '15 credits'}
      </p>

      {/* End Dimension Options */}
      {/* Start Prompt Input */}
      <div className='mb-5'>
        <Textarea
          minRows={5}
          value={input}
          onValueChange={(value: string) => {
            setErrorInput(false)
            if (value.length <= 100) {
              setInput(value)
            }
          }}
          label='Mô tả'
          placeholder='Nhập mô tả đồ nội thất bạn mong muốn'
          variant='bordered'
          isRequired
          description={input.length + '/100'}
          errorMessage={errorInput && 'Vui lòng nhập nhiều hơn 10 ký tự'}
        />
      </div>
      {/* End Prompt Input */}
      <Button
        className='w-full bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed'
        size='lg'
        onClick={getRender}
        isDisabled={!input || isLoading || (apiState === '2D' ? credit < 10 : credit < 15)}
        isLoading={isLoading}
      >
        Tạo
      </Button>
      {credit < 10 && (
        <Button
          as={NextLink}
          className='w-full bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed mt-5'
          size='lg'
          href='/pricing'
        >
          Mua thêm credit
        </Button>
      )}
      {output && (
        <>
          {apiState === '2D' && (
            <>
              <Image removeWrapper className='mt-5 mx-auto w-full aspect-square' src={output} />
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
              <div className='w-full flex justify-center'>
                <Button
                  startContent={<MdViewInAr className='text-2xl' />}
                  className='text-black h-10 w-36 text-lg'
                  onClick={onOpen}
                >
                  Xem 3D
                </Button>
              </div>
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
