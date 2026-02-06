import React from 'react';
import MagneticButton from '../components/MagneticButton';
import RevealText from '../components/RevealText';

export default function Contact() {
    return (
        <section className="h-screen flex items-center justify-center relative bg-black text-white bg-linear-to-t from-cyan-900/20 to-transparent">
            <div className="text-center space-y-8">
                <h2 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter">
                    <RevealText>LET'S WORK TOGETHER</RevealText>
                </h2>
                <MagneticButton className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
                    hello@nitin.dev
                </MagneticButton>
            </div>
        </section>
    );
}
