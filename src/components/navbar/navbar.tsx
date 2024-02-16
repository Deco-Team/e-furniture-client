import { getMe } from '@actions/customers/customer.actions'
import NavigationBar from './navigationBar'
import { cookies } from 'next/headers'

const getData = async () => {
  const me = await getMe()
  return { me }
}

const NavBar = async () => {
  const { me } = await getData()
  const isLogin = cookies().get('accessToken') ? true : false

  return <NavigationBar isLogin={isLogin} me={me} />
}

export default NavBar
