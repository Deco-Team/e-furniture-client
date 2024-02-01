'use client'

import * as React from 'react'
import CategoryList from '~/components/category list/CategoryList'
import { getCategories } from './homeAction'

export default function Home() {
  const [categories, setCategories] = React.useState([])
  React.useEffect(() => {
    getCategories(1, 10, '').then((data) => {
      setCategories(data.docs)
    })
  }, [])

  return (
    <main className='min-h-screen py-24 flex flex-col items-center'>
      <h2>This is Home page</h2>
      <CategoryList categories={categories} />
    </main>
  )
}
