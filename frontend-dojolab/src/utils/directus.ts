// utils/directus.ts

const DIRECTUS_URL = 'https://api.thedojolab.com';

export interface HeroVideoData {
  id: number;
  status: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  video_file: string;
  poster_image: string;
  title: string;
  description: string;
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  show_controls: boolean;
}

export interface DirectusResponse<T> {
  data: T;
}

export interface DirectusFile {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  filesize: string;
  width?: number;
  height?: number;
  duration?: number;
}

class DirectusClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Obtener datos del hero video
  async getHeroVideo(): Promise<HeroVideoData> {
    try {
      const response = await fetch(`${this.baseUrl}/items/hero_video`);
      
      if (!response.ok) {
        throw new Error(`Error fetching hero video: ${response.status}`);
      }

      const result: DirectusResponse<HeroVideoData> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching hero video:', error);
      throw error;
    }
  }

  // Obtener información de un archivo
  async getFile(fileId: string): Promise<DirectusFile> {
    try {
      const response = await fetch(`${this.baseUrl}/files/${fileId}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching file: ${response.status}`);
      }

      const result: DirectusResponse<DirectusFile> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  }

  // Generar URL del asset
  getAssetUrl(fileId: string): string {
    return `${this.baseUrl}/assets/${fileId}`;
  }

  // Generar URL del asset con transformaciones (para imágenes)
  getAssetUrlWithTransform(fileId: string, params: Record<string, string | number> = {}): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });

    const queryString = searchParams.toString();
    return `${this.baseUrl}/assets/${fileId}${queryString ? `?${queryString}` : ''}`;
  }

  // Obtener hero video completo con URLs de assets
  async getHeroVideoComplete(): Promise<{
    video: HeroVideoData;
    videoUrl: string;
    posterUrl: string;
  }> {
    try {
      const videoData = await this.getHeroVideo();
      
      return {
        video: videoData,
        videoUrl: this.getAssetUrl(videoData.video_file),
        posterUrl: this.getAssetUrl(videoData.poster_image),
      };
    } catch (error) {
      console.error('Error fetching complete hero video:', error);
      throw error;
    }
  }
}

// Instancia del cliente
export const directusClient = new DirectusClient(DIRECTUS_URL);

// Funciones de conveniencia
export const getHeroVideo = () => directusClient.getHeroVideo();
export const getHeroVideoComplete = () => directusClient.getHeroVideoComplete();
export const getAssetUrl = (fileId: string) => directusClient.getAssetUrl(fileId);
export const getFile = (fileId: string) => directusClient.getFile(fileId);