import { Button, Image, Link } from '@nextui-org/react'

const ErrorPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <Image width={500} height={400} src='/404.svg' alt='error' />
      <h1 className='font-semibold text-3xl pb-4 text-center'>Bạn đã truy cập đúng đường dẫn chứ?</h1>
      <h1 className='font-medium text-xl pb-4 text-center'>Đường dẫn bạn vừa truy cập hiện không còn khả dụng</h1>
      <Button as={Link} href='/' className='bg-[var(--primary-orange-color)] text-white px-10 py-3 rounded-full'>
        Quay lại trang chủ
      </Button>
    </div>
  )
}

export default ErrorPage
