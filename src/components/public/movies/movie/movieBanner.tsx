import React from 'react';

interface MovieBannerProps {
  banner: string;
  title: string;
  children: React.ReactNode;
}

const MovieBanner = ({ banner, title, children }: MovieBannerProps) => (
  <div className="relative w-full mb-20">
    <div className="relative w-full h-[450px] md:h-[500px] overflow-hidden">
      <img src={process.env.API_URL + banner} alt={title} className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-mineshaft-950/70 to-mineshaft-950/90"></div>
    </div>
    {children}
  </div>
);

export default MovieBanner;
