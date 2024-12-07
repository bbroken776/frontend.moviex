import navbarConfig from '@configs/navbar.config';
import MobileLink from './mobileLink';

const MobileLinkList = () => {
  return (
    <nav className="gap-10 ml-10 mt-10">
      <ul className="flex flex-col justify-center gap-7">
        {navbarConfig.links.map((link, index) => (
          <li key={index}>
            <MobileLink title={link.title} route={link.route} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileLinkList;
