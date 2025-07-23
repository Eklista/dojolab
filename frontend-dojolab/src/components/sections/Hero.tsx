import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-950/60 via-zinc-900 via-60% to-black overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Main Content */}
        <div className="text-center space-y-16">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-zinc-200 font-['Sora']"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Somos el{" "}
              <span className="block">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-500 bg-clip-text text-transparent">
                  Dojo
                </span>
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-zinc-500 font-light max-w-2xl mx-auto font-['Inter']"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Donde las ideas se transforman en experiencias digitales extraordinarias
            </motion.p>
          </motion.div>

          {/* Mockup Image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-violet-600/8 via-purple-600/5 to-violet-600/8 rounded-3xl blur-3xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-zinc-900/60 to-black/80 backdrop-blur-sm border border-zinc-800/30 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2672&q=80"
                alt="Workspace Design Mockup"
                className="w-full h-auto object-cover opacity-80"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-zinc-900/20 to-transparent"></div>
              
              {/* Floating UI Elements */}
              <motion.div
                className="absolute top-6 left-6 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/40 rounded-xl px-4 py-2 text-zinc-300 text-sm font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                ✨ En desarrollo
              </motion.div>
              
              <motion.div
                className="absolute top-6 right-6 bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-md border border-violet-500/20 rounded-xl px-4 py-2 text-violet-300 text-sm font-medium"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
              >
                The Dojo Lab
              </motion.div>
              
              <motion.div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md border border-zinc-800/50 rounded-full px-6 py-3 text-zinc-400 text-sm font-medium flex items-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Diseño + Código + Estrategia</span>
              </motion.div>
            </div>
            
            {/* Side Floating Elements */}
            <motion.div
              className="absolute -left-8 top-1/3 w-16 h-16 bg-gradient-to-br from-violet-500/80 to-purple-600/80 rounded-2xl shadow-2xl shadow-violet-500/20 hidden lg:block"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            <motion.div
              className="absolute -right-8 bottom-1/3 w-12 h-12 bg-gradient-to-br from-indigo-500/80 to-violet-600/80 rounded-xl shadow-2xl shadow-indigo-500/20 hidden lg:block"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="flex justify-center pt-12"
          >
            <motion.div
              className="flex flex-col items-center space-y-2 text-zinc-500"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <span className="text-sm font-medium font-['Inter']">Explorar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m0 0l7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};