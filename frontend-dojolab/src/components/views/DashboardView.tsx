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
      color: isActive ? "red" : "green",
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
      green: "text-green-600 bg-green-50 border-green-200",
      red: "text-red-600 bg-red-50 border-red-200",
      blue: "text-blue-600 bg-blue-50 border-blue-200",
      gray: "text-gray-600 bg-gray-50 border-gray-200"
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getIconColor = (color: string) => {
    const colors = {
      green: "text-green-600 bg-green-100",
      red: "text-red-600 bg-red-100",
      blue: "text-blue-600 bg-blue-100",
      gray: "text-gray-600 bg-gray-100"
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
        className="bg-white rounded-2xl p-6 shadow-card border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-heading">
          Bienvenido, {user?.first_name}
        </h1>
        <p className="text-gray-600 text-body">
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
            className={`bg-white rounded-2xl p-6 border shadow-card hover:shadow-card-hover hover-lift transition-smooth ${getStatColor(stat.color)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${getIconColor(stat.color)}`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 text-subheading">{stat.value}</h3>
            <p className="text-sm text-gray-700 mb-2 text-caption font-medium">{stat.title}</p>
            <p className="text-xs text-gray-600 text-body">{stat.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-subheading">Actividad Reciente</h2>
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
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-200">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-medium text-caption">{activity.action}</p>
                  <p className="text-gray-600 text-xs text-body">{activity.description}</p>
                </div>
                <span className="text-gray-500 text-xs text-body">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-subheading">Acciones Rápidas</h3>
          <div className="space-y-3">
            {[
              { 
                label: "Ver Suscripciones", 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ), 
                color: "bg-blue-50 text-blue-600 hover:bg-blue-100" 
              },
              { 
                label: "Estado del Sistema", 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                color: "bg-green-50 text-green-600 hover:bg-green-100" 
              },
              { 
                label: "Configuración", 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ), 
                color: "bg-gray-50 text-gray-600 hover:bg-gray-100" 
              }
            ].map((action, index) => (
              <button key={index} className={`w-full flex items-center space-x-3 p-3 rounded-2xl transition-all duration-200 ${action.color}`}>
                {action.icon}
                <span className="text-sm font-medium text-caption">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* User Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-subheading">Información de Usuario</h3>
          <div className="space-y-4">
            {[
              { label: "Nombre", value: `${user?.first_name} ${user?.last_name}` },
              { label: "Email", value: user?.email },
              { label: "Rol", value: user?.role?.name },
              { label: "Estado", value: "Activo", isStatus: true }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
                <span className="text-gray-600 text-sm text-caption">{item.label}:</span>
                <span className={`text-sm font-medium text-caption ${
                  item.isStatus ? 'text-green-600 bg-green-100 px-2 py-1 rounded-full' : 'text-gray-900'
                }`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-subheading">Información del Sistema</h3>
          <div className="space-y-4">
            {[
              { label: "API URL", value: config.directusUrl },
              { label: "Ambiente", value: config.isDevelopment ? 'Desarrollo' : 'Producción' },
              { label: "Mantenimiento", value: isActive ? 'Activo' : 'Inactivo', isStatus: true, statusColor: isActive ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100' },
              { label: "Última verificación", value: "Hace unos momentos" }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
                <span className="text-gray-600 text-sm text-caption">{item.label}:</span>
                <span className={`text-sm font-medium text-caption ${
                  item.isStatus ? `${item.statusColor} px-2 py-1 rounded-full` : 'text-gray-900'
                } ${index === 0 ? 'text-xs' : ''}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};