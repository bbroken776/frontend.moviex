interface MoviePosterProps {
    poster: string;
    title: string;
  }
  
  const MoviePoster = ({ poster, title }: MoviePosterProps) => (
    <div className="relative w-full h-[350px] overflow-hidden rounded bg-mineshaft-800">
      <img src={process.env.API_URL + poster} alt={title} className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mineshaft-950/80"></div>
    </div>
  );
  
  export default MoviePoster;