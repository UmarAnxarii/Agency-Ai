import Navbar from './Components/Navbar';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import { Analytics } from '@vercel/analytics/react';
import ProtectedRoute from './Components/ProtectedRoute';
import Auth from './Pages/Auth';

// Lazy load all pages
const Home = lazy(() => import('./Pages/Home'));
const Projects = lazy(() => import('./Components/Projects'));
const Services = lazy(() => import('./Components/Services'));
const Contact = lazy(() => import('./Components/Contact'));

// Loading spinner
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className='min-h-screen dark:bg-black'>
      <Routes>

        {/* Public Route - Login/Signup */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes - require login */}
        <Route path="/*" element={
          <ProtectedRoute>
            <Navbar theme={theme} setTheme={setTheme} />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
            <Footer />
            <Analytics />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  );
}

export default App;