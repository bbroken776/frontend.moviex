'use client';

import CreateANDUpdateMovie, { CAUMovie } from '@components/admin/movies';
import apiClient from '@services/apiClient';
import { useEffect, useState } from 'react';

export default function EditMoviePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [movie, setMovie] = useState<CAUMovie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await apiClient.get(`/movies/${id}`);
        const { movie: movieData } = response.data;

        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Loading movie data...</p>;
  }

  if (!movie) {
    return <p>Movie not found or failed to load.</p>;
  }

  return <CreateANDUpdateMovie movie={movie} />;
}
