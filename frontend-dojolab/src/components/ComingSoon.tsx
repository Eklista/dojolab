import { motion } from "framer-motion";

export const ComingSoon = () => {


  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center overflow-hidden px-6">
      {/* Gradiente de fondo dinámico que se mueve */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(132, 204, 22, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(132, 204, 22, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Partículas minimalistas */}
      {[
        { top: "15%", left: "10%", size: "w-2 h-2", delay: 0 },
        { top: "35%", left: "80%", size: "w-1 h-1", delay: 1 },
        { top: "60%", left: "50%", size: "w-1 h-1", delay: 2 },
        { top: "80%", left: "20%", size: "w-2 h-2", delay: 3 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className={`absolute bg-lime-400/60 rounded-full ${p.size} blur-sm`}
          style={{ top: p.top, left: p.left }}
          animate={{ 
            y: [0, -15, 0], 
            opacity: [0.4, 0.8, 0.4] 
          }}
          transition={{
            duration: 6 + i,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Contenido central */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-xl"
      >
        {/* Logo */}
        <motion.img
          src="/logo.png"
          alt="The Dojo Lab Logo"
          className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        />

        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          Estamos construyendo algo increíble
        </motion.h2>

        {/* Subtexto */}
        <motion.p
          className="text-neutral-400 text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        >
          Algo se está cocinando aquí <span className="text-white font-medium">vuelve pronto</span>.
          <br className="hidden md:block" />
          Mientras tanto, afilamos diseño, código y estrategia.
        </motion.p>

        {/* Contacto */}
        <motion.p
          className="text-sm text-neutral-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
        >
          Escríbenos a{" "}
          <a href="mailto:hola@thedojolab.com" className="underline text-white hover:text-lime-400 transition-colors">
            hola@thedojolab.com
          </a>
        </motion.p>
      </motion.section>
    </main>
  );
};
