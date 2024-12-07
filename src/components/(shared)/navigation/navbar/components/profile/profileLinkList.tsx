import navbarConfig from '@configs/navbar.config';
import ProfileLink from './profileLink';

const ProfileLinkList = ({isAdmin}: {isAdmin: boolean}) => {
  return <>
  {navbarConfig.userLinks.map((link, index) => <ProfileLink title={link.title} route={link.route} key={index} />)}
  {isAdmin && <ProfileLink title={"Admin Dashboard"} route={"/admin"} key={"admin"} />}
  </>
};

export default ProfileLinkList;
