import { motion } from "framer-motion";
import { useHeroVideo } from "../../hooks/useHeroVideo";
import { VideoPlayer } from "../../components/VideoPlayer";

export const Hero = () => {
  const { video, videoUrl, posterUrl, loading, error } = useHeroVideo();

  return (
    <>
      {/* First Viewport - Title & Description */}
      <section className="h-screen bg-black text-white pt-32 md:pt-28 lg:pt-48 pb-8 lg:pb-16 px-3">
        <div className="max-w-[96%] lg:max-w-[95%] xl:max-w-[90%] mx-auto w-full flex-1 flex flex-col lg:justify-center h-full">
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-brutal-hero text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] mb-12 lg:mb-16"
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
            <p className="text-brutal-body text-lg md:text-xl leading-relaxed">
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
            <div className="w-full min-h-[300px] max-h-[60vh] bg-black rounded-lg overflow-hidden flex items-center justify-center">
              {loading ? (
                <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <p className="text-brutal-body text-white/60 text-sm">Loading video...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="w-full h-full bg-red-900/20 rounded-lg flex items-center justify-center">
                  <p className="text-brutal-body text-red-300 text-sm">Error loading video</p>
                </div>
              ) : (
                <VideoPlayer
                  videoUrl={videoUrl}
                  posterUrl={posterUrl}
                  autoplay={video?.autoplay}
                  muted={video?.muted}
                  loop={video?.loop}
                  controls={video?.show_controls}
                  className="w-full h-full"
                  fallbackYouTubeId="dQw4w9WgXcQ"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Second Viewport - Video (Desktop Only) */}
      <section className="hidden lg:block h-screen bg-black px-3">
        <div className="max-w-[96%] lg:max-w-[95%] xl:max-w-[90%] mx-auto h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full h-full max-h-[90vh] bg-black rounded-lg overflow-hidden flex items-center justify-center"
          >
            {loading ? (
              <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <p className="text-brutal-body text-white/60">Loading video...</p>
                </div>
              </div>
            ) : error ? (
              <div className="w-full h-full bg-red-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-brutal-body text-red-300 text-lg mb-2">Error loading video from Directus</p>
                  <p className="text-brutal-body text-red-300/60 text-sm">Using fallback video</p>
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
                className="w-full h-full"
                fallbackYouTubeId="dQw4w9WgXcQ"
              />
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};