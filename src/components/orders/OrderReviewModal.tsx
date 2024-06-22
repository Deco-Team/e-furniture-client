import { createReviews } from '@actions/order/order.actions'
import Rating from '@components/starRating/StartRating'
import { IProduct } from '@global/interface'
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  UseDisclosureProps
} from '@nextui-org/react'
import { notifySuccess } from '@utils/toastify'
import { useState } from 'react'

interface OrderReviewModalProps {
  isOpen: boolean
  onOpenChange: UseDisclosureProps & ((isOpen: boolean) => void)
  onClose: () => void
  orderItems: {
    productId: string
    sku: string
    quantity: number
    product: IProduct
    review?: {
      _id: string
      rate: number
      comment: string
      createdAt: Date
    }
  }[]
  orderId: string
  onUpdate: (orderId: string) => void
}

const OrderReviewModal = (props: OrderReviewModalProps) => {
  const [reviews, setReviews] = useState(
    props.orderItems.map((item) => ({
      productId: item.productId,
      rating: 0,
      comment: ''
    }))
  )

  const [errorsInput, setErrorsInput] = useState(
    props.orderItems.map((item) => ({
      productId: item.productId,
      error: false
    }))
  )

  const [errorsRating, setErrorsRating] = useState(
    props.orderItems.map((item) => ({
      productId: item.productId,
      error: false
    }))
  )

  const handleRatingChange = (productId: string, rating: number) => {
    setReviews(reviews.map((review) => (review.productId === productId ? { ...review, rating } : review)))
    setErrorsRating(errorsRating.map((error) => (error.productId === productId ? { ...error, error: false } : error)))
  }

  const handleCommentChange = (productId: string, comment: string) => {
    setReviews(reviews.map((review) => (review.productId === productId ? { ...review, comment: comment } : review)))
    setErrorsInput(errorsInput.map((error) => (error.productId === productId ? { ...error, error: false } : error)))
  }

  const handleSubmit = async () => {
    setReviews(
      reviews.map((review) => ({
        ...review,
        comment: review.comment.trim()
      }))
    )

    const newErrorsInput = reviews.map((review) => ({
      productId: review.productId,
      error: review.comment.trim().length < 10
    }))
    setErrorsInput(newErrorsInput)

    const newErrorsRating = reviews.map((review) => ({
      productId: review.productId,
      error: review.rating <= 0
    }))
    setErrorsRating(newErrorsRating)

    const hasErrors = newErrorsInput.some((error) => error.error) || newErrorsRating.some((error) => error.error)
    if (hasErrors) {
      return
    }

    // Perform API request with the reviews data
    let success = false
    try {
      const responses = await Promise.all(
        reviews.map((review) => createReviews(review.productId, props.orderId, review.rating, review.comment))
      )

      success = responses.every((response) => response)
    } catch (error) {
      console.log(error)
      return
    }

    if (success) {
      props.onUpdate(props.orderId)
      notifySuccess('Thêm đánh giá thành công')
      setReviews(
        props.orderItems.map((item) => ({
          productId: item.productId,
          rating: 0,
          comment: ''
        }))
      )
      setErrorsInput(
        props.orderItems.map((item) => ({
          productId: item.productId,
          error: false
        }))
      )
      setErrorsRating(
        props.orderItems.map((item) => ({
          productId: item.productId,
          error: false
        }))
      )
      props.onClose()
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      placement='top-center'
      size='xl'
      scrollBehavior='inside'
    >
      <ModalContent>
        <ModalHeader>Đánh giá sản phẩm</ModalHeader>
        <ModalBody className='gap-4'>
          {props.orderItems.map((item) => (
            <div key={item.productId} className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                <Image
                  removeWrapper
                  src={item.product.images[0]}
                  width='100%'
                  className='w-full max-w-[75px] object-cover aspect-square'
                  alt={item.product.name}
                />
                <div className='flex flex-col gap-1 w-full'>
                  <h4 className='font-semibold'>{item.product.name}</h4>
                  <p className='text-gray-500 text-sm'>SKU: {item.sku}</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <p>Chất lượng sản phẩm: </p>
                  <Rating
                    ratingInPercent={0}
                    iconSize='l'
                    showOutOf={true}
                    enableUserInteraction={true}
                    onClick={(stars) => handleRatingChange(item.productId, stars)}
                  />
                </div>
                {errorsRating.find((error) => error.productId === item.productId)?.error && (
                  <p className='text-red-500 text-xs'>Vui lòng chọn số sao</p>
                )}
              </div>
              <Textarea
                variant='bordered'
                label='Nhận xét'
                placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm này với những người khác mua nhé'
                onValueChange={(value: string) => {
                  handleCommentChange(item.productId, value)
                }}
                value={reviews.find((review) => review.productId === item.productId)?.comment || ''}
                minRows={4}
                maxRows={6}
                errorMessage={
                  errorsInput.find((error) => error.productId === item.productId)?.error &&
                  'Vui lòng nhập nhiều hơn 10 ký tự'
                }
              />
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose} variant='light'>
            Hủy
          </Button>
          <Button
            className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] max-sm:w-full font-semibold disabled:opacity-50 disabled:hover:opacity-50'
            onClick={handleSubmit}
          >
            Hoàn thành
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrderReviewModal
