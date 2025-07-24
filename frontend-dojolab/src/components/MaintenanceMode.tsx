// components/MaintenanceMode.tsx
import { motion } from "framer-motion";
import type { MaintenanceModeData } from "../utils/maintenance";

interface MaintenanceModeProps {
  data: MaintenanceModeData;
}

export const MaintenanceMode = ({ data }: MaintenanceModeProps) => {
  const {
    title,
    message,
    estimated_time,
    contact_email,
    show_contact_email
  } = data;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto h-screen flex items-center px-6">
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between w-full">
          
          {/* Left Side - Logo + Title */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo con texto */}
            <motion.div
              className="flex items-center space-x-4 mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src="/logo.png"
                alt="The Dojo Lab Logo"
                className="w-12 h-12 object-contain rounded-lg"
              />
              <span className="text-xl font-bold tracking-tight">
                THE DOJO LAB
              </span>
            </motion.div>

            {/* Título principal */}
            <motion.h1
              className="text-5xl xl:text-6xl font-black uppercase leading-tight tracking-tight"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {title}
            </motion.h1>
          </motion.div>

          {/* Right Side - Info */}
          <motion.div
            className="flex-1 max-w-xl pl-16"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-lg text-gray-300 leading-relaxed">
                  {message}
                </p>
              </motion.div>

              {/* Status */}
              <motion.div
                className="border-l-4 border-white pl-6 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                  Estado
                </p>
                <p className="text-xl font-bold text-white">
                  {estimated_time}
                </p>
              </motion.div>

              {/* Contact */}
              {show_contact_email && contact_email && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                    Contacto de emergencia
                  </p>
                  <a
                    href={`mailto:${contact_email}`}
                    className="text-lg text-white hover:text-gray-300 transition-colors duration-200 border-b border-white/30 hover:border-white/60"
                  >
                    {contact_email}
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden w-full">
          <div className="text-center space-y-8 max-w-md mx-auto">
            
            {/* Logo + Brand */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src="/logo.png"
                alt="The Dojo Lab Logo"
                className="w-16 h-16 object-contain rounded-lg mx-auto"
              />
              <p className="text-sm font-medium tracking-wider text-gray-400">
                THE DOJO LAB
              </p>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {title}
            </motion.h1>

            {/* Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-base text-gray-300 leading-relaxed">
                {message}
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">
                    Estado
                  </p>
                  <p className="text-lg font-bold text-white">
                    {estimated_time}
                  </p>
                </div>

                {show_contact_email && contact_email && (
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">
                      Contacto
                    </p>
                    <a
                      href={`mailto:${contact_email}`}
                      className="text-sm text-white hover:text-gray-300 transition-colors duration-200 border-b border-white/30"
                    >
                      {contact_email}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Status Indicator */}
      <motion.div
        className="fixed bottom-6 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-medium text-gray-500">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>Maintenance Mode</span>
        </div>
      </motion.div>

      {/* Auto-refresh notice */}
      <motion.div
        className="fixed bottom-6 right-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-xs text-gray-600 uppercase tracking-wider">
          Verificando cada 5 min
        </p>
      </motion.div>
    </main>
  );
};