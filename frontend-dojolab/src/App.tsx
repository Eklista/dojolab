import { useEffect, useState } from "react";
import { MaintenanceMode } from "./components/MaintenanceMode";
import { Login } from "./components/Login";
import { Layout } from "./components/layout/Layout";
import { DashboardView } from "./components/views/DashboardView";
import { SubscriptionsView } from "./components/views/SubscriptionsView";
import { useMaintenance } from "./hooks/useMaintenance";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { createApiClient } from "./utils/api-client";
import { config } from "./utils/config";

// Inicializar el API client
createApiClient(config.directusUrl);

const DashboardContent = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { maintenanceData, isActive, loading: maintenanceLoading, error } = useMaintenance();
  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    if (config.isDevelopment && isAuthenticated) {
      console.log('🚀 Dashboard iniciado', {
        apiUrl: config.directusUrl,
        version: config.appVersion,
        user: user?.email,
        maintenance: isActive
      });
    }
  }, [isActive, isAuthenticated, user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/60 text-sm">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (maintenanceLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/60 text-sm">Verificando estado del sistema...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn('Error verificando mantenimiento:', error);
  }

  if (isActive && maintenanceData) {
    return <MaintenanceMode data={maintenanceData} />;
  }

  const getPageTitle = () => {
    const titles = {
      home: 'Dashboard',
      subscriptions: 'Suscripciones',
      maintenance: 'Modo Mantenimiento',
      settings: 'Configuración'
    };
    return titles[activeView as keyof typeof titles] || 'Dashboard';
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <DashboardView user={user} />;
      case 'subscriptions':
        return <SubscriptionsView />;
      case 'maintenance':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-4">Modo Mantenimiento</h2>
            <p className="text-gray-400">Gestión del modo mantenimiento en desarrollo...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-white mb-4">Configuración</h2>
            <p className="text-gray-400">Panel de configuración en desarrollo...</p>
          </div>
        );
      default:
        return <DashboardView user={user} />;
    }
  };

  return (
    <Layout
      activeView={activeView}
      onViewChange={setActiveView}
      title={getPageTitle()}
    >
      {renderActiveView()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}

export default App;