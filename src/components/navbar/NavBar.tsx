import { getMe } from '@actions/customers/customer.actions'
import { cookies } from 'next/headers'
import NavigationBar from './NavigationBar'

const getData = async () => {
  const me = await getMe()
  return { me }
}

const revalidate = 0

const NavBar = async () => {
  const { me } = await getData()
  const isLogin = cookies().get('accessToken') ? true : false

  return <NavigationBar isLogin={isLogin} me={me} />
}

export default NavBar
