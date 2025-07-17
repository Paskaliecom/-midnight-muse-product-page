'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

export default function ProductGallery({ images, selectedImage, onImageSelect }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(selectedImage);

  const nextImage = () => {
    const next = (currentImage + 1) % images.length;
    setCurrentImage(next);
    onImageSelect(next);
  };

  const prevImage = () => {
    const prev = currentImage === 0 ? images.length - 1 : currentImage - 1;
    setCurrentImage(prev);
    onImageSelect(prev);
  };

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[currentImage]}
          alt="Product image"
          fill
          className="object-cover"
          priority
        />
        
        {/* Botões de Navegação */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Miniaturas */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImage(index);
              onImageSelect(index);
            }}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              currentImage === index 
                ? 'border-black' 
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
} 