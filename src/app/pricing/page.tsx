'use client'

import { createAiCreditOrder } from '@actions/ai/ai.action'
import { IAIOrder } from '@app/(customer)/order/order.interface'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import { useAuth } from '@src/hooks/useAuth'
import { notifyError } from '@utils/toastify'
import { useRouter } from 'next/navigation'
import { PiStarFourFill } from 'react-icons/pi'

const PricingPage = () => {
  const router = useRouter()
  const { state } = useAuth()
  const handleCreateOrder = async (data: IAIOrder) => {
    const result = await createAiCreditOrder(data)
    if (result?.checkoutUrl) {
      router.push(result?.checkoutUrl)
    } else if (!state.customer) {
      router.push('/login-register')
    } else {
      notifyError('Đặt hàng thất bại')
    }
  }

  const pricingPLanData = [
    {
      planName: 'Cơ bản',
      planPrice: 0,
      planCredits: 30,
      imagePerDay: 3,
      planFeatures: [
        'Trình tạo Text-to-Image với chất lượng trung bình',
        'Trình tạo Text-to-3D-model với chất lượng trung bình',
        'Hỗ trợ xuất PNG, JPG',
        'Cộng đồng hỗ trợ'
      ],
      button: 'Bắt đầu',
      action: null
    },
    {
      planName: 'Cá nhân',
      planPrice: 49000,
      planCredits: 60,
      imagePerDay: 6,
      planFeatures: [
        'Trình tạo Text-to-Image với chất lượng cao',
        'Trình tạo Text-to-3D-model với chất lượng cao',
        'Hàng chờ ưu tiên',
        'Hỗ trợ xuất PNG, JPG, GLB',
        'Cộng đồng hỗ trợ'
      ],
      rateLimít: '30 lượt tạo / ngày',
      button: 'Mua ngay',
      action: {
        paymentMethod: 'PAY_OS' as 'PAY_OS',
        plan: 'PERSONAL' as 'PERSONAL'
      }
    },
    {
      planName: 'Cao cấp',
      planPrice: 119000,
      planCredits: 150,
      imagePerDay: 15,
      planFeatures: [
        'Trình tạo Text-to-Image với chất lượng cao',
        'Trình tạo Text-to-3D-model với chất lượng cao',
        'Hàng chờ ưu tiên',
        'Hỗ trợ xuất PNG, JPG, GLB',
        'Cộng đồng hỗ trợ'
      ],
      rateLimít: '50 lượt tạo / ngày',
      button: 'Mua ngay',
      action: { paymentMethod: 'PAY_OS' as 'PAY_OS', plan: 'PREMIUM' as 'PREMIUM' }
    }
  ]

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
        <div className='grid grid-cols-3 max-md:grid-cols-1 gap-8'>
          {pricingPLanData.map((plan, index) => (
            <Card key={index} isHoverable={true} className='p-3 gap-2'>
              <CardHeader className='flex flex-col gap-2 items-start'>
                <div className='flex items-center gap-2'>
                  <PiStarFourFill
                    className={`w-5 h-5 ${plan.planName === 'Cơ bản' ? 'hidden' : plan.planName === 'Cá nhân' ? 'text-[#e3964a]' : 'text-[#ff5f6b]'}`}
                  />
                  <p
                    className={`text-2xl font-bold ${plan.planName === 'Cơ bản' ? 'text-black' : plan.planName === 'Cá nhân' ? 'text-[#e3964a]' : 'text-[#ff5f6b]'}`}
                  >
                    {plan.planName}
                  </p>
                </div>
                <div className='flex gap-4 items-center'>
                  <p
                    className={`text-3xl  font-extrabold bg-clip-text text-transparent ${plan.planName === 'Cơ bản' ? 'bg-black' : plan.planName === 'Cá nhân' ? 'bg-[#e3964a]' : 'bg-[#ff5f6b]'}`}
                  >
                    {Intl.NumberFormat('en-DE').format(plan.planPrice)}&#8363;
                  </p>
                  <div className='flex flex-col'>
                    <p className='text-small text-default-800'>{plan.planCredits} credits</p>
                    <p className='text-small text-default-500'>&asymp; {plan.imagePerDay} ảnh</p>
                  </div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className='gap-3'>
                {plan.planFeatures.map((feature, index) => (
                  <p key={index}>&#10003; {feature}</p>
                ))}
                {plan.rateLimít && <p>&#10003; Hỗ trợ {plan.rateLimít}</p>}
              </CardBody>
              <CardFooter className='justify-center'>
                <Button
                  onClick={
                    plan.button === 'Bắt đầu'
                      ? () => {
                          if (!state.customer) router.push('/login-register')
                          else router.push('/ai')
                        }
                      : async () => {
                          {
                            if (plan.action) {
                              await handleCreateOrder(plan.action)
                            }
                          }
                        }
                  }
                  className={`w-4/5 font-semibold text-lg ${plan.button === 'Bắt đầu' ? 'bg-gray-200 text-black' : 'bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)]'}`}
                >
                  {plan.button}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

export default PricingPage
