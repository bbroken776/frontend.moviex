import React from 'react';

interface MoviesDisplayFilterProps {
  genre: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  years: number[];
  genres: string[];
}

const MoviesDisplayFilter = ({
  genre,
  setGenre,
  year,
  setYear,
  orderBy,
  setOrderBy,
  searchTerm,
  setSearchTerm,
  years,
  genres,
}: MoviesDisplayFilterProps) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center md:flex-row md:justify-between bg-mineshaft-900/50 px-6 py-4 rounded shadow-lg">
      <div className="flex gap-6 items-center">
        <div className="flex flex-col justify-center">
          <select
            className="text-zinc-100 bg-transparent p-2 rounded outline-none"
            value={year}
            onChange={e => setYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col justify-center">
          <select
            className="text-zinc-100 bg-transparent p-2 rounded outline-none"
            value={genre}
            onChange={e => setGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full px-4 py-2 bg-mineshaft-800/40 text-zinc-100 rounded outline-none"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-6 items-center py-2 px-4 rounded bg-mineshaft-950">
        <button
          onClick={() => setOrderBy(orderBy === 'likes' ? '' : 'likes')}
          className={`px-2 py-1 rounded font-bold text-sm transition-colors ease-in-out duration-300 ${
            orderBy === 'likes' ? 'bg-amber-500/10 text-amber-500' : 'bg-transparent text-zinc-100'
          } hover:bg-amber-500/20 hover:text-amber-500`}
        >
          Popular
        </button>
        <button
          onClick={() => setOrderBy(orderBy === 'createdAt' ? '' : 'createdAt')}
          className={`px-2 py-1 rounded font-bold text-sm transition-colors ease-in-out duration-300 ${
            orderBy === 'createdAt' ? 'bg-amber-500/10 text-amber-500' : 'bg-transparent text-zinc-100'
          } hover:bg-amber-500/20 hover:text-amber-500`}
        >
          Newest
        </button>
      </div>
    </div>
  );
};

export default MoviesDisplayFilter;
