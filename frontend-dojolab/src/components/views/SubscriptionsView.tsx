import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getApiClient } from "../../utils/api-client";
import type { Subscription } from "../../types";
import { DataTable } from "../ui/DataTable";
import { Modal } from "../ui/Modal";
import { StatsGrid } from "../ui/StatsGrid";
import { StatusBadge } from "../ui/StatusBadge";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";

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

  const getStatusVariant = (status: string) => {
    const variants = {
      active: 'success' as const,
      pending: 'warning' as const,
      cancelled: 'error' as const,
      expired: 'neutral' as const
    };
    return variants[status as keyof typeof variants] || 'neutral';
  };

  const getPlanTypeVariant = (planType: string) => {
    return planType === 'paid' ? 'info' as const : 'neutral' as const;
  };

  // Estadísticas
  const stats = [
    {
      label: "Total",
      value: subscriptions.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      label: "Activas",
      value: subscriptions.filter(s => s.status === 'active').length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: "Pendientes",
      value: subscriptions.filter(s => s.status === 'pending').length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: "Costo Total",
      value: `${subscriptions.filter(s => s.status === 'active').reduce((acc, s) => acc + parseFloat(s.cost), 0).toFixed(2)}`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    }
  ];

  // Columnas de la tabla
  const columns = [
    {
      id: 'service',
      label: 'Servicio',
      accessor: 'service_name' as keyof Subscription,
      render: (value: string, item: Subscription) => (
        <div>
          <p className="text-gray-900 font-medium text-caption">{value}</p>
          <p className="text-gray-500 text-xs text-body">ID: {item.id}</p>
        </div>
      )
    },
    {
      id: 'status',
      label: 'Estado',
      accessor: 'status' as keyof Subscription,
      render: (value: string) => (
        <StatusBadge status={value} variant={getStatusVariant(value)} />
      )
    },
    {
      id: 'plan_type',
      label: 'Plan',
      accessor: 'plan_type' as keyof Subscription,
      render: (value: string) => (
        <StatusBadge status={value} variant={getPlanTypeVariant(value)} />
      )
    },
    {
      id: 'billing_cycle',
      label: 'Ciclo',
      accessor: 'billing_cycle' as keyof Subscription,
      render: (value: string) => (
        <span className="text-gray-900 text-body">{value}</span>
      )
    },
    {
      id: 'cost',
      label: 'Costo',
      accessor: 'cost' as keyof Subscription,
      render: (value: string) => (
        <span className="text-gray-900 font-medium text-caption">{formatCurrency(value)}</span>
      )
    },
    {
      id: 'renewal_date',
      label: 'Renovación',
      accessor: 'renewal_date' as keyof Subscription,
      render: (value: string) => (
        <span className="text-gray-900 text-body">{formatDate(value)}</span>
      )
    },
    {
      id: 'actions',
      label: 'Acciones',
      accessor: (() => null) as any,
      render: (_: any, item: Subscription) => (
        <button
          onClick={() => openModal(item)}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-full transition-all duration-200 text-caption font-medium"
        >
          Ver detalles
        </button>
      )
    }
  ];

  const headerActions = (
    <button 
      onClick={fetchSubscriptions}
      className="bg-[#c9f31d] text-gray-900 px-6 py-3 rounded-full hover:bg-[#b8e019] transition-all duration-200 flex items-center space-x-2 shadow-card hover:shadow-card-hover hover-lift text-caption font-medium"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>Actualizar</span>
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingState message="Cargando suscripciones..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <ErrorState 
          message={error}
          onRetry={fetchSubscriptions}
        />
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
          {headerActions}
        </div>
      </motion.div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Subscriptions Table */}
      <DataTable
        title="Lista de Suscripciones"
        columns={columns}
        data={subscriptions}
        loading={false}
        onRowClick={openModal}
        emptyMessage="No hay suscripciones disponibles"
      />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="Detalles de Suscripción"
        footer={
          <button
            onClick={closeModal}
            className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-200 text-caption font-medium"
          >
            Cerrar
          </button>
        }
      >
        {selectedSubscription && (
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
        )}
      </Modal>
    </div>
  );
};