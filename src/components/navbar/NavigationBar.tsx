'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Image,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Badge
} from '@nextui-org/react'
import NextLink from 'next/link'
import {
  FaChevronDown,
  FaHome,
  FaLongArrowAltRight,
  FaRegEnvelope,
  FaSearch,
  FaShoppingCart,
  FaUser
} from 'react-icons/fa'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { logout } from '@actions/auth/auth.action'
import { usePathname, useRouter } from 'next/navigation'
import { MdSupportAgent } from 'react-icons/md'
import { useAuth } from '@src/hooks/useAuth'
import { CustomerAuthActionTypes } from '@src/contexts/AuthContext'
import { useCart } from '@src/hooks/useCart'
import { HiOutlineSparkles } from 'react-icons/hi2'

const NavigationBar = () => {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const {
    state: { customer },
    customerDispatch
  } = useAuth()
  const activePathname = usePathname()
  const [searchValue, setSearchValue] = React.useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  if (!customerDispatch) return null

  const logoutAction = () => {
    logout()
    customerDispatch({ type: CustomerAuthActionTypes.LOGOUT })
    clearCart()
    router.refresh()
  }

  return (
    !(activePathname === '/order' || activePathname.includes('login')) && (
      <>
        <Navbar
          position='static'
          isBlurred
          className={`border-b-1 border-default-100 ${activePathname === '/pricing' ? 'hidden' : 'flex'}`}
          classNames={{
            wrapper: 'h-12 px-2 w-full justify-center'
          }}
        >
          {' '}
          <NavbarContent className='flex gap-2 sm:gap-4' justify='center'>
            <p className='text-center'>
              🚀 Tăng trải nghiệm <span className='whitespace-nowrap'>không lo gián đoạn</span>
            </p>
            <Button
              as={NextLink}
              href='/pricing'
              size='sm'
              radius='full'
              disableAnimation
              endContent={<FaLongArrowAltRight />}
              className='text-sm gradient-border-button min-w-32'
            >
              Mua credits
            </Button>
          </NavbarContent>
        </Navbar>
        <Navbar
          isBlurred={false}
          maxWidth='xl'
          classNames={{ wrapper: 'gap-8 max-md:gap-4' }}
          className='h-[72px] sm:h-24 static sm:sticky sm:border-b sm:border-default-100'
        >
          <NavbarContent justify='start' className='max-w-fit'>
            <NavbarBrand>
              <NextLink href='/'>
                <Image removeWrapper radius='none' src='/logo.svg' alt='logo' className='!h-10' />
              </NextLink>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className='hidden sm:flex gap-6' justify='start'>
            <NavbarItem>
              <Link
                as={NextLink}
                underline={activePathname === '/' ? 'always' : 'hover'}
                href='/'
                className={`font-medium underline-offset-8 decoration-2 ${activePathname === '/' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
              >
                Trang chủ
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                as={NextLink}
                underline={activePathname === '/products' ? 'always' : 'hover'}
                href='/products'
                className={`font-medium underline-offset-8 decoration-2 ${activePathname === '/products' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
              >
                Sản phẩm
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                as={NextLink}
                underline={activePathname === '/contact' ? 'always' : 'hover'}
                href='/contact'
                className={`font-medium underline-offset-8 decoration-2 ${activePathname === '/contact' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
              >
                Liên hệ
              </Link>
            </NavbarItem>
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Link
                    disableRipple
                    underline={activePathname.includes('booking') ? 'always' : 'hover'}
                    as={Button}
                    variant='light'
                    className={`p-0 min-w-fit bg-transparent data-[hover=true]:bg-transparent aria-[expanded=true]:scale-100 aria-[expanded=true]:underline font-medium underline-offset-8 decoration-2 ${activePathname.includes('booking') ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                    endContent={<FaChevronDown className='max-h-3 max-w-3' />}
                  >
                    Dịch vụ
                  </Link>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                className='w-[200px]'
                itemClasses={{
                  base: 'gap-4'
                }}
                variant='flat'
                aria-label='Service action'
              >
                <DropdownItem
                  key='booking-visit'
                  as={NextLink}
                  href='/booking/visit'
                  className={` ${activePathname === '/booking/visit' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                >
                  Đặt lịch tham quan
                </DropdownItem>
                <DropdownItem
                  key='booking-consultant'
                  as={NextLink}
                  href={customer ? '/booking/consultant' : '/login-register'}
                  className={` ${activePathname === '/booking/consultant' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                >
                  Tư vấn thiết kế
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavbarItem>
              <Button
                as={NextLink}
                startContent={<HiOutlineSparkles className='min-w-5 min-h-5' />}
                // underline={activePathname === '/contact' ? 'always' : 'hover'}
                href={customer ? '/ai' : '/login-register'}
                className={`bg-gradient-to-l from-[#e3964a] to-[#f8747f] text-white shadow-lg`}
              >
                Furnique AI
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent as='div' className='items-center gap-1' justify='end'>
            {customer && (activePathname === '/ai' || activePathname === '/pricing') && (
              <p className='whitespace-nowrap text-sm mr-2 text-[#dc3545] font-semibold'>
                Credits: {customer?.credits}
              </p>
            )}

            <Input
              isClearable
              variant='bordered'
              classNames={{
                base: `${searchValue ? 'max-w-full' : 'max-w-12'}`,
                mainWrapper: 'h-full',
                input: 'text-small !pl-3 !pr-0 !mr-6',
                inputWrapper: `h-full text-center font-normal text-default-foreground shadow-none focus-within:rounded-lg focus-within:hover:!border-black focus-within:hover:bg-white ${searchValue ? 'rounded-lg' : 'rounded-full border-white hover:!border-default/5 hover:bg-default/30'}`
              }}
              placeholder='Tìm kiếm...'
              value={searchValue}
              onValueChange={(value: string) => setSearchValue(value)}
              onClear={() => setSearchValue('')}
              onKeyDown={(e) =>
                e.key === 'Enter' && searchValue && router.push(`/products/search?search=${searchValue}`)
              }
              size='lg'
              startContent={<FaSearch className='min-w-5 min-h-5 pointer-events-none' />}
              className={`focus-within:max-w-full transition-all !duration-300 !ease-linear ${activePathname === '/ai' || activePathname === '/pricing' ? 'hidden' : 'sm:flex hidden'}`}
            />

            <Button
              size='lg'
              isIconOnly
              variant='light'
              radius='full'
              onClick={onOpen}
              className={`${activePathname === '/ai' || activePathname === '/pricing' ? 'sm:flex hidden' : 'hidden'}`}
            >
              <FaSearch className='min-w-6 min-h-5' />
            </Button>

            {customer ? (
              <>
                <Button
                  as={NextLink}
                  href={'/cart'}
                  size='lg'
                  isIconOnly
                  variant='light'
                  radius='full'
                  className={`overflow-visible ${activePathname === '/cart' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
                >
                  <Badge
                    content={cart?.items.length}
                    size='sm'
                    showOutline={false}
                    className={`text-white ${activePathname === '/cart' ? 'bg-[var(--primary-orange-text-color)]' : 'bg-black'}`}
                    classNames={{
                      badge: 'font-semibold'
                    }}
                  >
                    <FaShoppingCart className='min-w-6 min-h-5 mr-[2px]' />
                  </Badge>
                </Button>

                <Dropdown placement='bottom-end'>
                  <DropdownTrigger>
                    <Button
                      size='lg'
                      isIconOnly
                      variant='light'
                      radius='full'
                      className={`${activePathname.includes('customer') ? 'text-[var(--primary-orange-text-color)]' : ''}`}
                    >
                      <FaUser className='min-w-5 min-h-5' />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Profile Actions' variant='flat'>
                    <DropdownItem as={NextLink} href='/customer' key='profile' className='text-black'>
                      Tài khoản của tôi
                    </DropdownItem>
                    <DropdownItem
                      as={NextLink}
                      className='text-black hover:!text-[var(--primary-orange-text-color)]'
                      key='orders'
                      color='warning'
                      href='/customer/orders'
                    >
                      Lịch sử đơn hàng
                    </DropdownItem>
                    <DropdownItem
                      as={NextLink}
                      className='text-black hover:!text-[var(--primary-orange-text-color)]'
                      key='consultant'
                      color='warning'
                      href='/customer/bookings/consultants'
                    >
                      Lịch sử tư vấn
                    </DropdownItem>
                    <DropdownItem key='logout' color='danger' onClick={logoutAction}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <>
                <Button
                  as={NextLink}
                  variant='light'
                  href='/login-register'
                  size='lg'
                  isIconOnly
                  radius='full'
                  className='sm:hidden min-w-fit'
                >
                  <FaArrowRightToBracket className='min-w-5 min-h-5' />
                </Button>
                <Button
                  as={NextLink}
                  href='/login-register'
                  className='hidden sm:flex min-w-fit bg-black text-white font-medium'
                >
                  Đăng nhập
                </Button>
              </>
            )}
          </NavbarContent>
        </Navbar>

        {/* <ProgressLoading /> */}

        <Navbar
          isBlurred={false}
          maxWidth='xl'
          classNames={{ wrapper: 'justify-center' }}
          className='h-[72px] top-[calc(100%-72px)] fixed sm:hidden border-t border-default-100'
        >
          <NavbarContent className='flex gap-8 max-xs:gap-4 !justify-evenly'>
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                size='lg'
                radius='full'
                as={NextLink}
                href='/'
                className={`${activePathname === '/' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
              >
                <FaHome className='min-w-5 min-h-5' />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                size='lg'
                radius='full'
                onPress={onOpen}
                className={`${activePathname === '/search' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
              >
                <FaSearch className='min-w-5 min-h-5' />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                size='lg'
                radius='full'
                as={NextLink}
                href={customer ? '/ai' : '/login-register'}
                className={`${activePathname === '/ai' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
              >
                <HiOutlineSparkles className='min-w-6 min-h-6' />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                isIconOnly
                variant='light'
                size='lg'
                radius='full'
                as={NextLink}
                href={'/contact'}
                className={`${activePathname === '/contact' ? 'text-[var(--primary-orange-text-color)]' : ''}`}
              >
                <FaRegEnvelope className='min-w-5 min-h-5' />
              </Button>
            </NavbarItem>
            <Dropdown backdrop='blur'>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant='light'
                    size='lg'
                    radius='full'
                    as={Link}
                    className={`${activePathname.includes('booking') ? 'text-[var(--primary-orange-text-color)]' : ''}`}
                  >
                    <MdSupportAgent className='min-w-6 min-h-6' />
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                className='w-[200px]'
                itemClasses={{
                  base: 'gap-4'
                }}
                variant='flat'
                aria-label='Service action'
              >
                <DropdownItem
                  key='booking-visit'
                  as={NextLink}
                  href='/booking/visit'
                  className={` ${activePathname === '/booking/visit' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                >
                  Đặt lịch tham quan
                </DropdownItem>
                <DropdownItem
                  key='booking-consultant'
                  as={NextLink}
                  href={customer ? '/booking/consultant' : '/login-register'}
                  className={` ${activePathname === '/booking/consultant' ? 'text-[var(--primary-orange-text-color)]' : 'text-black'}`}
                >
                  Tư vấn thiết kế
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>
        <Modal
          isOpen={isOpen}
          placement={'top'}
          backdrop='blur'
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          size='4xl'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Tìm kiếm</ModalHeader>
                <ModalBody>
                  <Input
                    isClearable
                    variant='bordered'
                    classNames={{
                      mainWrapper: 'h-full',
                      input: 'text-small',
                      inputWrapper: 'h-full text-center font-normal'
                    }}
                    placeholder='Tìm kiếm...'
                    value={searchValue}
                    onValueChange={(value: string) => setSearchValue(value)}
                    onClear={() => setSearchValue('')}
                    onKeyDown={(e) => {
                      e.key === 'Enter' && searchValue && router.push(`/products/search?search=${searchValue}`)
                      e.key === 'Enter' && searchValue && onClose()
                    }}
                    size='lg'
                    startContent={<FaSearch className='min-w-5 min-h-5 pointer-events-none' />}
                    className='focus-within:max-w-full transition-all !duration-300 !ease-linear'
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color='default' variant='light' onPress={onClose}>
                    Đóng
                  </Button>
                  <Button
                    onPress={() => {
                      searchValue && router.push(`/products/search?search=${searchValue}`)
                      searchValue && onClose()
                    }}
                    className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)]'
                  >
                    Tìm kiếm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
  )
}

export default NavigationBar
