import { Button, ScrollShadow } from '@nextui-org/react'
import CategoryCard from '../cards/CategoryCard'
import React from 'react'

interface CategoryListProps {
  categories: {
    name: string
    image: string
    description: string
  }[]
}

const CategoryList = ({ categories }: CategoryListProps) => {
  const [showAllCategories, setShowAllCategories] = React.useState(false)

  const visibleCategories = categories.slice(0, 3)
  const hiddenCategories = categories.slice(3)

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories)
  }
  return (
    <>
      <div className='max-w-screen-lg mx-auto px-4'>
        <h2 className='mb-5 font-bold text-2xl text-black'>Categories</h2>
        <ScrollShadow orientation='horizontal' offset={0} size={20} className='overflow-x-auto scroll-pl-4 snap-x '>
          <div className='flex sm:hidden gap-4 mb-4'>
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                description={category.description}
                image={category.image}
              />
            ))}
          </div>
        </ScrollShadow>
        <div className='hidden sm:grid sm:grid-cols-3 mb-4 gap-4'>
          {visibleCategories.map((category, index) => (
            <CategoryCard key={index} name={category.name} description={category.description} image={category.image} />
          ))}
        </div>
        <div
          className={`${showAllCategories ? 'sm:grid sm:grid-cols-3 gap-4 max-h-[1000px] mb-4' : 'sm:grid sm:grid-cols-3 gap-4 max-h-0'} hidden overflow-hidden transition-all !duration-400 !ease-linear`}
        >
          {hiddenCategories.map((category, index) => (
            <CategoryCard key={index} name={category.name} description={category.description} image={category.image} />
          ))}
        </div>
        {categories.length > 3 && (
          <div className='hidden sm:flex'>
            <Button
              onClick={toggleShowAllCategories}
              variant='bordered'
              className='bg-[var(--light-orange-color)] font-bold text-[var(--primary-orange-text-color)] rounded-full h-12 mb-4 px-7 mx-auto
              '
            >
              {showAllCategories ? 'View fewer categories' : 'View all categories'}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default CategoryList
