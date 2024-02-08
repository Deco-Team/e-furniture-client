import { Image } from '@nextui-org/react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

interface ProductSlideProps {
  images: string[]
  setSelectedImage: (image: string) => void
}

const ProductSlide = (props: ProductSlideProps) => {
  const properties = {
    autoplay: false,
    transitionDuration: 300,
    arrows: true,
    infinite: false,
    easing: 'ease',
    canSwipe: false,
    indicators: false,
    slidesToScroll: 1,
    slidesToShow: 5,
    nextArrow: <div className='text-4xl bg-[#0000002f] align-middle text-white w-5 text-center'>›</div>,
    prevArrow: <div className='text-4xl bg-[#0000002f] align-middle text-white w-5 text-center'>‹</div>
  }

  return (
    <Slide {...properties}>
      {props.images.map((image, index) => (
        <Image
          key={index}
          isBlurred
          removeWrapper
          width='100%'
          alt={`${index}`}
          className='w-full mx-auto object-cover aspect-square cursor-pointer hover:ring-2 ring-[var(--primary-orange-color)] scale-90'
          src={image}
          onClick={() => props.setSelectedImage(image)}
        />
      ))}
    </Slide>
  )
}

export default ProductSlide
