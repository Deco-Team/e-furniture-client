import { Progress } from '@nextui-org/react'

const ProgressLoading = () => {
  return (
    <Progress
      size='sm'
      isIndeterminate
      aria-label='Loading...'
      classNames={{
        base: 'max-w-full sticky z-50 top-[72px] sm:top-24',
        indicator: '!bg-[var(--primary-orange-color)]'
      }}
    />
  )
}

export default ProgressLoading
