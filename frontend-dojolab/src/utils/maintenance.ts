import { getApiClient } from './api-client';
import type { MaintenanceModeData } from '../types';

class MaintenanceService {
  private cache: { data: MaintenanceModeData | null; timestamp: number } = {
    data: null,
    timestamp: 0
  };
  private cacheTimeout = 5 * 60 * 1000; // 5 minutos

  async getMaintenanceMode(forceRefresh = false): Promise<MaintenanceModeData> {
    const now = Date.now();
    
    // Si hay cache válido y no se fuerza refresh, usar cache
    if (!forceRefresh && this.cache.data && (now - this.cache.timestamp) < this.cacheTimeout) {
      return this.cache.data;
    }

    try {
      const apiClient = getApiClient();
      const data = await apiClient.getMaintenanceMode();
      
      // Actualizar cache
      this.cache = {
        data,
        timestamp: now
      };

      return data;
    } catch (error) {
      console.error('Error fetching maintenance mode:', error);
      
      // Si hay cache, usarlo como fallback
      if (this.cache.data) {
        console.warn('Using cached maintenance data due to fetch error');
        return this.cache.data;
      }
      
      // Fallback por defecto (mantenimiento desactivado)
      return {
        id: 1,
        status: 'published',
        user_updated: null,
        title: 'Sitio en Mantenimiento',
        message: 'Estamos trabajando en mejorar tu experiencia.',
        estimated_time: 'Volveremos pronto',
        contact_email: 'hola@thedojolab.com',
        is_active: false,
        show_contact_email: true
      };
    }
  }

  async isMaintenanceActive(forceRefresh = false): Promise<boolean> {
    try {
      const data = await this.getMaintenanceMode(forceRefresh);
      return data.is_active;
    } catch (error) {
      console.error('Error checking maintenance status:', error);
      return false;
    }
  }

  clearCache(): void {
    this.cache = { data: null, timestamp: 0 };
  }
}

// Singleton instance
const maintenanceService = new MaintenanceService();

export { maintenanceService };
export const getMaintenanceMode = (forceRefresh = false) => 
  maintenanceService.getMaintenanceMode(forceRefresh);

export const isMaintenanceActive = (forceRefresh = false) => 
  maintenanceService.isMaintenanceActive(forceRefresh);

export const clearMaintenanceCache = () => 
  maintenanceService.clearCache();