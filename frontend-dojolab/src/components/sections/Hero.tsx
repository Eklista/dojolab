import { motion } from "framer-motion";
import { Card } from "../ui/Card";

export const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 md:pt-28 pb-24 md:pb-28 px-3 sm:px-4">
      <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] h-[calc(100vh-14rem)]">
        {/* Cards Grid - Full Viewport Height */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-12 gap-4 sm:gap-6 h-full"
        >
          {/* Featured Card - Full Width Top Row */}
          <Card
            size="full"
            title="3D shapes and textured shapes"
            subtitle="3D shapes / textured shapes"
            backgroundImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80"
            gradient="from-black/60 via-gray-900/40 to-black/70"
            badge="MORE"
            className="row-span-2"
          />

          {/* Bottom Row - Three Cards */}
          <Card
            size="medium"
            title="Textures for your projects"
            subtitle="Textures / 3D textures"
            backgroundImage="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            gradient="from-indigo-900/60 via-purple-900/40 to-black/70"
            badge="MORE"
            className="row-span-1"
          />

          <Card
            size="medium"
            title="B-Mockups: MacBook 16 Pro"
            subtitle="Main / Devices Mockups"
            backgroundImage="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            gradient="from-orange-900/60 via-red-900/40 to-black/70"
            badge="MORE"
            className="row-span-1"
          />

          <Card
            size="medium"
            title="A-Mockups: iPhone 14 Pro"
            subtitle="Main / Devices Mockups"
            backgroundImage="https://images.unsplash.com/photo-1592179900824-9540fd1c96d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            gradient="from-blue-900/60 via-indigo-900/40 to-black/70"
            badge="MORE"
            className="row-span-1"
          />
        </motion.div>
      </div>
    </section>
  );
};