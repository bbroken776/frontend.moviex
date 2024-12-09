interface ProfileLinkProps {
  title: string;
  route: string;
}

const ProfileLink = ({ title, route }: ProfileLinkProps) => {
  return (
    <a href={route} className="text-zinc-100">
      <li className="px-4 py-2 hover:bg-mineshaft-900 rounded transition-colors ease-in-out duration-300">{title}</li>
    </a>
  );
};

export default ProfileLink;
