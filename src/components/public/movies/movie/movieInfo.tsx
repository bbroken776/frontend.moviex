import React from 'react';
import Badge from '@components/(shared)/custom/badge';

interface MovieInfoProps {
  title: string;
  year: number;
  duration: number;
  genres: string[];
  description: string;
  poster: string;
  likes: number;
  onLike: () => void;
  toggledVideo: boolean;
  onToggleVideo: () => void;
}

const MovieInfo = ({
  title,
  year,
  duration,
  genres,
  description,
  poster,
  likes,
  onLike,
  toggledVideo,
  onToggleVideo,
}: MovieInfoProps) => (
  <div className="absolute bottom-0 p-6 md:p-12 flex flex-col md:flex-row items-end max-w-6xl mx-auto w-full">
    <div className="hidden md:block w-36 md:w-64 transition-transform duration-500 ease-in-out transform hover:scale-105">
      <img src={process.env.API_URL + poster} alt={title} className="rounded-lg shadow-md object-cover w-full h-auto" />
    </div>
    <div className="text-white md:ml-6 flex-1 justify-center items-center text-center md:items-start md:justify-start md:text-start">
      <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
      <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-amber-300 font-light opacity-90 mt-4">
        {genres.map((genre, index) => (
          <Badge
            key={index}
            className="bg-mineshaft-800 text-amber-400 border-[1px] border-amber-400/50 font-medium px-3 py-1 rounded transition-transform duration-300 hover:scale-110"
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </Badge>
        ))}
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
      <div className="mt-6 flex justify-center md:justify-start gap-4">
        <button
          onClick={onLike}
          className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-mineshaft-900 font-bold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Like Movie
        </button>
        {!toggledVideo && (
          <button
            onClick={onToggleVideo}
            className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg shadow-md hover:from-gray-700 hover:to-gray-800 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            WATCH NOW
          </button>
        )}
      </div>
    </div>
  </div>
);

export default MovieInfo;
