import { getOrder } from '@actions/order/order.actions'
import ErrorPage from '@components/error/error'
import OrderDetail from '@components/orders/OrderDetail'

const getData = async (orderId: string) => {
  const order = await getOrder(orderId)

  return order
}

const OrderDetailPage = async ({ params }: { params: { orderId: string } }) => {
  const order = await getData(params.orderId)
  return !order ? (
    <ErrorPage />
  ) : (
    <>
      <OrderDetail order={order} />
    </>
  )
}

export default OrderDetailPage
