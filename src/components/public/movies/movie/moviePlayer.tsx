import React from 'react';

interface MoviePlayerProps {
  source: string;
}

const MoviePlayer = ({ source }: MoviePlayerProps) => (
  <div className="w-full px-6">
    <div className="w-full max-w-6xl mx-auto bg-black/50 rounded-lg shadow-md animate-slide-up">
      <iframe src={source} allowFullScreen className="w-full h-[575px] rounded" />
    </div>
  </div>
);

export default MoviePlayer;