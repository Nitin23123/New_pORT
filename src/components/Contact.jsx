import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiArrowUpRight } from 'react-icons/fi';

const Contact = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('nitin23123@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-16 md:py-48 bg-transparent text-white relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-accent font-mono font-bold tracking-[0.2em] uppercase mb-6">What's Next?</p>
                    <h2 className="text-6xl sm:text-7xl md:text-9xl font-black mb-16 tracking-tighter text-white leading-[0.9]">
                        LET'S WORK<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">TOGETHER</span>
                    </h2>

                    {/* Email Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
                    >
                        {/* Mail link */}
                        <a
                            href="mailto:nitin23123@gmail.com"
                            className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 active:scale-95 active:bg-white/10 transition-all duration-300"
                        >
                            <FiMail className="text-accent text-lg shrink-0" />
                            <span className="font-mono text-sm md:text-base text-white/70 group-hover:text-white transition-colors duration-300 tracking-wide">
                                nitin23123@gmail.com
                            </span>
                            <FiArrowUpRight className="text-white/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-sm" />
                        </a>

                        {/* Copy button */}
                        <motion.button
                            onClick={handleCopy}
                            whileTap={{ scale: 0.94 }}
                            className="px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 active:scale-95 active:bg-white/10 transition-all duration-300 font-mono text-xs tracking-widest text-white/40 hover:text-white/80 uppercase min-w-[90px]"
                        >
                            {copied ? '✓ Copied' : 'Copy'}
                        </motion.button>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                    >
                        <a
                            href="https://www.linkedin.com/in/nitin-tanwar-535018303/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 overflow-hidden font-bold text-white rounded-full bg-white/5 border border-white/10 hover:border-white/30 active:scale-95 transition-all duration-300"
                        >
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-96 group-hover:h-96 opacity-20" />
                            <span className="relative text-lg md:text-xl tracking-wider uppercase">Say Hello on LinkedIn</span>
                            <FiArrowUpRight className="relative text-xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
