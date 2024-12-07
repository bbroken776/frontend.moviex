import Movie from '@components/public/landing/recent/components/movie';
import MovieSkeletonLoader from '@components/public/landing/recent/components/movieSkeletonLoader';
import IMovie from '@interfaces/iMovie';

interface MoviesDisplayProps {
  isLoading: boolean;
  movies: IMovie[];
}

const MoviesDisplay = ({ isLoading, movies }: MoviesDisplayProps) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => <MovieSkeletonLoader key={index} />)
        : movies.map(movie => (
            <Movie
              key={movie.id}
              poster={movie.poster}
              title={movie.title}
              year={movie.year}
              genres={movie.genres}
              likes={movie.likes}
              id={movie.id}
              duration={movie.duration}
            />
          ))}
    </div>
  );
};

export default MoviesDisplay;
