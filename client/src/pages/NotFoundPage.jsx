import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-indigo-600 mb-6 drop-shadow-lg">
        404
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-lg text-slate-400 mb-8 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-md border border-white/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
