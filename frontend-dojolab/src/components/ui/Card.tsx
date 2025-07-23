import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  gradient?: string;
  children?: ReactNode;
  className?: string;
  size?: 'full' | 'large' | 'medium' | 'small';
  effect?: 'glass' | 'solid' | 'minimal';
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  badge?: string;
  footer?: ReactNode;
}

export const Card = ({
  title,
  subtitle,
  backgroundImage,
  gradient = "from-black/40 via-gray-900/30 to-black/60",
  children,
  className = "",
  size = 'medium',
  effect = 'glass',
  onClick,
  href,
  badge}: CardProps) => {
  
  const sizeClasses = {
    full: "col-span-12",
    large: "col-span-12 md:col-span-8",
    medium: "col-span-12 md:col-span-6 lg:col-span-4",
    small: "col-span-12 md:col-span-4"
  };

  const effectClasses = {
    glass: "bg-black/20 backdrop-blur-xl border border-white/10",
    solid: "bg-gray-900/90 border border-gray-700/50",
    minimal: "bg-transparent border border-white/5"
  };

  const heightClasses = {
    full: "h-full",
    large: "h-full",
    medium: "h-full",
    small: "h-full"
  };

  const CardContent = () => (
    <motion.div
      className={`
        relative overflow-hidden rounded-3xl group cursor-pointer
        ${sizeClasses[size]} ${heightClasses[size]} ${effectClasses[effect]}
        ${className}
      `}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: backgroundImage 
          ? `linear-gradient(135deg, ${gradient}), url(${backgroundImage})`
          : `linear-gradient(135deg, ${gradient})`
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 ease-out"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:opacity-80 transition-opacity duration-500`} />

      {/* Glass Effect Overlay */}
      <motion.div
        className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
        whileHover={{ 
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
        }}
      />

      {/* 3D Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-violet-600/10 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        whileHover={{ scale: 1.1 }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          {subtitle && (
            <motion.span
              className="text-sm font-medium text-gray-300 font-['Inter']"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.span>
          )}

          {badge && (
            <motion.button
              className="text-sm font-medium text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {badge}
            </motion.button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end space-y-4">
          {title && (
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white font-['Sora'] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h3>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
};