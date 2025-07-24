// components/sections/Works.tsx
import { motion } from "framer-motion";
import { WorkCard } from "../WorkCard";

// Mock data - después viene de Directus
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
  }
];

export const Works = () => {
  return (
    <section className="bg-black py-12 lg:py-20">
      <div className="max-w-[96%] lg:max-w-[95%] xl:max-w-[90%] mx-auto px-3">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black uppercase text-white mb-4 font-inter">
            Selected Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Una selección de nuestros proyectos más destacados
          </p>
        </motion.div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {mockWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <WorkCard {...work} />
            </motion.div>
          ))}
        </div>

        {/* View All Works CTA */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Todos los Trabajos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};