import IMovie from '@interfaces/iMovie';

interface DashboardMovieProps {
  key: number;
  movie: IMovie;
  handleDelete: (id: number) => Promise<void>;
}

const DashboardMovie = ({ key, movie, handleDelete }: DashboardMovieProps) => {
  return (
    <div key={key} className="flex justify-between items-center bg-mineshaft-900/50 px-6 py-4 rounded shadow-lg">
      <div className="grid grid-rows-1 grid-cols-4 gap-4">
        <div className="flex flex-col">
          <h4 className="text-amber-500 font-bold">{movie.title}</h4>
          <span className="text-sm text-zinc-100">Title</span>
        </div>
        <div className="flex flex-col">
          <h4 className="text-amber-500 font-bold">{movie.year}</h4>
          <span className="text-sm text-zinc-100">Year</span>
        </div>
        <div className="flex flex-col">
          <h4 className="text-amber-500 font-bold">{movie.likes}</h4>
          <span className="text-sm text-zinc-100">Likes</span>
        </div>
        <div className="flex flex-col">
          <h4 className="text-amber-500 font-bold">
            {movie.genres.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}
          </h4>
          <span className="text-sm text-zinc-100">Genre</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <a
          href={`/admin/movies/edit/${movie.id}`}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          Edit
        </a>
        <button
          onClick={() => handleDelete(movie.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DashboardMovie;
