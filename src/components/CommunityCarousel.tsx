'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CommunityCarousel() {
  const [currentPosition, setCurrentPosition] = useState(0);

  const communityImages = [
    'https://midnight-muse.shop/cdn/shop/files/1.png?v=1752368690&width=800',
    'https://midnight-muse.shop/cdn/shop/files/pijama_vs.png?v=1752368858&width=800',
    'https://midnight-muse.shop/cdn/shop/files/6.png?v=1752368688&width=800',
    'https://midnight-muse.shop/cdn/shop/files/2.png?v=1752368691&width=800',
    'https://midnight-muse.shop/cdn/shop/files/3.png?v=1752368690&width=800',
    'https://midnight-muse.shop/cdn/shop/files/10.png?v=1752368690&width=800',
    'https://midnight-muse.shop/cdn/shop/files/4.png?v=1752368690&width=800',
    'https://midnight-muse.shop/cdn/shop/files/5.png?v=1752368691&width=800',
    'https://midnight-muse.shop/cdn/shop/files/9.png?v=1752368690&width=800',
  ];

  // Duplicar imagens para criar efeito infinito
  const duplicatedImages = [...communityImages, ...communityImages];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition(prev => {
        const newPosition = prev - 1;
        // Reset quando chegar ao final
        if (newPosition <= -communityImages.length * 200) {
          return 0;
        }
        return newPosition;
      });
    }, 3000); // Move a cada 3 segundos

    return () => clearInterval(interval);
  }, [communityImages.length]);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-black mb-2">MIDNIGHT MUSE COMMUNITY</h3>
          <p className="text-gray-600">
            More than 25,000 girls already live the casual Midnight Muse style. Here are some of them:
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-4" style={{ transform: `translateX(${currentPosition}px)` }}>
            {duplicatedImages.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-48 h-64 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Community member ${index + 1}`}
                  width={192}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-6 space-x-2">
          {communityImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPosition(-index * 200)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.abs(currentPosition) === index * 200 
                  ? 'bg-black' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 