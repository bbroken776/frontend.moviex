import Container from '@components/(shared)/custom/container'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import NavbarMobileLinkList from './navbarMobileLinkList'
import NavbarProfile from './navbarProfile'
import NavbarMobileProfile from './navbarMobileProfile'

interface NavbarMobileViewProps {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

const NavbarMobileView = ({ isOpen, setOpen }: NavbarMobileViewProps) => {
  const handleNavbarStatus = () => setOpen(!isOpen)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.removeAttribute('style')
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden absolute top-0 left-0 w-full h-screen bg-mineshaft-900 z-10"
          //          onClick={handleNavbarStatus}
          initial={{ x: '-100%', y: 130 }}
          animate={{ x: 0, y: 130 }}
          exit={{ x: '-100%', y: 130 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Container>
            <NavbarMobileLinkList />
            <NavbarMobileProfile />
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default NavbarMobileView
