import { getCart } from '@actions/cart/cart.actions'
import Order from '@components/orders/Order'
import { redirect } from 'next/navigation'

const getData = async () => {
  const cart = await getCart()
  return { cart }
}

const OrderPage = async () => {
  const { cart } = await getData()
  if (cart?.items.length === 0) redirect('/')

  return <Order cart={cart} />
}

export default OrderPage
