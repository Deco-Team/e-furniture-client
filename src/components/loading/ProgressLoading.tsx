import { Progress } from '@nextui-org/react'

const ProgressLoading = () => {
  return (
    <Progress
      size='sm'
      isIndeterminate
      aria-label='Loading...'
      classNames={{
        base: 'max-w-full absolute top-0',
        indicator: '!bg-[var(--primary-orange-color)]'
      }}
    />
  )
}

export default ProgressLoading
