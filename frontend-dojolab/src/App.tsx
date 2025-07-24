import { Home } from "./views/Home";
import { MaintenanceMode } from "./components/MaintenanceMode";
import { useMaintenance } from "./hooks/useMaintenance";

function App() {
  const { maintenanceData, isActive, loading, error } = useMaintenance();

  // Loading state - mostrar un spinner simple
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/60 text-sm">Verificando estado del sitio...</p>
        </div>
      </div>
    );
  }

  // Error state - si falla la verificación, mostrar la app normal
  if (error) {
    console.warn('Maintenance check failed, showing normal app:', error);
    return <Home />;
  }

  // Maintenance mode activo
  if (isActive && maintenanceData) {
    return <MaintenanceMode data={maintenanceData} />;
  }

  // App normal
  return <Home />;
}

export default App;