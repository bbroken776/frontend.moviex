import ICinema from '@interfaces/iCinema';
import ICinemaSession from '@interfaces/iCinemaSession';
import Link from 'next/link';

interface MovieCinemaProps {
  cinema: ICinema;
}

const MovieCinema = ({ cinema }: MovieCinemaProps) => {
  return (
    <div className="bg-mineshaft-900 p-6 rounded shadow-md my-8">
      <h2 className="text-2xl font-bold text-amber-400">{cinema.name}</h2>
      <p className="text-sm text-zinc-400 mb-4">{cinema.location.toUpperCase()}</p>
      <MovieSessions sessions={cinema.cinemaSessions || []} />
    </div>
  );
};

interface MovieSessionProps {
  session: ICinemaSession;
}

const MovieSession = ({ session }: MovieSessionProps) => {
  return (
    <Link
      href={`/checkout?movieId=${session.movieId}&cinemaId=${session.cinemaId}&sessionId=${session.id}`}
      className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded shadow-md hover:from-gray-700 hover:to-gray-800 hover:scale-105 transition-all duration-300 ease-in-out"
    >
      {session.startTime}:00
    </Link>
  );
};

interface MovieSessionsProps {
  sessions: ICinemaSession[];
}

const MovieSessions = ({ sessions }: MovieSessionsProps) => {
  return (
    <div className="flex gap-4">
      {sessions.map((s, index) => (
        <MovieSession session={s} key={index} />
      ))}
    </div>
  );
};

export default MovieCinema;
