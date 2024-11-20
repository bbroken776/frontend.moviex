import NavbarLink from './navbarLink'

import navbarConfig from '@configs/navbar.config'

const NavbarLinkList = () => {
  return (
    <nav className="hidden md:block gap-10 ml-10">
      <ul className="flex items-center gap-7">
        {navbarConfig.links.map((link, index) => (
          <li key={index}>
            <NavbarLink title={link.title} route={link.route} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavbarLinkList
