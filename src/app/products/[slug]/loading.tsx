import { Skeleton } from '@nextui-org/react'

const LoadingProductDetail = () => {
  return (
    <main className='flex pb-24 flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <div className='flex flex-col sm:grid sm:grid-cols-5 gap-4'>
          <div className='sm:col-span-2'>
            <Skeleton className='rounded-lg mb-2'>
              <div className='col-span-2 w-full aspect-square rounded-lg'></div>
            </Skeleton>
            <Skeleton className='rounded-lg'>
              <div className='w-full h-24 rounded-lg'></div>
            </Skeleton>
          </div>
          <div className='sm:col-span-3 flex flex-col gap-4'>
            <div className='sm:pt-4 '>
              <Skeleton className='w-1/4 rounded-lg mb-1'>
                <div className='h-5 w-1/4 rounded-lg'></div>
              </Skeleton>
              <div className='flex justify-between flex-wrap'>
                <Skeleton className='rounded-lg w-1/3'>
                  <div className='h-7 w-1/3 rounded-lg'></div>
                </Skeleton>
                <Skeleton className='rounded-lg w-1/5'>
                  <div className='h-7 w-1/5 rounded-lg'></div>
                </Skeleton>
              </div>
            </div>

            <div>
              <Skeleton className='w-1/4 rounded-lg mb-1'>
                <div className='h-6 w-1/4 rounded-lg'></div>
              </Skeleton>
              <Skeleton className='w-1/4 rounded-lg mb-1'>
                <div className='h-12 w-1/4 rounded-lg'></div>
              </Skeleton>
            </div>

            <div>
              <Skeleton className='w-1/4 rounded-lg mb-1'>
                <div className='h-6 w-1/4 rounded-lg'></div>
              </Skeleton>
              <div className='flex justify-between flex-wrap flex-col xs:flex-row'>
                <Skeleton className='w-1/3 rounded-lg mb-1'>
                  <div className='h-14 w-1/3 rounded-lg'></div>
                </Skeleton>
                <Skeleton className='w-1/3 max-sm:w-full rounded-lg mb-1'>
                  <div className='h-14 w-1/3 rounded-lg'></div>
                </Skeleton>
              </div>
            </div>

            <div>
              <div className='flex gap-3 mb-2'>
                <Skeleton className='w-1/4 rounded-lg mb-1'>
                  <div className='h-14 w-1/4 rounded-lg'></div>
                </Skeleton>
                <Skeleton className='w-1/4 rounded-lg mb-1'>
                  <div className='h-14 w-1/4 rounded-lg'></div>
                </Skeleton>
              </div>
              <Skeleton className='w-full rounded-lg mb-1'>
                <div className='h-52 rounded-lg'></div>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default LoadingProductDetail
