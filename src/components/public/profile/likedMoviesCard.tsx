import ILikedMovie from '@interfaces/iLikedMovie';
import Badge from '@components/(shared)/custom/badge';

interface LikedMovieCardProps {
  movie: ILikedMovie;
}

const LikedMovieCard = ({ movie }: LikedMovieCardProps) => {
  return (
    <a className="min-w-[200px] md:max-w-[200px] relative rounded shadow-md overflow-hidden group w-full sm:w-44 md:w-52 lg:w-56 hover:scale-105 cursor-pointer">
      <img
        className="w-full h-64 object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
        src={process.env.API_URL + movie.poster}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mineshaft-950"></div>
      <div className="absolute bottom-5 left-5 text-white">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <Badge className="bg-amber-400/100 text-mineshaft-800 border-[1px] border-amber-400 font-extrabold px-3 py-1 rounded">
          {movie.year}
        </Badge>
      </div>
    </a>
  );
};

export default LikedMovieCard;
