'use client';

import { useState } from 'react';
import ProductVariants from './ProductVariants';
import CustomCheckoutButton from './CustomCheckoutButton';

interface ProductInfoProps {
  product: {
    title: string;
    price: string;
    description: string;
    features: string[];
    composition: {
      top: string;
      bottom: string;
      decoration: string;
    };
  };
}

export default function ProductInfo({
  product
}: ProductInfoProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');

  // Dados das variantes do novo produto (apenas tamanhos)
  const variants = [
    {
      id: '9961456173368',
      title: 'Product - Small',
      price: '$39.99',
      available: true,
      option1: 'Small'
    },
    {
      id: '9961456173376',
      title: 'Product - Medium',
      price: '$39.99',
      available: true,
      option1: 'Medium'
    },
    {
      id: '9961456173384',
      title: 'Product - Large',
      price: '$39.99',
      available: true,
      option1: 'Large'
    },
    {
      id: '9961456173392',
      title: 'Product - X-Large',
      price: '$39.99',
      available: true,
      option1: 'X-Large'
    },
    {
      id: '9961456173400',
      title: 'Product - 2X-Large',
      price: '$39.99',
      available: true,
      option1: '2X-Large'
    },
    {
      id: '9961456173408',
      title: 'Product - 3X-Large',
      price: '$39.99',
      available: true,
      option1: '3X-Large'
    }
  ];

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariantId(variantId);
    console.log('Variante selecionada:', variantId);
  };

  return (
    <div className="space-y-6">
      {/* Título e Preço */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>
        <p className="text-2xl font-bold text-black">{product.price}</p>
      </div>

      {/* Seleção de Variantes */}
      <ProductVariants 
        variants={variants}
        onVariantSelect={handleVariantSelect}
      />

      {/* Botão de Compra Customizado */}
      {selectedVariantId && (
        <div className="my-6">
          <CustomCheckoutButton 
            variantId={selectedVariantId}
            productTitle={product.title}
          />
        </div>
      )}

      {/* Descrição */}
      <div>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-3">Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Composição */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-3">Composition</h3>
        <div className="space-y-2 text-gray-700">
          <p><strong>Top:</strong> {product.composition.top}</p>
          <p><strong>Bottom:</strong> {product.composition.bottom}</p>
          <p><strong>Decoration:</strong> {product.composition.decoration}</p>
        </div>
      </div>

      {/* Ícones de Pagamento */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">We accept:</div>
        <div className="flex space-x-2">
          <span className="text-xs font-semibold">Visa</span>
          <span className="text-xs font-semibold">Mastercard</span>
          <span className="text-xs font-semibold">PayPal</span>
          <span className="text-xs font-semibold">Apple Pay</span>
        </div>
      </div>
    </div>
  );
} 