'use client';

import Container from '@components/(shared)/custom/container';
import CheckoutDisplay from '@components/public/checkout';
import ICinema from '@interfaces/iCinema';
import ICinemaSession from '@interfaces/iCinemaSession';
import IMovie from '@interfaces/iMovie';
import apiServer from '@services/apiServer';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const movieId = Number(searchParams.get('movieId'));
  const cinemaId = Number(searchParams.get('cinemaId'));
  const sessionId = Number(searchParams.get('sessionId'));

  const isValid = movieId && cinemaId && sessionId;
  if (!isValid) {
    return (
      <Container className="min-h-screen flex flex-col text-center items-center justify-center gap-2">
        <h1
          className={`text-4xl md:text-7xl text-amber-400 font-bold`}
          style={{
            textShadow: '4px 4px 10px rgba(255, 255, 255, 0.1)',
          }}
        >
          INVALID CHECKOUT
        </h1>
        <span className="max-w-[500px] text-amber-50/50 text-sm md:text-lg font-light">
          The checkout information you provided is invalid or incomplete. Please try again.
        </span>
        <a
          href="/"
          className="mt-4 text-amber-50/50 py-2 px-6 border-[1px] border-amber-400 rounded hover:bg-amber-400/30 hover:text-white hover:font-bold md:hover:px-8 md:hover:gap-4 transition-all ease-in-out duration-300"
        >
          Go Back!
        </a>
      </Container>
    );
  }

  const [uMovie, setMovie] = useState<IMovie | null>(null);
  const [uCinema, setCinema] = useState<ICinema | null>(null);
  const [uSession, setSession] = useState<ICinemaSession | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { movie, cinema, session },
        } = await apiServer.post('/checkout', {
          movieId,
          cinemaId,
          sessionId,
        });

        setMovie(movie);
        setCinema(cinema);
        setSession(session);
      } catch (error) {
        console.error('Error fetching checkout data:', error);
      }
    };

    fetchData();
  }, [uMovie == null]);

  return (
    <Container className="min-h-screen mt-20">
      {uMovie && uCinema && uSession ? (
        <CheckoutDisplay movie={uMovie} cinema={uCinema} session={uSession} />
      ) : (
        <div className="animate-pulse max-w-4xl mx-auto p-6 bg-mineshaft-900 rounded-lg space-y-6">
          <div className="h-48 bg-mineshaft-700 rounded-md"></div>
          <div className="h-8 bg-mineshaft-700 rounded w-2/3 mx-auto"></div>
          <div className="space-y-4">
            <div className="h-6 bg-mineshaft-700 rounded w-1/2 mx-auto"></div>
            <div className="h-6 bg-mineshaft-700 rounded w-1/3 mx-auto"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-mineshaft-700 rounded w-full"></div>
            <div className="h-4 bg-mineshaft-700 rounded w-5/6"></div>
            <div className="h-4 bg-mineshaft-700 rounded w-3/4"></div>
          </div>
        </div>
      )}
    </Container>
  );
}
