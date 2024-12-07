import React from 'react';
import Badge from '@components/(shared)/custom/badge';

interface MovieInfoProps {
  title: string;
  description: string;
  genres: string[];
  duration: number;
  year: number;
  likes: number;
}

const MovieInfo = ({ title, description, genres, duration, year, likes }: MovieInfoProps) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-start">
    <h1 className="text-6xl font-serif text-zinc-100 font-extrabold r">{title}</h1>

    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-amber-300 font-light opacity-90 mt-4">
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

    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-amber-300 font-light opacity-90 mt-2">
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

    <p className="text-zinc-300 text-sm mt-3 opacity-90 max-w-[500px] sm:max-w-[700px] md:max-w-[600px] text-center md:text-left">
      {description}
    </p>
  </div>
);

export default MovieInfo;
