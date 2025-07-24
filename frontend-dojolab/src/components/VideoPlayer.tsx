// components/VideoPlayer.tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoUrl: string | null;
  posterUrl: string | null;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  fallbackYouTubeId?: string;
}

export const VideoPlayer = ({
  videoUrl,
  posterUrl,
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
  className = "",
  fallbackYouTubeId = "dQw4w9WgXcQ"
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && autoplay) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing video:', error);
        }
      };
      playVideo();
    }
  }, [videoUrl, autoplay]);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('Error loading video from Directus');
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // Si no hay videoUrl o hay error, mostrar fallback de YouTube
  if (!videoUrl || hasError) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${fallbackYouTubeId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${fallbackYouTubeId}&controls=${controls ? 1 : 0}&showinfo=0&rel=0&iv_load_policy=3`}
          title="Video Fallback"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {hasError && (
          <div className="absolute top-4 left-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 px-3 py-1 rounded text-sm">
            Using fallback video
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black flex items-center justify-center z-10"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p className="text-white text-sm">Loading video...</p>
          </div>
        </motion.div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={posterUrl || undefined}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        preload="metadata"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause Overlay (solo si no hay controles) */}
      {!controls && !isLoading && (
        <motion.button
          className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center group"
          onClick={() => {
            if (videoRef.current) {
              if (isPlaying) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
              }
            }
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </div>
        </motion.button>
      )}
    </div>
  );
};