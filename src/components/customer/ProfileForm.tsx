import { Input } from '@nextui-org/input'
import React, { memo } from 'react'

type ProfileFormProps = {
  customer: {
    email?: string
    phone?: string
    gender?: string
    dateOfBirth?: string
    address?: string[]
  }
}

const ProfileForm = memo(function ProfileForm({ customer }: ProfileFormProps) {
  return (
    <div className='w-[80%] grid lg:grid-cols-2 lg:gap-x-4'>
      <Input
        variant='flat'
        label='Email'
        labelPlacement='outside'
        isDisabled
        classNames={{ base: ['!mt-[50px]'], inputWrapper: ['h-[60px]'], label: ['!top-[30%]'] }}
        placeholder='Email'
        value={customer.email}
      />
      <Input
        variant='flat'
        label='Điện thoại'
        labelPlacement='outside'
        isDisabled
        classNames={{ base: ['!mt-[50px]'], inputWrapper: ['h-[60px]'], label: ['!top-[30%]'] }}
        placeholder='Điện thoại'
        value={customer.phone}
      />
      <Input
        variant='flat'
        label='Giới tính'
        labelPlacement='outside'
        isDisabled
        classNames={{ base: ['!mt-[50px]'], inputWrapper: ['h-[60px]'], label: ['!top-[30%]'] }}
        placeholder='Giới tính'
        value={customer.gender}
      />
      <Input
        variant='flat'
        label='Ngày sinh'
        labelPlacement='outside'
        isDisabled
        classNames={{ base: ['!mt-[50px]'], inputWrapper: ['h-[60px]'], label: ['!top-[30%]'] }}
        type='date'
        placeholder='Ngày sinh'
        value={customer.dateOfBirth && new Date(customer.dateOfBirth).toISOString().slice(0, 10)}
      />
      <Input
        variant='flat'
        label='Địa chỉ'
        labelPlacement='outside'
        isDisabled
        classNames={{ base: ['!mt-[50px]'], inputWrapper: ['h-[60px]'], label: ['!top-[30%]'] }}
        placeholder='Địa chỉ'
        value={customer.address ? customer.address[0] : ''}
      />
    </div>
  )
})

export default ProfileForm
