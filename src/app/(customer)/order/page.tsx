import { getCart } from '@actions/cart/cart.actions'
import { getMe } from '@actions/customers/customer.actions'
import Order from '@components/orders/Order'
import { redirect } from 'next/navigation'

const getData = async () => {
  const [cart, me] = await Promise.all([getCart(), getMe()])
  return { cart, me }
}

const OrderPage = async () => {
  const { cart, me } = await getData()
  if (cart?.items.length === 0) redirect('/')

  return cart && me && <Order cart={cart} me={me} />
}

export default OrderPage
