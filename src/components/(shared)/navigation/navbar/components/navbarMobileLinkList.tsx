
import navbarConfig from '@configs/navbar.config'
import NavbarMobileLink from './navbarMobileLink'

const NavbarMobileLinkList = () => {
  return (
    <nav className="gap-10 ml-10 mt-10">
      <ul className="flex flex-col justify-center gap-7">
        {navbarConfig.links.map((link, index) => (
          <li key={index}>
            <NavbarMobileLink title={link.title} route={link.route} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavbarMobileLinkList
