'use client'

import { useState } from 'react'

import Container from '@components/(shared)/custom/container'
import Logo from '@components/(shared)/logo'

import NavbarLinkList from './components/navbarLinkList'
import NavbarToggleButton from './components/navbarMobileToggleButton'

import NavbarProfile from './components/navbarProfile'
import NavbarMobileView from './components/navbarMobileView'

const Navbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="bg-mineshaft-900">
        <Container className="flex justify-between items-center py-10">
          <div className="w-full md:w-fit flex justify-between items-center">
            <Logo />
            <NavbarToggleButton isOpen={isOpen} setOpen={setOpen} />
            <NavbarLinkList />
          </div>
          <NavbarProfile />
        </Container>
      </div>

      <NavbarMobileView isOpen={isOpen} setOpen={setOpen} />
    </>
  )
}

export default Navbar
