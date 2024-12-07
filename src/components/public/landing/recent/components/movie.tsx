import MovieInfo from './movieInfo';
import MoviePoster from './moviePoster';

interface MovieProps {
  poster: string;
  title: string;
  year: number;
  genres: string[];
  likes: number;
  duration: number;
  id: number;
}

const Movie = ({ poster, title, year, genres, likes, id, duration }: MovieProps) => (
  <a href={`/movies/${id}`} className="relative group w-full">
    <MoviePoster poster={poster} title={title} />
    <MovieInfo title={title} year={year} genres={genres} likes={likes} duration={duration} />
  </a>
);

export default Movie;
