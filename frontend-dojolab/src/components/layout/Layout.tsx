import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  title: string;
}

export const Layout = ({ children, activeView, onViewChange, title }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          activeView={activeView} 
          onViewChange={onViewChange}
          isCollapsed={sidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="relative w-64">
            <Sidebar 
              activeView={activeView} 
              onViewChange={(view) => {
                onViewChange(view);
                setMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar 
          title={title}
          onToggleSidebar={toggleMobileSidebar}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-black">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar Toggle Button for Desktop */}
      <button
        onClick={toggleSidebar}
        className="hidden lg:block fixed top-4 left-4 z-40 p-2 bg-gray-800 border border-white/10 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        style={{ 
          left: sidebarCollapsed ? '80px' : '272px',
          transition: 'left 0.3s ease'
        }}
      >
        <svg 
          className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
};