import React, { memo } from 'react'
import { Avatar } from '@nextui-org/avatar'

type AvatarWithNameProps = {
  firstName?: string
  lastName?: string
  imageUrl?: string
}

const AvatarWithName = memo(function AvatarWithName({ firstName, lastName, imageUrl }: AvatarWithNameProps) {
  return (
    <div className='flex flex-col items-center'>
      <Avatar showFallback src={imageUrl} className='' classNames={{ base: ['!w-20', '!h-20', 'mb-2'] }} />
      <p className='text-lg font-medium'>
        {firstName ? (lastName ? `${lastName} ${firstName}` : firstName) : 'Customer'}
      </p>
    </div>
  )
})

export default AvatarWithName
