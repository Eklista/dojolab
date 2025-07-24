// utils/maintenance.ts

const DIRECTUS_URL = 'https://api.thedojolab.com';

export interface MaintenanceModeData {
  id: number;
  status: string;
  user_updated: string | null;
  title: string;
  message: string;
  estimated_time: string;
  contact_email: string;
  is_active: boolean;
  show_contact_email: boolean;
}

export interface DirectusMaintenanceResponse {
  data: MaintenanceModeData;
}

class MaintenanceService {
  private baseUrl: string;
  private cache: { data: MaintenanceModeData | null; timestamp: number } = {
    data: null,
    timestamp: 0
  };
  private cacheTimeout = 5 * 60 * 1000; // 5 minutos

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Obtener estado de mantenimiento con cache
  async getMaintenanceMode(forceRefresh = false): Promise<MaintenanceModeData> {
    const now = Date.now();
    
    // Si hay cache válido y no se fuerza refresh, usar cache
    if (!forceRefresh && this.cache.data && (now - this.cache.timestamp) < this.cacheTimeout) {
      return this.cache.data;
    }

    try {
      const response = await fetch(`${this.baseUrl}/items/maintenance_mode`);
      
      if (!response.ok) {
        throw new Error(`Error fetching maintenance mode: ${response.status}`);
      }

      const result: DirectusMaintenanceResponse = await response.json();
      
      // Actualizar cache
      this.cache = {
        data: result.data,
        timestamp: now
      };

      return result.data;
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

  // Verificar solo si está activo (función rápida)
  async isMaintenanceActive(forceRefresh = false): Promise<boolean> {
    try {
      const data = await this.getMaintenanceMode(forceRefresh);
      return data.is_active;
    } catch (error) {
      console.error('Error checking maintenance status:', error);
      return false; // Por defecto no mantenimiento
    }
  }

  // Limpiar cache manualmente
  clearCache(): void {
    this.cache = { data: null, timestamp: 0 };
  }
}

// Instancia del servicio
export const maintenanceService = new MaintenanceService(DIRECTUS_URL);

// Funciones de conveniencia
export const getMaintenanceMode = (forceRefresh = false) => 
  maintenanceService.getMaintenanceMode(forceRefresh);

export const isMaintenanceActive = (forceRefresh = false) => 
  maintenanceService.isMaintenanceActive(forceRefresh);

export const clearMaintenanceCache = () => 
  maintenanceService.clearCache();