'use client';

import { useState } from 'react';

import Container from '@components/(shared)/custom/container';
import Logo from '@components/(shared)/logo';

import NavbarLinkList from './components/navbarLinkList';
import NavbarToggleButton from './components/mobile/mobileToggleButton';

import Profile from './components/profile/profile';
import NavbarMobileView from './components/mobile/mobileView';

const Navbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="bg-mineshaft-900">
        <Container className="flex justify-between items-center py-10">
          <div className="w-full md:w-fit flex justify-between items-center">
            <a href="/">
              <Logo />
            </a>
            <NavbarToggleButton isOpen={isOpen} setOpen={setOpen} />
            <NavbarLinkList />
          </div>
          <Profile />
        </Container>
      </div>

      <NavbarMobileView isOpen={isOpen} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
