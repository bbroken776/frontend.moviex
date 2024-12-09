import React from 'react';

const MovieSkeletonLoader = () => (
  <div className="relative flex flex-col animate-pulse">
    <div className="relative w-full h-[450px] md:h-[500px] bg-mineshaft-900 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-b from-mineshaft-950/70 to-mineshaft-950/90"></div>
    </div>
    <div className="absolute bottom-12 left-8 md:left-8 px-6 py-4 flex flex-col md:flex-row items-center md:items-start space-y-6 z-10 max-w-6xl mx-auto w-full">
      <div className="hidden md:block w-36 sm:w-48 md:w-64 h-56 sm:h-72 md:h-96 bg-mineshaft-800 rounded"></div>
      <div className="text-white ml-6 flex-1 space-y-4">
        <div className="h-12 w-3/4 bg-mineshaft-800 rounded"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-20 bg-mineshaft-700 rounded"></div>
          <div className="h-6 w-16 bg-mineshaft-700 rounded"></div>
          <div className="h-6 w-24 bg-mineshaft-700 rounded"></div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="h-6 w-12 bg-mineshaft-700 rounded"></div>
          <div className="h-6 w-12 bg-mineshaft-700 rounded"></div>
          <div className="h-6 w-16 bg-mineshaft-700 rounded"></div>
        </div>
        <div className="h-20 w-3/4 bg-mineshaft-800 rounded"></div>
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-mineshaft-700 rounded"></div>
          <div className="h-10 w-32 bg-mineshaft-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieSkeletonLoader;