import { Image } from '@nextui-org/react'
import { ceil } from 'lodash'
import Carousel from 'react-material-ui-carousel'

interface ProductSlideProps {
  images: string[]
  setSelectedImage: (image: string) => void
}

const ProductSlide = (props: ProductSlideProps) => {
  let items = []
  for (let i = 0; i < ceil(props.images.length / 4); i += 1) {
    items.push(props.images.slice(i, i + 4))
  }

  const properties = {
    autoPlay: false,
    indicators: false,
    swipe: true,
    cycleNavigation: false,
    navButtonsAlwaysVisible: true,
    duration: 100,
    NextIcon: <div className='text-4xl bg-[#00000082] align-middle text-white w-6 text-center -right-5'>›</div>,
    PrevIcon: <div className='text-4xl bg-[#00000082] align-middle text-white w-6 text-center left-0'>‹</div>,
    navButtonsProps: {
      style: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0
      }
    }
  }

  return (
    <Carousel {...properties} animation={'fade'} className='relative'>
      {items.map((item, index) => (
        <div key={index} className='flex max-w-full'>
          {item.map((image) => (
            <Image
              key={image}
              isBlurred
              removeWrapper
              width='100%'
              alt={`${image}`}
              className='w-1/4 object-cover aspect-square cursor-pointer hover:ring-2 ring-[var(--primary-orange-color)] scale-90 shadow-lg'
              src={image}
              onClick={() => props.setSelectedImage(image)}
            />
          ))}
        </div>
      ))}
    </Carousel>
  )
}

export default ProductSlide
