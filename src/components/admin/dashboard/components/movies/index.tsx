'use client';

import { useEffect, useState } from 'react';

import Container from '@components/(shared)/custom/container';

import DashboardMovie from './components/movie';

import IMovie from '@interfaces/iMovie';
import apiClient from '@services/apiClient';

const DashboardMovies = () => {
  const [data, setData] = useState<IMovie[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiClient.get('/dashboard/movies');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/movies/${id}`);
      setData(data.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-6 items-center justify-center md:flex-row md:justify-between bg-mineshaft-900/50 px-6 py-4 mt-[100px] mb-[20px] rounded shadow-lg">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
          />
        </div>
        <a href="/admin/movies/create">
          <button className="bg-amber-500/50 text-white px-4 py-2 rounded hover:bg-amber-500 transition-colors ease-in-out duration-300">
            Create Movie
          </button>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMovies.map((movie, index) => (
          <DashboardMovie key={index} movie={movie} handleDelete={() => handleDelete(movie.id)} />
        ))}
      </div>

      {filteredMovies.length === 0 && <p className="text-center text-gray-500 mt-4">No movies found.</p>}
    </Container>
  );
};

export default DashboardMovies;
