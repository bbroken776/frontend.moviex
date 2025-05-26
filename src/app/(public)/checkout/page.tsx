'use client';

import Container from '@components/(shared)/custom/container';
import ICinema from '@interfaces/iCinema';
import ICinemaSession from '@interfaces/iCinemaSession';
import IMovie from '@interfaces/iMovie';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get('movieId');
  const cinemaId = searchParams.get('cinemaId');
  const sessionId = searchParams.get('sessionId');

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

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [cinema, setCinema] = useState<ICinema | null>(null);
  const [session, setSession] = useState<ICinemaSession | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        
    }
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-mineshaft-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <p className="text-lg mb-4">This page is under construction.</p>
      <p className="text-sm text-zinc-400">Please check back later for updates.</p>
      <div className="mt-8">
        <p>Movie ID: {movieId}</p>
        <p>Cinema ID: {cinemaId}</p>
        <p>Session ID: {sessionId}</p>
      </div>
    </div>
  );
}
