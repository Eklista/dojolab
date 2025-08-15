import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";

interface NavbarProps {
  title: string;
  onToggleSidebar?: () => void;
}

export const Navbar = ({ title, onToggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="h-16 bg-black border-b border-white/10 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-white text-lg font-semibold">{title}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Notification dot */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <span className="text-white text-sm font-medium">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </span>
              )}
            </div>
            <svg 
              className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-gray-800 border border-white/10 rounded-lg shadow-xl z-50"
              >
                <div className="p-2">
                  {/* Profile */}
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">Perfil</span>
                  </button>

                  {/* Settings */}
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">Configuración</span>
                  </button>

                  <div className="border-t border-white/10 my-2"></div>

                  {/* Logout */}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm">Cerrar Sesión</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};