import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-6"
    >
      <motion.div
        className={`mx-auto max-w-7xl bg-zinc-900/20 backdrop-blur-2xl border border-zinc-700/20 rounded-2xl transition-all duration-500 shadow-xl shadow-black/10 ${
          scrolled 
            ? "bg-zinc-900/30 backdrop-blur-3xl border-zinc-600/30 shadow-2xl shadow-black/20" 
            : ""
        }`}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <img
                src="/logo.png"
                alt="The Dojo Lab"
                className="w-8 h-8 object-contain rounded-lg"
              />
            </div>
            <span className="text-white font-bold text-lg tracking-tight font-['Inter']">
              The Dojo Lab
            </span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden lg:flex items-center space-x-8"
          >
            {["Servicios", "Portfolio", "Nosotros"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-zinc-300 hover:text-zinc-100 transition-all duration-300 font-medium text-sm font-['Inter'] relative group"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {item}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            {/* Login Icon */}
            <motion.button
              className="hidden sm:flex items-center justify-center w-10 h-10 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 backdrop-blur-sm transition-all duration-300 rounded-xl border border-zinc-700/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.button>

            <motion.a
              href="mailto:hola@thedojolab.com"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-zinc-200/90 backdrop-blur-sm text-zinc-900 font-semibold text-sm rounded-xl hover:bg-zinc-100/95 transition-all duration-300 font-['Inter'] shadow-lg border border-zinc-300/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.05)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar
              <motion.svg 
                className="ml-2 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};