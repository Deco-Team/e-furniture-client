import { getCustomer } from '@actions/customers/customer.actions'
import AvatarWithName from '@components/customer/AvatarWithName'
import Container from '@components/customer/Container'
import Header from '@components/customer/Header'
import ProfileForm from '@components/customer/ProfileForm'

import React from 'react'

const ProfilePage = async () => {
  const customer = await getCustomer()

  return (
    <main className='flex pb-24 flex-col items-center min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-96px)]'>
      <Container>
        <Header />
        {customer ? (
          <>
            <AvatarWithName firstName={customer.firstName} lastName={customer.lastName} imageUrl={customer.avatar} />
            <ProfileForm
              customer={{
                email: customer.email,
                phone: customer.phone,
                dateOfBirth: customer.dateOfBirth,
                address: customer.address,
                gender: customer.gender
              }}
            />
          </>
        ) : (
          <p>Truy xuất thông tin tài khoảng không thành công</p>
        )}
      </Container>
    </main>
  )
}

export default ProfilePage
