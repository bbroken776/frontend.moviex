interface MobileProfileLinkProps {
  title: string;
  route: string;
}

const MobileProfileLink = ({ title, route }: MobileProfileLinkProps) => {
  return (
    <li className="px-4 py-2 hover:bg-mineshaft-800 rounded transition-colors ease-in-out duration-300">
      <a href={route} className="text-zinc-100">
        {title}
      </a>
    </li>
  );
};

export default MobileProfileLink;
