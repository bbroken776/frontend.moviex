import IUser from '@interfaces/iUser';

const ProfileDetails = ({ user }: { user: IUser }) => {
  const initials = user.firstName[0] + user.lastName[0];

  return (
    <div className="flex items-center gap-2">
      <div className="bg-amber-400 rounded px-2 py-1">
        <span className="font-bold text-mineshaft-900">{initials}</span>
      </div>
      <span className="text-zinc-100 font-medium whitespace-nowrap">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
};

export default ProfileDetails;
