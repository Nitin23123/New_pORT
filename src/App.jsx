import React, { useEffect, useRef, useState } from 'react'
import 'lenis/dist/lenis.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CanvasSequence from './components/CanvasSequence'
import RevealText from './components/RevealText'
import MagneticButton from './components/MagneticButton'
import Loader from './components/Loader'

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

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

    // Setup Context for cleanup
    const ctx = gsap.context(() => {
      // Experience Timeline Animation
      gsap.from('.experience-line', {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: '.experience-section',
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      })

      // Tech Stack 3D Floating (Simple Parallax)
      const techItems = gsap.utils.toArray('.tech-item')
      techItems.forEach((item, i) => {
        gsap.to(item, {
          y: (i % 2 === 0 ? -20 : 20),
          rotate: (i % 2 === 0 ? 5 : -5),
          scrollTrigger: {
            trigger: item,
            scrub: 1
          }
        })
      })

    }, containerRef)

    return () => {
      // Cleanup
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      ctx.revert()
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div ref={containerRef} className={`w-full min-h-screen bg-transparent text-white selection:bg-cyan-500 selection:text-black ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>

        {/* 1. Background Animation (Fixed) */}
        <CanvasSequence frameCount={500} />

        {/* 2. Hero Section */}
        <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
          <h1 className="font-heading text-6xl md:text-9xl font-bold tracking-tighter text-center px-4 z-10 mix-blend-difference">
            <RevealText delay={0.2}>DESIGN</RevealText>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-800">
              <RevealText delay={0.5}>ENGINEER</RevealText>
            </span>
          </h1>
          <p className="mt-8 font-body text-neutral-400 uppercase tracking-widest text-sm animate-pulse">
            Scroll to Explore
          </p>
        </section>

        {/* 3. Tech Stack Section */}
        <section className="min-h-screen flex items-center justify-center p-20 relative">
          <div className="max-w-4xl w-full">
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-10 text-neutral-200 overflow-hidden">
              <RevealText>TECH STACK</RevealText>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 perspective-1000">
              {/* Placeholders for 3D Floating Elements */}
              {['React', 'Next.js', 'GSAP', 'WebGL', 'Node.js', 'Tailwind', 'Three.js', 'MongoDB'].map((tech) => (
                <div key={tech} className="tech-item aspect-square bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 flex items-center justify-center rounded-2xl hover:bg-neutral-800 transition-colors hover:scale-110 duration-500 cursor-pointer group">
                  <span className="font-body font-bold text-xl text-neutral-400 group-hover:text-white">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Experience Section */}
        <section className="experience-section min-h-screen flex items-center justify-center p-20 relative">
          <div className="max-w-4xl w-full">
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-20 text-right text-neutral-200">
              <RevealText>EXPERIENCE</RevealText>
            </h2>
            <div className="space-y-24 pl-10 ml-10 relative">
              {/* Animated Line */}
              <div className="experience-line absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-800 origin-top"></div>

              {[
                { role: "Senior Frontend Engineer", company: "Tech Corp", year: "2023 - Present" },
                { role: "Creative Developer", company: "Agency Studio", year: "2021 - 2023" },
                { role: "UI/UX Developer", company: "Startup Inc", year: "2019 - 2021" }
              ].map((job, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[49px] top-2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10"></span>
                  <h3 className="text-3xl font-bold text-white max-w-lg"><RevealText>{job.role}</RevealText></h3>
                  <p className="text-xl text-cyan-400 font-mono mt-2">{job.company}</p>
                  <p className="text-neutral-500 mt-1">{job.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Projects Section */}
        <section className="min-h-screen py-32 px-4 md:px-20">
          <h2 className="font-heading text-5xl md:text-8xl font-black mb-32 text-center text-neutral-100/10">
            SELECTED WORKS
          </h2>
          <div className="space-y-64">
            {/* Project 1 */}
            <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
              <div className="w-full md:w-1/2 aspect-video bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 relative group cursor-pointer hover:border-cyan-500/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MagneticButton className="bg-white text-black font-bold px-8 py-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">View Case Study</MagneticButton>
                </div>
              </div>
              <div className="w-full md:w-1/3 space-y-4">
                <h3 className="text-4xl font-bold">Project Alpha</h3>
                <p className="text-neutral-400 text-lg">Next-generation e-commerce experience with 3D product customization.</p>
                <div className="flex gap-4 pt-4">
                  <MagneticButton className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">Live Site</MagneticButton>
                  <MagneticButton className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">GitHub</MagneticButton>
                </div>
              </div>
            </div>

            {/* Project 2 - Reversed */}
            <div className="flex flex-col md:flex-row-reverse gap-10 items-center justify-center">
              <div className="w-full md:w-1/2 aspect-video bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 relative group cursor-pointer hover:border-purple-500/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MagneticButton className="bg-white text-black font-bold px-8 py-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">View Case Study</MagneticButton>
                </div>
              </div>
              <div className="w-full md:w-1/3 space-y-4 text-right md:text-right">
                <h3 className="text-4xl font-bold">Project Beta</h3>
                <p className="text-neutral-400 text-lg">Fintech dashboard with real-time data visualization and WebSockets.</p>
                <div className="flex gap-4 pt-4 justify-end">
                  <MagneticButton className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">Live Site</MagneticButton>
                  <MagneticButton className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">GitHub</MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Contact Me */}
        <section className="h-screen flex items-center justify-center relative bg-gradient-to-t from-cyan-900/20 to-transparent">
          <div className="text-center space-y-8">
            <h2 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter">
              <RevealText>LET'S WORK TOGETHER</RevealText>
            </h2>
            <MagneticButton className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
              hello@nitin.dev
            </MagneticButton>
          </div>
        </section>

      </div>
    </>
  )
}

export default App
