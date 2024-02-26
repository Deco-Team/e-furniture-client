import { getOrder, getStatusHistory } from '@actions/order/order.actions'
import ErrorPage from '@components/error/error'
import OrderDetail from '@components/orders/OrderDetail'

const getData = async (orderId: string) => {
  const [order, orderStatus] = await Promise.all([getOrder(orderId), getStatusHistory(orderId)])

  return { order, orderStatus }
}

const OrderDetailPage = async ({ params }: { params: { orderId: string } }) => {
  const { order, orderStatus } = await getData(params.orderId)

  return !order ? <ErrorPage /> : <OrderDetail order={order} orderStatus={orderStatus} />
}

export default OrderDetailPage
