import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-4 pb-3 sm:pb-4"
    >
      <motion.div
        className="mx-auto w-full max-w-[95%] sm:max-w-[90%] bg-black/20 backdrop-blur-md border border-white/10 rounded-full transition-all duration-700 ease-out"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(20,20,20,0.2) 100%)'
        } as React.CSSProperties}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        <div className="flex items-center justify-between px-6 sm:px-8 py-2 sm:py-3">
          
          {/* Left Section - Privacy Policy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center"
          >
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-all duration-300 text-brutal-caption text-xs px-3 py-1 rounded-full hover:bg-white/5"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Privacy Policy
            </motion.a>
          </motion.div>

          {/* Center Section - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden sm:flex items-center"
          >
            <span className="text-gray-500 text-brutal-caption text-xs">
              © All rights reserved 2025
            </span>
          </motion.div>

          {/* Right Section - Login + Social Icons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            
            {/* Login Button */}
            <motion.button
              className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 rounded-full border border-white/10 group"
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                backgroundColor: "rgba(255,255,255,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.button>

            {/* Social Icons */}
            {[
              { 
                icon: (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.219-.438-.219-1.085c0-1.016.589-1.775 1.323-1.775.623 0 .219.466.219 1.025 0 .624-.397 1.559-.603 2.423-.171.72.361 1.307 1.072 1.307 1.286 0 2.273-1.356 2.273-3.314 0-1.733-1.244-2.943-3.022-2.943-2.060 0-3.265 1.547-3.265 3.147 0 .623.24 1.291.54 1.653.059.072.068.135.05.209-.055.23-.177.705-.201.804-.031.131-.101.158-.233.095-1.286-.599-2.091-2.478-2.091-3.990 0-3.252 2.363-6.243 6.815-6.243 3.579 0 6.360 2.549 6.360 5.957 0 3.557-2.244 6.420-5.356 6.420-1.046 0-2.031-.544-2.365-1.193l-.643 2.449c-.232.896-.859 2.017-1.280 2.702.963.298 1.978.457 3.030.457 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                ),
                href: "#"
              },
              { 
                icon: (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                ),
                href: "#"
              }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="w-7 h-7 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Mobile Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="sm:hidden text-center pb-2"
        >
          <span className="text-gray-500 text-brutal-caption text-xs">
            © All rights reserved 2025
          </span>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};