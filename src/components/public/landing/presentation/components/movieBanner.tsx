import React from 'react';

interface MovieBannerProps {
  banner: string;
  title: string;
}

const MovieBanner = ({ banner, title }: MovieBannerProps) => (
  <div className="relative w-full h-[450px] md:h-[500px] overflow-hidden">
    <img src={`data:image/png;base64, ${banner}`} alt={title} className="h-full w-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mineshaft-950/80"></div>
  </div>
);

export default MovieBanner;
