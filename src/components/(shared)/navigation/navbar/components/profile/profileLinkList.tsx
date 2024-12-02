import navbarConfig from '@configs/navbar.config'
import ProfileLink from './profileLink'

const ProfileLinkList = () => {
  return navbarConfig.userLinks.map((link, index) => (
    <ProfileLink title={link.title} route={link.route} key={index} />
  ))
}

export default ProfileLinkList
