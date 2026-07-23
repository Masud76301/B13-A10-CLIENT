import Link from 'next/link';
import React from 'react';

const Notfound = () => {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-50/50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-center px-4 transition-colors duration-300">
      
      {/* Container Card */}
      <div className="max-w-md w-full p-8 rounded-3xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-md shadow-xl border border-orange-100 dark:border-gray-700/50 flex flex-col items-center">
        
        {/* Large Styled 404 Header */}
        <span className="text-sm font-semibold tracking-widest text-orange-500 uppercase mb-2">
          Error 404
        </span>
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400">
          404
        </h1>

        {/* Recipe-Themed Illustration Icon */}
        <div className="my-4 text-5xl animate-bounce">
          🍳
        </div>

        {/* Main Message */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Out of the Kitchen!
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-base leading-relaxed">
          Looks like this recipe or page was misplaced, eaten, or does not exist anymore.
        </p>

        {/* Return Button */}
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-full shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Return to Home &rarr;
        </Link>
      </div>

    </div>
  );
};

export default Notfound;