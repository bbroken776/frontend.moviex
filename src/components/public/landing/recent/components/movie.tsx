import MovieInfo from './movieInfo';
import MoviePoster from './moviePoster';

interface MovieProps {
  poster: string;
  title: string;
  year: number;
  genres: string[];
  duration: number;
  id: number;
}

const Movie = ({ poster, title, year, genres, id, duration }: MovieProps) => (
  <a href={`/movies/${id}`} className="relative group w-full">
    <MoviePoster poster={poster} title={title} />
    <MovieInfo title={title} year={year} genres={genres} duration={duration} />
  </a>
);

export default Movie;
