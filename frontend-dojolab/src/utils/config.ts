import type { AppConfig } from '../types';

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value || defaultValue!;
};

export const config: AppConfig = {
  directusUrl: getEnvVar('VITE_DIRECTUS_URL'),
  appName: getEnvVar('VITE_APP_NAME', 'The Dojo Lab Dashboard'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  isDevelopment: getEnvVar('VITE_DEV_MODE', 'false') === 'true',
};

// Validar configuración al inicio
const validateConfig = () => {
  if (!config.directusUrl) {
    throw new Error('VITE_DIRECTUS_URL is required');
  }

  if (!config.directusUrl.startsWith('http')) {
    throw new Error('VITE_DIRECTUS_URL must be a valid URL');
  }
};

validateConfig();