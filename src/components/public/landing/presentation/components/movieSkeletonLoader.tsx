const MovieSkeletonLoader = () => (
  <div className="relative flex flex-col space-y-6 animate-pulse">
    <div className="relative w-full h-[450px] md:h-[500px] bg-mineshaft-900 rounded"></div>
    <div className="absolute bottom-12 left-8 md:left-8 flex flex-col items-center md:items-start px-6 py-4 space-y-6 z-10">
      <div className="h-12 w-3/4 bg-mineshaft-800 rounded"></div>
      <div className="flex space-x-3">
        <div className="h-8 w-20 bg-mineshaft-700 rounded"></div>
        <div className="h-8 w-16 bg-mineshaft-800 rounded"></div>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start space-x-3">
        <div className="h-6 w-16 bg-mineshaft-800 rounded"></div>
        <div className="h-6 w-16 bg-mineshaft-800 rounded"></div>
        <div className="h-6 w-16 bg-mineshaft-800 rounded"></div>
      </div>
      <div className="h-6 w-3/4 bg-mineshaft-800 rounded"></div>
    </div>
  </div>
);

export default MovieSkeletonLoader;