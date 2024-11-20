interface NavbarLinkProps {
  title: string
  route: string
}

const NavbarMobileLink = ({ title, route }: NavbarLinkProps) => {
  return (
    <a
      className="text-zinc-100 text-xl font-medium transition duration-300 ease-in-out hover:[text-shadow:0_0_5px_rgba(251,191,36,0.9),0_0_10px_rgba(251,191,36,0.8),0_0_30px_rgba(251,191,36,0.7),0_0_40px_rgba(251,191,36,0.6)]"
      href={route}
    >
      {title}
    </a>
  )
}

export default NavbarMobileLink
