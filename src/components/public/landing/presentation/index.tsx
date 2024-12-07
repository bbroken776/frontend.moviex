'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Container from '@components/(shared)/custom/container';
import MovieSkeletonLoader from './components/movieSkeletonLoader';
import IMovie from '@interfaces/iMovie';
import apiServer from '@services/apiServer';
import Movie from './components/movie';

const LandingPresentation = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiServer.get('/movies/most-liked');
        const { movies } = response.data;

        setMovies(movies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovies();

    const interval = setInterval(() => {
      setCurrentMovieIndex(prevIndex => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const currentMovie = movies[currentMovieIndex];

  return (
    <Container className="relative h-[500px] overflow-hidden mt-20">
      {isLoading || movies.length < 1 ? (
        <MovieSkeletonLoader />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovieIndex}
            initial={{ opacity: 0.4, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0.4, filter: 'blur(10px)' }}
            transition={{
              opacity: { duration: 0.5, ease: 'easeInOut' },
              filter: { duration: 0.5, ease: 'easeInOut' },
            }}
            className="absolute inset-0 w-full h-full p-4 md:p-8"
          >
            <div className="relative w-full h-full">
              <Movie
                title={currentMovie.title}
                banner={currentMovie.banner}
                year={currentMovie.year}
                genres={currentMovie.genres}
                duration={currentMovie.duration}
                description={currentMovie.description}
                likes={currentMovie.likes}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Container>
  );
};

export default LandingPresentation;