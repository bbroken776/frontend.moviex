'use client';

import { useEffect, useState } from 'react';

import Container from '@components/(shared)/custom/container';
import MoviesDisplayPagination from '@components/public/movies/display/components/moviesDisplayPagination';
import MoviesDisplayFilter from '@components/public/movies/display/components/moviesDisplayFilter';

import useDebounce from '@hooks/useDebounce';
import IMovie from '@interfaces/iMovie';
import apiServer from '@services/apiServer';
import MoviesDisplay from '@components/public/movies/display';

const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western',
];

export default function MoviesPage() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [genre, setGenre] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('year');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [years, setYears] = useState<number[]>([]);

  const moviesPerPage = 10;
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiServer.get('/movies');
        const { movies }: { movies: IMovie[] } = response.data;

        setMovies(movies);
        setTotalPages(Math.ceil(movies.length / moviesPerPage));
        setLoading(false);

        const getUniqueSortedYears = (movies: IMovie[]): number[] => {
          return [...new Set(movies.map(movie => movie.year))].sort((a, b) => b - a);
        };

        setYears(getUniqueSortedYears(movies));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = [...movies];

    if (debouncedSearchTerm)
      filtered = filtered.filter(movie => movie.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    if (genre) filtered = filtered.filter(movie => movie.genres.includes(genre.toLowerCase()));
    if (year) filtered = filtered.filter(movie => movie.year === parseInt(year));

    if (orderBy === 'year') {
      filtered = filtered.sort((a, b) => b.year - a.year);
    } else if (orderBy === 'duration') {
      filtered = filtered.sort((a, b) => b.duration - a.duration);
    } else if (orderBy === 'likes') {
      filtered = filtered.sort((a, b) => b.likes - a.likes);
    } else if (orderBy === 'createdAt') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    }

    setFilteredMovies(filtered);
    setTotalPages(Math.ceil(filtered.length / moviesPerPage));
    setCurrentPage(1);
  }, [debouncedSearchTerm, genre, year, movies, orderBy]);

  const currentMovies = filteredMovies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage);

  return (
    <Container className="mt-20 min-h-[70vh] flex flex-col">
      <MoviesDisplayFilter
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        years={years}
        genres={GENRES}
      />
      <MoviesDisplay isLoading={isLoading} movies={currentMovies} />

      <div className="mt-auto">
        <MoviesDisplayPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </Container>
  );
}
