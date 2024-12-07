import Badge from '@components/(shared)/custom/badge';

interface MovieInfoProps {
  title: string;
  genres: string[];
  likes: number;
  year: number;
  duration: number;
}

const MovieInfo = ({ title, genres, likes, year, duration }: MovieInfoProps) => (
  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center md:items-start text-center md:text-start px-4 py-6 gap-3 bg-gradient-to-t from-mineshaft-950/85 to-transparent opacity-0 group-hover:opacity-100 filter blur-8 group-hover:blur-0 transition-all ease-in-out duration-300">
    <h1 className="text-2xl text-zinc-100 font-extrabold r text-center md:text-left truncate w-full">
      {title}
    </h1>

    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-amber-300 font-light opacity-90 mt-2">
      <div className="flex space-x-3 flex-wrap justify-center">
        {genres.map((genre, index) => (
          <Badge
            key={index}
            className="bg-mineshaft-800 text-amber-400 border-[1px] border-amber-400/50 font-medium px-3 py-1 rounded"
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </Badge>
        ))}
      </div>
    </div>

    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-amber-300 font-light opacity-90">
      <Badge className="bg-amber-400/100 text-mineshaft-800 border-[1px] border-amber-400 font-extrabold px-3 py-1 rounded">
        {duration} mins
      </Badge>

      <Badge className="bg-amber-400/100 text-mineshaft-800 border-[1px] border-amber-400 font-extrabold px-3 py-1 rounded">
        {year}
      </Badge>

      <Badge className="bg-amber-400/100 text-mineshaft-800 border-[1px] border-amber-400 font-extrabold px-3 py-1 rounded">
        {likes} likes
      </Badge>
    </div>
  </div>
);

export default MovieInfo;
