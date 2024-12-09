'use client';

import { useEffect, useState } from 'react';

import Container from '@components/(shared)/custom/container';
import Notification from '@components/(shared)/custom/notification/notification';

import MovieBanner from '@components/public/movies/movie/movieBanner';
import MovieInfo from '@components/public/movies/movie/movieInfo';
import MoviePlayer from '@components/public/movies/movie/moviePlayer';
import MovieSkeletonLoader from '@components/public/movies/movie/movieSkeletonLoader';

import useAuth from '@hooks/useAuth';
import IMovie from '@interfaces/iMovie';
import apiClient from '@services/apiClient';
import apiServer from '@services/apiServer';

export default function MoviePage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(0);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const handleShowVideo = () => {
    if (user != null) setShowVideo(prevState => !prevState);
    else Notification({ message: 'You must be logged in to watch the movie', type: 'ERROR' });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await apiServer.get(`/movies/${params.id}`);
        const { movie }: { movie: IMovie } = response.data;
        setMovie(movie);
        setLikes(movie.likes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setLoading(true);
      }
    };

    fetchMovie();
  }, [params.id]);

  const handleLike = async () => {
    try {
      const response = await apiClient.post('/movies/like', {
        movieId: Number(params.id),
        userId: Number(user?.id),
      });

      const { status, message } = response.data;

      if (status === 200) {
        Notification({ message, type: 'SUCCESS' });
        setLikes(prevLikes => prevLikes + 1);
      } else {
        Notification({ message, type: 'ERROR' });
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Error liking movie';
      Notification({ message, type: 'ERROR' });
    }
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
              likes={likes}
              onLike={handleLike}
              toggledVideo={showVideo}
              onToggleVideo={handleShowVideo}
            />
          </MovieBanner>
          {showVideo && <MoviePlayer source={movie.source} />}
        </>
      )}
    </Container>
  );
}
