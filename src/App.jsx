import Navbar from './Components/Navbar';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Projects from './Components/Projects';
import Services from './Components/Services';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className='min-h-screen dark:bg-black'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            {/* Only show home page sections here */}
          </>
        }/>
        <Route path="/about" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;