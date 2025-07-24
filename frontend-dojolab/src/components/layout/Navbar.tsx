import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Servicios", "Trabajos", "Cotización"];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-4 sm:pt-6"
    >
      <motion.div
        className={`mx-auto w-full max-w-[96%] lg:max-w-[95%] xl:max-w-[90%] transition-all duration-700 ease-out ${
          scrolled 
            ? "bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50" 
            : "bg-black/20 backdrop-blur-md border border-white/10"
        } rounded-2xl lg:rounded-full`}
        style={{
          backgroundImage: scrolled 
            ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,20,20,0.4) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(20,20,20,0.2) 100%)'
        } as React.CSSProperties}
      >
        <div className="flex items-center justify-between px-6 sm:px-8 py-2 sm:py-3">
          
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 to-lime-600/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src="/logo.png"
                alt="The Dojo Lab"
                className="relative w-8 h-8 object-contain rounded-lg border border-white/10"
              />
            </motion.div>
            
            {/* Brand Text - visible on larger screens */}
            <motion.span 
              className="hidden md:block text-brutal-subtitle text-white text-sm tracking-[0.1em]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              THE DOJO LAB
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden lg:flex items-center space-x-1"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 text-brutal-subtitle text-xs group rounded-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
              >
                <motion.span 
                  className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <span className="relative z-10">{item}</span>
                
                <motion.span 
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lime-400 group-hover:w-3/4 transition-all duration-300 rounded-full"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            
            {/* CTA Button */}
            <motion.a
              href="mailto:hola@thedojolab.com"
              className="hidden sm:inline-flex items-center px-5 py-2 bg-lime-400 text-black text-brutal-subtitle text-xs hover:bg-white transition-all duration-300 shadow-lg group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "4px 4px 0px rgba(132, 204, 22, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contactar</span>
              <motion.svg 
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden border-t border-white/10"
        >
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 text-brutal-subtitle text-sm rounded-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
            
            <motion.a
              href="mailto:hola@thedojolab.com"
              className="block px-4 py-3 mt-4 bg-lime-400 text-black text-brutal-subtitle text-sm text-center border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20
              }}
              transition={{ delay: 0.4, duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contactar
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};