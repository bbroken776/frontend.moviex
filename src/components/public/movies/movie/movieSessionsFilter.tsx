interface MovieSessionsDisplayFilterProps {
  regions: string[];
  region: string;
  setRegion: (region: string) => void;
}

const MovieSessionsDisplayFilter = ({ regions, region, setRegion }: MovieSessionsDisplayFilterProps) => {
  return (
    <div className="flex flex-col gap-2 items-start bg-mineshaft-900/50 px-6 py-4 rounded shadow-lg">
      <h4 className="text-white text-lg font-semibold border-b-2 border-amber-500 pb-2 px-4">Região</h4>
      <div className="flex gap-6 items-center py-2 px-4 rounded bg-mineshaft-950">
        {regions.map((r, index) => (
          <button
            onClick={() => setRegion(r)}
            key={index}
            className={`px-2 py-1 rounded font-bold text-sm transition-colors ease-in-out duration-300 ${
              region == r ? 'bg-amber-500/10 text-amber-500' : 'bg-transparent text-zinc-100'
            } hover:bg-amber-500/20 hover:text-amber-500`}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieSessionsDisplayFilter;
