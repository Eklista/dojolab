import { useState } from "react";
import { motion } from "framer-motion";

interface WorkCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  featured_image: string;
  video_url?: string;
  className?: string;
}

export const WorkCard = ({
  title,
  description,
  category,
  featured_image,
  className = ""
}: WorkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`cursor-pointer group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-900 mb-6">
        <motion.img
          src={featured_image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.02 : 1
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Category overlay */}
        <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 text-brutal-caption text-xs">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <motion.h3 
          className="text-brutal-title text-xl lg:text-2xl text-white leading-tight"
          animate={{ 
            x: isHovered ? 4 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-brutal-body text-sm lg:text-base text-gray-400 leading-relaxed"
          animate={{ 
            x: isHovered ? 4 : 0
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};