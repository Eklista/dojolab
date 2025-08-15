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
      active: "text-green-700 bg-green-100 border-green-200",
      pending: "text-yellow-700 bg-yellow-100 border-yellow-200",
      cancelled: "text-red-700 bg-red-100 border-red-200",
      expired: "text-gray-700 bg-gray-100 border-gray-200"
    };
    return colors[status as keyof typeof colors] || colors.expired;
  };

  const getPlanTypeColor = (planType: string) => {
    return planType === 'paid' 
      ? "text-blue-700 bg-blue-100 border-blue-200" 
      : "text-gray-700 bg-gray-100 border-gray-200";
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
          <div className="w-8 h-8 border-2 border-gray-200 border-t-[#c9f31d] rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm text-body">Cargando suscripciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-red-100 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-gray-900 text-lg font-semibold mb-2 text-subheading">Error al cargar</h3>
          <p className="text-gray-600 mb-4 text-body">{error}</p>
          <button 
            onClick={fetchSubscriptions}
            className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-200 text-caption font-medium"
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
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-heading">Suscripciones</h1>
            <p className="text-gray-600 text-body">Gestión de servicios y suscripciones activas</p>
          </div>
          <button 
            onClick={fetchSubscriptions}
            className="bg-[#c9f31d] text-gray-900 px-6 py-3 rounded-full hover:bg-[#b8e019] transition-all duration-200 flex items-center space-x-2 shadow-card hover:shadow-card-hover hover-lift text-caption font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Actualizar</span>
          </button>
        </div>
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
            color: "blue",
            icon: "📊"
          },
          {
            label: "Activas",
            value: subscriptions.filter(s => s.status === 'active').length,
            color: "green",
            icon: "✅"
          },
          {
            label: "Pendientes",
            value: subscriptions.filter(s => s.status === 'pending').length,
            color: "yellow",
            icon: "⏳"
          },
          {
            label: "Costo Total",
            value: `${subscriptions.filter(s => s.status === 'active').reduce((acc, s) => acc + parseFloat(s.cost), 0).toFixed(2)}`,
            color: "purple",
            icon: "💰"
          }
        ].map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card hover:shadow-card-hover hover-lift transition-smooth"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 text-subheading">{stat.value}</p>
                <p className="text-sm text-gray-600 text-caption">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Subscriptions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 text-subheading">Lista de Suscripciones</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-gray-700 text-sm font-semibold text-caption">Servicio</th>
                <th className="text-left px-6 py-4 text-gray-700 text-sm font-semibold text-caption">Estado</th>
                <th className="text-left px-6 py-4 text-gray-700 text-sm font-semibold text-caption">Plan</th>
                <th className="text-left px-6 py-4 text-gray-700 text-sm font-semibold text-caption">Ciclo</th>
                <th className="text-left px-6 py-4 text-gray-700 text-sm font-semibold text-caption">Costo</th>
                <th className="text-left px-6 py-4 text-gray-700 text-sm font-semibold text-caption">Renovación</th>
                <th className="text-left px-6 py-4 text-gray-700 text-sm font-semibold text-caption">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscriptions.map((subscription, index) => (
                <motion.tr
                  key={subscription.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900 font-medium text-caption">{subscription.service_name}</p>
                      <p className="text-gray-500 text-xs text-body">ID: {subscription.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPlanTypeColor(subscription.plan_type)}`}>
                      {subscription.plan_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 text-body">{subscription.billing_cycle}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium text-caption">{formatCurrency(subscription.cost)}</td>
                  <td className="px-6 py-4 text-gray-900 text-body">{formatDate(subscription.renewal_date)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(subscription)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-full transition-all duration-200 text-caption font-medium"
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
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md shadow-card"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 text-subheading">Detalles de Suscripción</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-2xl transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <label className="text-gray-600 text-sm text-caption">Servicio</label>
                  <p className="text-gray-900 font-medium text-body">{selectedSubscription.service_name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <label className="text-gray-600 text-sm text-caption">Estado</label>
                    <p className="text-gray-900 text-body">{selectedSubscription.status}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <label className="text-gray-600 text-sm text-caption">Tipo de Plan</label>
                    <p className="text-gray-900 text-body">{selectedSubscription.plan_type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <label className="text-gray-600 text-sm text-caption">Ciclo de Facturación</label>
                    <p className="text-gray-900 text-body">{selectedSubscription.billing_cycle}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <label className="text-gray-600 text-sm text-caption">Costo</label>
                    <p className="text-gray-900 font-medium text-body">{formatCurrency(selectedSubscription.cost)}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl">
                  <label className="text-gray-600 text-sm text-caption">Fecha de Renovación</label>
                  <p className="text-gray-900 text-body">{formatDate(selectedSubscription.renewal_date)}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl">
                  <label className="text-gray-600 text-sm text-caption">Fecha de Creación</label>
                  <p className="text-gray-900 text-body">{formatDate(selectedSubscription.date_created)}</p>
                </div>

                {selectedSubscription.date_updated && (
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <label className="text-gray-600 text-sm text-caption">Última Actualización</label>
                    <p className="text-gray-900 text-body">{formatDate(selectedSubscription.date_updated)}</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-200 text-caption font-medium"
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