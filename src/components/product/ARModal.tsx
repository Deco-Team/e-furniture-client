'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  UseDisclosureProps
} from '@nextui-org/react'
import '@google/model-viewer'
import { PiCube } from 'react-icons/pi'

interface ARModalProps {
  isOpen: boolean
  onOpenChange: UseDisclosureProps & ((isOpen: boolean) => void)
  src: string
  arPlacement?: 'floor' | 'wall'
  productName?: string
  categoryName?: string
  dimensions?: string
  price?: string
}

const ARModal = (props: ARModalProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      placement='center'
      classNames={{
        base: 'max-w-full !my-0 max-sm:!m-0',
        wrapper: '!translate-y-0',
        body: '!px-2',
        closeButton: 'z-[99] scale-150 right-5 top-5'
      }}
    >
      <ModalContent>
        <ModalBody>
          <div className='w-full h-[90vh]'>
            <model-viewer
              id='model-viewer'
              src={props.src}
              ios-src=''
              ar-scale='fixed'
              ar-placement={props.arPlacement || 'floor'}
              autoplay
              ar-modes='webxr scene-viewer'
              poster=''
              alt='A 3D model of product'
              shadow-intensity='1'
              camera-controls
              disable-tap
              auto-rotate
              ar
            >
              <Popover placement='top'>
                <PopoverTrigger>
                  <Button
                    radius='full'
                    className='font-semibold text-base h-12 w-12 bg-gray-200 absolute z-[99] bottom-2 right-1/2 translate-x-1/2'
                    slot='ar-button'
                    startContent={<PiCube className='text-2xl' />}
                    isIconOnly
                  ></Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className='px-1 py-2'>
                    <div className='text-tiny'>Chế độ AR</div>
                  </div>
                </PopoverContent>
              </Popover>
            </model-viewer>
            <div className='absolute p-2 sm:p-4 rounded-large top-4 left-4 sm:top-6 sm:left-6 pointer-events-none backdrop-blur-3xl bg-white/30'>
              <h2 className='font-bold uppercase mb-1'>{props.productName}</h2>
              <h3 className='font-normal mb-1'>
                {props.categoryName}, <span className='whitespace-nowrap'>{props.dimensions}</span>
              </h3>
              <h1 className='text-xl font-extrabold'>{props.price}</h1>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ARModal
