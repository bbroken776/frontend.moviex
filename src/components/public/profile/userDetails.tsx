import { useEffect, useState } from 'react';

import IUser from '@interfaces/iUser';
import apiClient from '@services/apiClient';
import Notification from '@components/(shared)/custom/notification/notification';

interface UserDetailsProps {
  user: IUser | null;
  onUpdateUser: (updatedUser: IUser) => void;
}

const UserDetails = ({ user, onUpdateUser }: UserDetailsProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [updatingUser, setUpdatingUser] = useState<IUser | null>(user);

  useEffect(() => {
    if (user) {
      setUpdatingUser(user);
    }
  }, [user]);

  const handleEditToggle = () => setEditMode(prev => !prev);

  const handleSave = async () => {
    try {
      if (updatingUser) {
        const dataToUpdate: any = { ...updatingUser };
        if (newPassword) dataToUpdate.password = newPassword;
        const response = await apiClient.patch(`/users/${updatingUser.id}`, dataToUpdate);
        const { status, message } = response.data;

        if (status === 200) {
          setEditMode(false);
          onUpdateUser(updatingUser);
          Notification({ message: message! ?? 'Profile updated successfully', type: 'SUCCESS' });
        }
      }
    } catch (err: any) {
      const message =
        err?.response?.status === 401
          ? 'You are not authorized, logging out...'
          : err?.response?.data?.message || err.message || 'An unexpected error occurred';

      console.error('Error saving user data:', message);
      Notification({ message: message || err.messsage || 'An unexpected error occurred', type: 'ERROR' });
    }
  };

  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : 'MC';

  return (
    <div className="bg-mineshaft-900/50 rounded shadow-md p-6 flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mb-6 md:mr-6">
        <div className="bg-yellow-500 rounded px-6 py-6 flex items-center justify-center">
          <span className="text-9xl font-bold text-gray-900">{userInitials}</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-300 text-sm font-semibold mb-2">First Name</label>
              <input
                type="text"
                value={updatingUser?.firstName || ''}
                onChange={e =>
                  setUpdatingUser({
                    ...updatingUser!,
                    firstName: e.target.value,
                  })
                }
                disabled={!editMode}
                className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-300 text-sm font-semibold mb-2">Last Name</label>
              <input
                type="text"
                value={updatingUser?.lastName || ''}
                onChange={e =>
                  setUpdatingUser({
                    ...updatingUser!,
                    lastName: e.target.value,
                  })
                }
                disabled={!editMode}
                className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={updatingUser?.email || ''}
              onChange={e =>
                setUpdatingUser({
                  ...updatingUser!,
                  email: e.target.value,
                })
              }
              disabled={!editMode}
              className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
            />
          </div>
          {editMode && (
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">New Password</label>
              <input
                type="password"
                name="new-pw"
                id="new-pw"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
                autoComplete="off"
              />
            </div>
          )}
        </div>
        <div className="mt-6 flex space-x-4 justify-center md:justify-end">
          <button
            onClick={handleEditToggle}
            className="px-6 py-2 bg-yellow-500 text-gray-900 rounded shadow hover:bg-yellow-400"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          {editMode && (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-amber-500/20 text-amber-500 border border-amber-500 rounded shadow hover:bg-amber-500 hover:text-zinc-100 hover:font-bold"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
