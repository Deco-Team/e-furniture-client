import Pricing from '@components/pricing/Pricing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Furnique | Công Cụ AI Tạo Nội Thất 2D/3D - Giá Cả Phải Chăng',
  description: `Khám phá công cụ tạo nội thất 2D/3D sử dụng AI tiên tiến từ Furnique. Tạo ra những thiết kế đẹp mắt với giá cả cạnh tranh. Bắt đầu thiết kế ngay hôm nay!`,
  keywords:
    'Khám phá công cụ tạo nội thất 2D/3D sử dụng AI tiên tiến từ Furnique. Tạo ra những thiết kế đẹp mắt với giá cả cạnh tranh. Bắt đầu thiết kế ngay hôm nay!'
}

const PricingPage = () => {
  return (
    <main className='flex pb-24 flex-col items-center justify-center min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-96px)]'>
      <div className='max-w-screen-lg p-4 w-full flex flex-col items-center gap-8'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='font-bold text-3xl'>
            Chọn gói{' '}
            <span className='bg-gradient-to-r from-[#e3964a] to-[#f8747f] bg-clip-text text-transparent'>
              Furnique AI
            </span>
          </h1>
          <h2 className='text-lg text-center'>
            Đăng kí thêm Furnique credits để mở khóa vô tận những trải nghiệm tuyệt vời với Furnique AI
          </h2>
        </div>
        <Pricing />
      </div>
    </main>
  )
}

export default PricingPage
