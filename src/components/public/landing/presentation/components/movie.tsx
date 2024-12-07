import MovieBanner from './movieBanner';
import MovieInfo from './movieInfo';

interface MovieProps {
  title: string;
  banner: string;
  year: number;
  genres: string[];
  duration: number;
  description: string;
  likes: number
}

const Movie = ({ title, banner, year, genres, duration, description, likes }: MovieProps) => {
  return (
    <div className="relative flex flex-col space-y-6">
      <MovieBanner banner={banner} title={title} />
      <div className="absolute bottom-12 md:left-8 flex flex-col items-center md:items-start px-6 py-4 z-10">
        <MovieInfo title={title} description={description} genres={genres} duration={duration} year={year} likes={likes} />
      </div>
    </div>
  );
};

export default Movie;
