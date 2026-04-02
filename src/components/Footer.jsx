/**
 * Footer Component
 * 
 * Simple black footer with copyright, social links, and email.
 */
const Footer = () => {
    return (
        <footer className="bg-black py-12 md:py-20 relative overflow-hidden border-t border-white/10">

            {/* Ambient Background */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center relative z-10">
                {/* Copyright Section */}
                <div className="mb-8 md:mb-0 text-center md:text-left">
                    <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">NITIN TANWAR</h2>
                    <p className="text-muted text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                    <a
                        href="/resume.pdf"
                        download
                        className="group mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 active:scale-95 transition-all duration-300"
                    >
                        <span className="text-xs font-mono text-white/40 group-hover:text-white tracking-widest uppercase transition-colors duration-300">Resume</span>
                        <svg className="w-3 h-3 text-white/20 group-hover:text-accent group-hover:translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-5 sm:gap-8">
                    <a href="mailto:nitin23123@gmail.com" className="text-muted hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">Email</a>
                    <a href="https://www.linkedin.com/in/nitin-tanwar-535018303/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">LinkedIn</a>
                    <a href="https://github.com/Nitin23123" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
