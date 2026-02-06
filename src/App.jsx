import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import 'lenis/dist/lenis.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CanvasSequence from './components/CanvasSequence'
import Loader from './components/Loader'

import Home from './pages/Home'
import TechStack from './pages/TechStack'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import About from './pages/About'

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Lock scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable GSAP's internal lag smoothing for better sync
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [isLoading])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div ref={containerRef} className={`w-full min-h-screen bg-transparent text-white selection:bg-cyan-500 selection:text-black ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>

        {/* 1. Background Animation (Fixed) */}
        <CanvasSequence frameCount={500} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech" element={<TechStack />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </div>
    </>
  )
}

// Navigation Context
import { NavigationProvider } from './context/NavigationContext';
import CinematicTransition from './components/CinematicTransition';

export default function App() {
  return (
    <Router>
      <NavigationProvider>
        <CinematicTransition />
        <AppContent />
      </NavigationProvider>
    </Router>
  )
}
