import React from 'react';
import { RingLoader } from 'react-spinners';

const LoadingPage = () => {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-6 text-center">
            {/* Spinner Container with soft halo effect */}
            <div className="relative flex items-center justify-center p-6 rounded-full bg-orange-500/5 dark:bg-orange-500/10 mb-6">
                <RingLoader size={70} color="#f97316" />
            </div>

            {/* Animated Loading Text */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-slate-800 dark:text-slate-100 animate-pulse">
                Preparing Something Delicious...
            </h1>
            
            {/* Subtitle / Helper Text */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
                Please wait a moment while we load your content.
            </p>
        </div>
    );
};

export default LoadingPage;