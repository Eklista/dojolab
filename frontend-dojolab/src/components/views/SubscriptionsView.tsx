import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiClient } from "../../utils/api-client";
import type { Subscription } from "../../types";

export const SubscriptionsView = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiClient = getApiClient();
      const data = await apiClient.getSubscriptions();
      setSubscriptions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading subscriptions');
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "text-green-400 bg-green-500/10 border-green-500/20",
      pending: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      cancelled: "text-red-400 bg-red-500/10 border-red-500/20",
      expired: "text-gray-400 bg-gray-500/10 border-gray-500/20"
    };
    return colors[status as keyof typeof colors] || colors.expired;
  };

  const getPlanTypeColor = (planType: string) => {
    return planType === 'paid' 
      ? "text-blue-400 bg-blue-500/10" 
      : "text-gray-400 bg-gray-500/10";
  };

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return num === 0 ? 'Gratis' : `$${num.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openModal = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSubscription(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/60 text-sm">Cargando suscripciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">Error al cargar</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={fetchSubscriptions}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Suscripciones</h1>
          <p className="text-gray-400">Gestión de servicios y suscripciones activas</p>
        </div>
        <button 
          onClick={fetchSubscriptions}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Actualizar</span>
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Total",
            value: subscriptions.length,
            color: "blue"
          },
          {
            label: "Activas",
            value: subscriptions.filter(s => s.status === 'active').length,
            color: "green"
          },
          {
            label: "Pendientes",
            value: subscriptions.filter(s => s.status === 'pending').length,
            color: "yellow"
          },
          {
            label: "Costo Total",
            value: `${subscriptions.filter(s => s.status === 'active').reduce((acc, s) => acc + parseFloat(s.cost), 0).toFixed(2)}`,
            color: "purple"
          }
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 rounded-lg border border-white/10 p-4">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Subscriptions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-900 rounded-lg border border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Lista de Suscripciones</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/20">
              <tr>
                <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Servicio</th>
                <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Estado</th>
                <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Plan</th>
                <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Ciclo</th>
                <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Costo</th>
                <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Renovación</th>
                <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <motion.tr
                  key={subscription.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: subscription.id * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{subscription.service_name}</p>
                      <p className="text-gray-400 text-sm">ID: {subscription.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlanTypeColor(subscription.plan_type)}`}>
                      {subscription.plan_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{subscription.billing_cycle}</td>
                  <td className="px-6 py-4 text-white font-medium">{formatCurrency(subscription.cost)}</td>
                  <td className="px-6 py-4 text-white">{formatDate(subscription.renewal_date)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(subscription)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Ver detalles
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedSubscription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-gray-900 border border-white/10 rounded-lg p-6 w-full max-w-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Detalles de Suscripción</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Servicio</label>
                  <p className="text-white font-medium">{selectedSubscription.service_name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Estado</label>
                    <p className="text-white">{selectedSubscription.status}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Tipo de Plan</label>
                    <p className="text-white">{selectedSubscription.plan_type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Ciclo de Facturación</label>
                    <p className="text-white">{selectedSubscription.billing_cycle}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Costo</label>
                    <p className="text-white font-medium">{formatCurrency(selectedSubscription.cost)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Fecha de Renovación</label>
                  <p className="text-white">{formatDate(selectedSubscription.renewal_date)}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Fecha de Creación</label>
                  <p className="text-white">{formatDate(selectedSubscription.date_created)}</p>
                </div>

                {selectedSubscription.date_updated && (
                  <div>
                    <label className="text-gray-400 text-sm">Última Actualización</label>
                    <p className="text-white">{formatDate(selectedSubscription.date_updated)}</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};