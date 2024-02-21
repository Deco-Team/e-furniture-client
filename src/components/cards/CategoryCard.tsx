import { Card, CardBody, Image } from '@nextui-org/react'
import { ICategory } from '@global/interface'

interface CategoryCardProps {
  category: ICategory
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card
      shadow='sm'
      isBlurred
      isPressable
      className='min-w-fit max-w-fit snap-start sm:[&:nth-child(3n+1)]:mr-auto sm:[&:nth-child(3n+2)]:mx-auto	sm:[&:nth-child(3n)]:ml-auto drop-shadow-lg'
      onClick={() => console.log('Category clicked')}
    >
      <CardBody className='overflow-visible p-0 relative'>
        <Image
          isZoomed
          isBlurred
          removeWrapper
          shadow='sm'
          radius='lg'
          width='100%'
          alt={category.image}
          className='w-[150px] sm:w-full sm:max-w-[360px] object-cover aspect-[2/1]'
          src={category.image}
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black opacity-20 pointer-events-none z-20'></div>
        <h3 className='font-semibold text-base sm:text-xl text-white absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 pointer-events-none z-30'>
          {category.name}
        </h3>
      </CardBody>
    </Card>
  )
}

export default CategoryCard
