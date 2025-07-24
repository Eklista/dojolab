// hooks/useMaintenance.ts
import { useState, useEffect, useCallback } from 'react';
import { getMaintenanceMode, type MaintenanceModeData } from '../utils/maintenance';

interface UseMaintenanceReturn {
  maintenanceData: MaintenanceModeData | null;
  isActive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useMaintenance = (
  checkInterval: number = 5 * 60 * 1000, // Check every 5 minutes
  enablePolling: boolean = true
): UseMaintenanceReturn => {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceModeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaintenanceMode = useCallback(async (forceRefresh = false) => {
    try {
      setError(null);
      if (forceRefresh) setLoading(true);
      
      const data = await getMaintenanceMode(forceRefresh);
      setMaintenanceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading maintenance mode');
      console.error('Error in useMaintenance:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMaintenanceMode(true);
  }, [fetchMaintenanceMode]);

  // Polling interval
  useEffect(() => {
    if (!enablePolling) return;

    const interval = setInterval(() => {
      fetchMaintenanceMode(false); // Use cache if available
    }, checkInterval);

    return () => clearInterval(interval);
  }, [fetchMaintenanceMode, checkInterval, enablePolling]);

  // Refetch function for manual refresh
  const refetch = useCallback(() => {
    fetchMaintenanceMode(true);
  }, [fetchMaintenanceMode]);

  // Listen for focus events to refetch when user returns to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchMaintenanceMode(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchMaintenanceMode]);

  return {
    maintenanceData,
    isActive: maintenanceData?.is_active ?? false,
    loading,
    error,
    refetch,
  };
};