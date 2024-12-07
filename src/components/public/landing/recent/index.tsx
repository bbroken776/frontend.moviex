'use client';

import { useEffect, useState } from 'react';

import Container from '@components/(shared)/custom/container';
import MovieSkeletonLoader from './components/movieSkeletonLoader';
import Movie from './components/movie';

import IMovie from '@interfaces/iMovie';
import apiServer from '@services/apiServer';

const TitleAndButton = () => (
  <div className="flex justify-between items-center mb-6 bg-mineshaft-900/60 px-4 py-3 rounded shadow-lg">
    <h1 className="text-4xl font-extrabold tracking-wide text-amber-400">Recent Movies</h1>
    <a
      href="/movies"
      className="px-6 py-2 border border-amber-400 bg-mineshaft-900 text-zinc-100 font-bold text-sm rounded shadow-md transition-colors ease-in-out duration-300 hover:bg-amber-400 hover:text-mineshaft-900"
    >
      View More Movies
    </a>
  </div>
);

const LandingRecent = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiServer.get('/movies/recent');
        const { movies } = response.data;

        setMovies(movies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Container className="mt-28">
      <TitleAndButton />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading || movies.length < 1
          ? [...Array(10)].map((_, index) => (
              <div key={index}>
                <MovieSkeletonLoader />
              </div>
            ))
          : [
              ...movies.map(movie => (
                <Movie
                  poster={movie.poster}
                  title={movie.title}
                  year={movie.year}
                  genres={movie.genres}
                  likes={movie.likes}
                  id={movie.id}
                  duration={movie.duration}
                  key={movie.title}
                />
              )),
              ...[...Array(Math.max(0, 10 - movies.length))].map((_, index) => (
                <div key={index} className="relative group">
                  <MovieSkeletonLoader />
                </div>
              )),
            ]}
      </div>
    </Container>
  );
};

export default LandingRecent;
