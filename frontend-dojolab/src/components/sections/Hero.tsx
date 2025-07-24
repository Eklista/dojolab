import { motion } from "framer-motion";
import { useHeroVideo } from "../../hooks/useHeroVideo";
import { VideoPlayer } from "../../components/VideoPlayer";

export const Hero = () => {
  const { video, videoUrl, posterUrl, loading, error } = useHeroVideo();

  return (
    <>
      {/* First Viewport - Title & Description */}
      <section className="h-screen bg-black text-white pt-48 pb-16 px-6 flex flex-col justify-between lg:justify-start">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:justify-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-tight tracking-tight mb-8 lg:mb-16"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
          >
            A CREATIVE STUDIO<br />
            BUILT LIKE A DOJO
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl lg:ml-auto"
          >
            <p className="text-lg md:text-xl leading-relaxed">
              Nos especializamos en branding, UX/UI y desarrollo web 
              para marcas que quieren destacar en el mundo digital.
            </p>
          </motion.div>

          {/* Video for Mobile - shows only on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 lg:hidden"
          >
            <div className="w-full aspect-video">
              {loading ? (
                <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <p className="text-white/60 text-sm">Loading video...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="w-full h-full bg-red-900/20 rounded-lg flex items-center justify-center">
                  <p className="text-red-300 text-sm">Error loading video</p>
                </div>
              ) : (
                <VideoPlayer
                  videoUrl={videoUrl}
                  posterUrl={posterUrl}
                  autoplay={video?.autoplay}
                  muted={video?.muted}
                  loop={video?.loop}
                  controls={video?.show_controls}
                  className="rounded-lg overflow-hidden"
                  fallbackYouTubeId="dQw4w9WgXcQ"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Second Viewport - Video (Desktop Only) */}
      <section className="hidden lg:block h-screen bg-black px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full h-full max-h-[90vh]"
          >
            {loading ? (
              <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <p className="text-white/60">Loading video...</p>
                </div>
              </div>
            ) : error ? (
              <div className="w-full h-full bg-red-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-red-300 text-lg mb-2">Error loading video from Directus</p>
                  <p className="text-red-300/60 text-sm">Using fallback video</p>
                </div>
              </div>
            ) : (
              <VideoPlayer
                videoUrl={videoUrl}
                posterUrl={posterUrl}
                autoplay={video?.autoplay}
                muted={video?.muted}
                loop={video?.loop}
                controls={video?.show_controls}
                className="rounded-lg overflow-hidden"
                fallbackYouTubeId="dQw4w9WgXcQ"
              />
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};