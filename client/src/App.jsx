import React, { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const NoteViewPage = lazy(() => import('./pages/NoteViewPage'));

const FallbackLoader = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#09090b] text-slate-100 font-sans selection:bg-purple-500/30 relative overflow-hidden">
        
        {/* Modern Background Mesh Gradient Elements */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-900/40 to-transparent pointer-events-none"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <Toaster 
            position="bottom-right" 
            toastOptions={{ 
              style: { background: '#18181b', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.08)' } 
            }} 
          />
          
          <Suspense fallback={<FallbackLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notes/:id" element={<NoteViewPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
