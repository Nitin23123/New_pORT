import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import TargetCursor from './components/TargetCursor';



/**
 * App Component
 * 
 * The root component that orchestrates the entire application.
 * Manages the initial loading state and renders the main application structure.
 * Uses a custom cursor and a single-page scroll layout.
 */
function App() {
    // State to track if the initial loading sequence is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="bg-transparent min-h-screen text-black font-sans selection:bg-black selection:text-white md:cursor-none">
            {/* AnimatePresence handles the exit animation of the loading screen */}
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {/* Background ScrollyCanvas removed for premium static black theme */}

            {/* Main Content Rendered after loading is complete */}
            {!isLoading && (
                <>
                    <CustomCursor />
                    <TargetCursor targetSelector=".cursor-target" />
                    <Navbar />
                    <Hero />
                    <About />
                    <Experience />
                    <Projects />
                    <TechStack />
                    <Contact />
                    <Footer />
                </>
            )}
        </div>
    )
}

export default App
