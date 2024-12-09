'use client';

import { useEffect, useState } from 'react';
import MoviesDisplayPagination from '@components/public/movies/display/components/moviesDisplayPagination';
import Container from '@components/(shared)/custom/container';

import useAuth from '@hooks/useAuth';
import IUser from '@interfaces/iUser';
import apiClient from '@services/apiClient';

interface LikedMovie {
  id: number;
  title: string;
  description: string;
  poster: string;
  year: number;
  duration: number;
  likes: number;
}

interface LikedMovieCardProps {
  movie: LikedMovie;
}

export function LikedMovieCard({ movie }: LikedMovieCardProps) {
  return (
    <a className="max-w-[200px] relative rounded shadow-md overflow-hidden group w-full sm:w-44 md:w-52 lg:w-56">
      {/* Movie Banner as Background */}
      <img
        className="w-full h-64 object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
        src={process.env.API_URL + movie.poster}
        alt={movie.title}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mineshaft-950"></div>

      {/* Movie Info */}
      <div className="absolute bottom-5 left-5 text-white">
        {/* Movie Title */}
        <h3 className="text-lg font-semibold">{movie.title}</h3>

        {/* Badge with Movie Year */}
        <span className="bg-yellow-500 text-gray-900 text-xs font-semibold px-2 py-1 rounded mt-2">{movie.year}</span>
      </div>
    </a>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : 'MC';

  const [updatingUser, setUpdatingUser] = useState<IUser | null>(user);
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [likedMovies, setLikedMovies] = useState<LikedMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (user) {
      setUpdatingUser(user);
    }
  }, [user]);

  useEffect(() => {
    const fetchLikedMovies = async (page: number) => {
      try {
        const response = await apiClient.get(`/users/me/liked-movies?page=${page}`);
        const { likedMovies } = response.data;

        setLikedMovies(likedMovies);
        setTotalPages(Math.ceil(likedMovies.length / 10));
      } catch (err) {
        console.error('Error fetching liked movies:', err);
      }
    };

    fetchLikedMovies(currentPage);
  }, [currentPage]);

  const handleEditToggle = () => setEditMode(prev => !prev);

  const handleSave = async () => {
    try {
      if (updatingUser) {
        const dataToUpdate: any = { ...updatingUser };

        // Include the new password only if provided
        if (newPassword) dataToUpdate.password = newPassword;

        const response = await apiClient.patch(`/users/${updatingUser.id}`, dataToUpdate);

        if (response.status === 200) {
          setEditMode(false);
          alert('Profile updated successfully!');
        }
      }
    } catch (err) {
      console.error('Error saving user data:', err);
      alert('Failed to update profile.');
    }
  };

  return (
    <Container className="min-h-screen mt-20">
      {/* User Profile Info Box */}
      <div className="bg-mineshaft-900/50 rounded shadow-md p-6 flex flex-col md:flex-row items-center">
        <div className="flex-shrink-0 mb-6 md:mr-6">
          <div className="bg-yellow-500 rounded px-6 py-6 flex items-center justify-center">
            <span className="text-9xl font-bold text-gray-900">{userInitials}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="space-y-4">
            {/* First Name and Last Name in Same Row */}
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

            {/* Email */}
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

            {/* New Password */}
            {editMode && (
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
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

      {/* Liked Movies Box with Grid Layout */}
      <div className="bg-mineshaft-900/50 mt-20 rounded shadow-md p-6">
        <h2 className="text-xl font-semibold text-yellow-500 mb-4">Liked Movies</h2>
        {/* Movie grid with 5 items per row */}
        <div className="flex gap-8">
          {likedMovies.map(movie => (
            <LikedMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <MoviesDisplayPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </Container>
  );
}
