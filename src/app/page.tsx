'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import LifestyleVideos from '@/components/LifestyleVideos';
import ProductAccordion from '@/components/ProductAccordion';
import CommunityCarousel from '@/components/CommunityCarousel';
import Footer from '@/components/Footer';
import UTMManager from '@/components/UTMManager';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    'https://midnight-muse.shop/cdn/shop/files/112539235W3S_OM_F_100x.jpg?v=1752221588',
    'https://midnight-muse.shop/cdn/shop/files/112539235W3S_OM_B_100x.jpg?v=1752221844',
    'https://midnight-muse.shop/cdn/shop/files/112541415W3S_OM_F_100x.jpg?v=1752221844',
    'https://midnight-muse.shop/cdn/shop/files/112541415W3S_OM_B_100x.jpg?v=1752221844',
    'https://midnight-muse.shop/cdn/shop/files/112539235W3S_OF_DET_100x.jpg?v=1752221844',
    'https://midnight-muse.shop/cdn/shop/files/112539235W3S_OF_F_DGA_100x.jpg?v=1752221844',
    'https://midnight-muse.shop/cdn/shop/files/112541415W3S_OF_F_DGA_100x.jpg?v=1752221844',
    'https://midnight-muse.shop/cdn/shop/files/112541415W3S_OM_S_100x.jpg?v=1752221844',
    'https://midnight-muse.shop/cdn/shop/files/1125414254A2_alt_100x.jpg?v=1752221844',
    'https://midnight-muse.shop/cdn/shop/files/112541415W3S_OF_B_100x.jpg?v=1752221844',
  ];

  const productData = {
    title: 'Glazed Satin Pajama Set',
    price: '£39.99',
    description: 'Wrap yourself in luxury with our bestselling PJs—featuring a glossy sheen and the perfect, relaxed fit.',
    features: [
      'Includes top and bottom',
      'Easy fit',
      'Short-sleeve, button-front top hits below hips',
      'Chest pocket',
      'Shorts with drawstring tie waist',
      '3" inseam',
      'Machine wash',
      'Imported'
    ],
    composition: {
      top: '100% Polyester',
      bottom: '100% Polyester',
      decoration: 'Exclusive of Decoration'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria de Produto */}
          <ProductGallery 
            images={productImages}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
          
          {/* Informações do Produto */}
          <ProductInfo 
            product={productData}
          />
        </div>
        
        {/* Seção de Vídeos Lifestyle */}
        <LifestyleVideos />
        
        {/* Acordeão de Informações */}
        <ProductAccordion product={productData} />
        
        {/* Carrossel da Comunidade */}
        <CommunityCarousel />
      </main>
      
      <Footer />
      <UTMManager />
    </div>
  );
}
