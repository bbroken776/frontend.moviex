'use client';

import Container from '@components/(shared)/custom/container';
import MoviesDisplayPagination from '@components/public/movies/display/components/moviesDisplayPagination';
import LikedMovieCard from '@components/public/profile/likedMoviesCard';
import UserDetails from '@components/public/profile/userDetails';
import useAuth from '@hooks/useAuth';
import ILikedMovie from '@interfaces/iLikedMovie';
import apiClient from '@services/apiClient';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [likedMovies, setLikedMovies] = useState<ILikedMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLikedMovies = async (page: number) => {
      try {
        const response = await apiClient.get(`/users/me/liked-movies`);
        const movies = response.data.likedMovies ?? [];

        setLikedMovies(movies);
        setTotalPages(Math.ceil(movies.length / 10));
      } catch (err) {
        console.error('Error fetching liked movies:', err);
      }
    };

    fetchLikedMovies(currentPage);
  }, [currentPage]);

  const perPageMovies: ILikedMovie[] = likedMovies.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <Container className="min-h-screen mt-20">
      <UserDetails user={user} onUpdateUser={updatedUser => console.log(updatedUser)} />
      <div className="bg-mineshaft-900/50 mt-20 rounded shadow-md p-6">
        <h2 className="text-xl font-semibold text-yellow-500 mb-4">Liked Movies</h2>
        <div className="flex flex-wrap gap-8 items-center md:items-start">
          {perPageMovies.map(movie => (
            <LikedMovieCard key={movie.title + Math.random()} movie={movie} />
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
