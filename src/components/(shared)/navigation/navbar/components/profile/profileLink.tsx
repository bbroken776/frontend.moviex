interface ProfileLinkProps {
  title: string;
  route: string;
}

const ProfileLink = ({ title, route }: ProfileLinkProps) => {
  return (
    <li className="px-4 py-2 hover:bg-mineshaft-900 rounded transition-colors ease-in-out duration-300">
      <a href={route} className="text-zinc-100">
        {title}
      </a>
    </li>
  );
};

export default ProfileLink;
