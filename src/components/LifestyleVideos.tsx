'use client';

import { useState, useEffect } from 'react';

export default function LifestyleVideos() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const videos = [
    'https://cdn.shopify.com/videos/c/o/v/4bd4335db56449ca930a6ce86f51c270.mp4',
    'https://cdn.shopify.com/videos/c/o/v/daadf9de2b0c4e6e9c74f054ab416663.mp4',
    'https://cdn.shopify.com/videos/c/o/v/7dc68d52b7a34c189802db5149bb71b7.mp4'
  ];

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-black mb-2">Midnight Muse Lifestyle</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openVideoModal(video)}
          >
            {isClient && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={video} type="video/mp4" />
              </video>
            )}
            
            {/* Overlay com ícone de play */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg viewBox="0 0 100 100" className="w-8 h-8 text-white">
                  <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="4" fill="rgba(255,255,255,0.2)" />
                  <polygon points="40,30 70,50 40,70" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Vídeo Fullscreen */}
      {selectedVideo && isClient && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors"
            >
              ×
            </button>
            <video
              autoPlay
              controls
              className="w-full h-auto rounded-lg"
            >
              <source src={selectedVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
} 