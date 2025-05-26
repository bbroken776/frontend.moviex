'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@components/(shared)/custom/container';
import apiClient from '@services/apiClient';
import IMovie from '@interfaces/iMovie';


interface CreateANDUpdateMovieProps {
  movie?: IMovie;
}

const CreateANDUpdateMovie = ({ movie }: CreateANDUpdateMovieProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    genres: '',
    duration: '',
    trailer: '',
    poster: null as string | null, 
    banner: null as string | null,
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || '',
        description: movie.description || '',
        year: movie.year ? String(movie.year) : '',
        genres: movie.genres.join(",") || '',
        duration: movie.duration ? String(movie.duration) : '',
        trailer: movie.trailer || '',
        poster: movie.poster || null,
        banner: movie.banner || null,
      });
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const stripBase64Prefix = (data: string | null) => {
        if (data && data.startsWith('data:image')) {
          return data.split(',')[1];
        }
        return data;
      };

      const payload = {
        title: formData.title,
        description: formData.description,
        year: Number(formData.year),
        genres: formData.genres,
        duration: Number(formData.duration),
        trailer: formData.trailer,
        poster: stripBase64Prefix(formData.poster),
        banner: stripBase64Prefix(formData.banner),
      };

      console.log('Payload:', payload);

      if (movie?.id) {
        await apiClient.patch(`/movies/${movie.id}`, payload);
      } else {
        await apiClient.post('/movies', payload);
      }

      router.push('/admin');
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-mineshaft-900/50 p-6 rounded shadow-lg mt-[100px]"
      >
        <h1 className="text-2xl font-bold text-white">
          {movie ? 'Edit Movie' : 'Create Movie'}
        </h1>

        <div>
          <label className="block text-sm text-zinc-100 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-100 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm text-zinc-100 mb-1">Genres (comma-separated)</label>
          <input
            type="text"
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-zinc-100 mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-zinc-100 mb-1">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-100 mb-1">Trailer (Video URL)</label>
          <input
            type="text"
            name="trailer"
            value={formData.trailer}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
            required
          />
        </div>

        {!movie && (
          <>
            <div>
              <label className="block text-sm text-zinc-100 mb-1">Poster</label>
              <input
                type="file"
                name="poster"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-100 mb-1">Banner</label>
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-amber-500/50 text-white px-4 py-2 rounded hover:bg-amber-500 transition-colors ease-in-out duration-300"
        >
          {movie ? 'Update Movie' : 'Create Movie'}
        </button>
      </form>
    </Container>
  );
};

export default CreateANDUpdateMovie;