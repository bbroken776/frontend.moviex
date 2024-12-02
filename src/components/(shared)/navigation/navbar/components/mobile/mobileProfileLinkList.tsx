import navbarConfig from '@configs/navbar.config'
import ProfileLink from './mobileProfileLink'

const MobileProfileLinkList = () => {
  return navbarConfig.userLinks.map((link, index) => (
    <ProfileLink title={link.title} route={link.route} key={index} />
  ))
}

export default MobileProfileLinkList
