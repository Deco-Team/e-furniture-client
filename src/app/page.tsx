import CategoryList from '~/components/category list/CategoryList'
import { getCategories } from './homeAction'

async function getData() {
  const res = await getCategories(1, 10, '')
  return res.docs
}

export default async function Home() {
  const categories = await getData()

  return (
    <main className='min-h-screen py-24 flex flex-col items-center'>
      <h2>This is Home page</h2>
      <CategoryList categories={categories} />
    </main>
  )
}
