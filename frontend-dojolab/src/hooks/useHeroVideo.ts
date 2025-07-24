// hooks/useHeroVideo.ts
import { useState, useEffect } from 'react';
import { getHeroVideoComplete, type HeroVideoData } from '../utils/directus';

interface UseHeroVideoReturn {
  video: HeroVideoData | null;
  videoUrl: string | null;
  posterUrl: string | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useHeroVideo = (): UseHeroVideoReturn => {
  const [video, setVideo] = useState<HeroVideoData | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroVideo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getHeroVideoComplete();
      
      setVideo(data.video);
      setVideoUrl(data.videoUrl);
      setPosterUrl(data.posterUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading video');
      console.error('Error in useHeroVideo:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroVideo();
  }, []);

  const retry = () => {
    fetchHeroVideo();
  };

  return {
    video,
    videoUrl,
    posterUrl,
    loading,
    error,
    retry,
  };
};