import { motion } from "framer-motion";
import { WorkCard } from "../WorkCard";

// Mock data expandido - después viene de Directus
const mockWorks = [
  {
    id: "1",
    title: "FINTECH APP",
    description: "Aplicación móvil para gestión financiera personal con UX centrada en simplicidad y seguridad.",
    category: "UX/UI",
    featured_image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: "2", 
    title: "CORPORATE WEBSITE",
    description: "Sitio web corporativo con enfoque en performance y experiencia de usuario moderna.",
    category: "WEB DEV",
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
  },
  {
    id: "3",
    title: "BRAND IDENTITY",
    description: "Identidad visual completa para startup tecnológica, desde logo hasta guidelines de marca.",
    category: "BRANDING", 
    featured_image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4"
  },
  {
    id: "4",
    title: "E-COMMERCE PLATFORM", 
    description: "Plataforma de comercio electrónico con sistema de pagos integrado y panel administrativo.",
    category: "FULL STACK",
    featured_image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: "5",
    title: "MOBILE BANKING",
    description: "App bancaria con énfasis en seguridad biométrica y transacciones instantáneas.",
    category: "MOBILE",
    featured_image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  },
  {
    id: "6",
    title: "CRYPTO DASHBOARD",
    description: "Dashboard para trading de criptomonedas con análisis en tiempo real.",
    category: "WEB APP",
    featured_image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2132&q=80",
    video_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  }
];

export const Works = () => {
  return (
    <section className="bg-black py-4 lg:py-20">
      <div className="max-w-[96%] lg:max-w-[95%] xl:max-w-[90%] mx-auto px-3">
        
        {/* Section Header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <motion.span 
            className="text-brutal-caption text-lime-400 tracking-[0.2em] block mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Portfolio / Showcase
          </motion.span>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-brutal-hero text-4xl lg:text-6xl xl:text-7xl text-white leading-none">
              SELECTED<br />
              <span className="text-lime-400">WORKS</span>
            </h2>
            
            <div className="lg:max-w-md">
              <p className="text-brutal-body text-lg text-gray-400 leading-relaxed">
                Una selección de nuestros proyectos más destacados que demuestran 
                nuestra capacidad y enfoque.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Works Grid - Layout Brutalista Balanceado */}
        <div className="space-y-8 lg:space-y-12">
          
          {/* Fila 1: 3 columnas iguales más balanceadas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <WorkCard {...mockWorks[0]} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <WorkCard {...mockWorks[1]} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <WorkCard {...mockWorks[2]} />
            </motion.div>
          </div>

          {/* Separador Visual */}
          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          {/* Fila 2: 3 columnas iguales */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <WorkCard {...mockWorks[3]} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <WorkCard {...mockWorks[4]} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <WorkCard {...mockWorks[5]} />
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {[
            { number: "50+", label: "Proyectos" },
            { number: "25+", label: "Clientes" },
            { number: "3", label: "Años" },
            { number: "100%", label: "Satisfacción" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
            >
              <div className="text-brutal-hero text-3xl lg:text-4xl text-lime-400 mb-2">
                {stat.number}
              </div>
              <div className="text-brutal-caption text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Works CTA */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.button
            className="bg-lime-400 text-black px-8 py-4 text-brutal-subtitle text-sm hover:bg-white transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "8px 8px 0px rgba(132, 204, 22, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            VER TODOS LOS TRABAJOS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};