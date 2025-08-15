import { motion } from "framer-motion";
import { useMaintenance } from "../../hooks/useMaintenance";
import { config } from "../../utils/config";

interface DashboardViewProps {
  user: any;
}

export const DashboardView = ({ user }: DashboardViewProps) => {
  const { maintenanceData, isActive } = useMaintenance();

  const stats = [
    {
      title: "Estado de la API",
      value: "Conectada",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "green",
      description: "Conexión estable con Directus"
    },
    {
      title: "Modo Mantenimiento",
      value: isActive ? "Activo" : "Inactivo",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: isActive ? "red" : "gray",
      description: maintenanceData?.message || "Sistema funcionando normalmente"
    },
    {
      title: "Versión del Dashboard",
      value: config.appVersion,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2a1 1 0 011 1v3m8-3v3m-8 1h8" />
        </svg>
      ),
      color: "blue",
      description: "Última versión del panel administrativo"
    },
    {
      title: "Sesión de Usuario",
      value: "Activa",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "green",
      description: `Conectado como ${user?.email}`
    }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      green: "text-green-400 bg-green-500/10 border-green-500/20",
      red: "text-red-400 bg-red-500/10 border-red-500/20",
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      gray: "text-gray-400 bg-gray-500/10 border-gray-500/20"
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          Bienvenido, {user?.first_name}
        </h1>
        <p className="text-gray-400">
          Panel de administración de The Dojo Lab
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className={`p-6 rounded-lg border ${getStatColor(stat.color)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${getStatColor(stat.color)}`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
            <p className="text-xs text-gray-500">{stat.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-900 rounded-lg border border-white/10 p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          {[
            {
              action: "Inicio de sesión",
              description: "Sesión iniciada correctamente",
              time: "Hace unos momentos",
              type: "success"
            },
            {
              action: "Verificación de sistema",
              description: "Estado del mantenimiento verificado",
              time: "Hace 5 minutos",
              type: "info"
            },
            {
              action: "Conexión API",
              description: "Conexión establecida con Directus",
              time: "Hace 5 minutos",
              type: "success"
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-400' : 
                activity.type === 'info' ? 'bg-blue-400' : 'bg-gray-400'
              }`} />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{activity.action}</p>
                <p className="text-gray-400 text-xs">{activity.description}</p>
              </div>
              <span className="text-gray-500 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* User Info */}
        <div className="bg-gray-900 rounded-lg border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Información de Usuario</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Nombre:</span>
              <span className="text-white">{user?.first_name} {user?.last_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-white">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rol:</span>
              <span className="text-white">{user?.role?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estado:</span>
              <span className="text-green-400">Activo</span>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-gray-900 rounded-lg border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Información del Sistema</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">API URL:</span>
              <span className="text-white text-sm">{config.directusUrl}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ambiente:</span>
              <span className="text-white">{config.isDevelopment ? 'Desarrollo' : 'Producción'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mantenimiento:</span>
              <span className={`${isActive ? 'text-red-400' : 'text-green-400'}`}>
                {isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Última verificación:</span>
              <span className="text-white text-sm">Hace unos momentos</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};