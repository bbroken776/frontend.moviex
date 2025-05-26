'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Container from '@components/(shared)/custom/container';

import MovieBanner from '@components/public/movies/movie/movieBanner';
import MovieInfo from '@components/public/movies/movie/movieInfo';
import MovieSkeletonLoader from '@components/public/movies/movie/movieSkeletonLoader';

import IMovie from '@interfaces/iMovie';
import apiServer from '@services/apiServer';
import MovieSessionsDisplayFilter from '@components/public/movies/movie/movieSessionsFilter';
import ICinema from '@interfaces/iCinema';
import MovieSessions from '@components/public/movies/movie/movieSessions';
import MovieCinema from '@components/public/movies/movie/movieSessions';

export default function MoviePage() {
  const { id } = useParams(); // Use the new useParams hook
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);

  const [regions, setRegions] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const [isLoading, setLoading] = useState<boolean>(true);

  const getUniqueRegions = (cinemas: ICinema[]): string[] => {
    return ['all', ...new Set(cinemas.map(cinema => cinema.location))].sort();
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await apiServer.get(`/movies/${id}`);
        const { movie }: { movie: IMovie } = response.data;
        setMovie(movie);
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    };

    const fetchCinemas = async () => {
      try {
        const response = await apiServer.get(`/cinemas/sessions/${id}`);
        const { session }: { session: ICinema[] } = response.data;
        const cinemasRegions = getUniqueRegions(session);

        setCinemas(session);
        setRegions(cinemasRegions);

        console.log('Cinemas fetched:', session);
        console.log('Unique regions:', cinemasRegions);
      } catch (err) {
        console.error('Error fetching cinemas:', err);
      }
    };

    fetchMovie();
    fetchCinemas();

    setLoading(false);
  }, [id]);

  const handleShowVideo = () => window.open(movie?.trailer, '_blank');

  const handleRegionFilterChange = (region: string) => {
    setRegionFilter(region);
    console.log('Region filter changed to:', region);
  };

  return (
    <Container className="min-h-screen mt-20">
      {isLoading || !movie ? (
        <div className="animate-pulse">
          <MovieSkeletonLoader />
        </div>
      ) : (
        <>
          <MovieBanner banner={movie.banner || ''} title={movie.title || ''}>
            <MovieInfo
              title={movie.title || ''}
              year={movie.year || 0}
              duration={movie.duration || 0}
              genres={movie.genres || []}
              description={movie.description || ''}
              poster={movie.poster || ''}
              onToggleVideo={handleShowVideo}
            />
          </MovieBanner>

          <MovieSessionsDisplayFilter region={regionFilter} regions={regions} setRegion={handleRegionFilterChange} />
          {cinemas.length > 0 && cinemas.map((c, index) => <MovieCinema key={index} cinema={c} />)}
        </>
      )}
    </Container>
  );
}
