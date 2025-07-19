'use client';

import { useState, useEffect } from 'react';

interface Variant {
  id: string;
  title: string;
  price: string;
  available: boolean;
  option1?: string; // Tamanho
}

interface ProductVariantsProps {
  variants: Variant[];
  onVariantSelect: (variantId: string) => void;
}

export default function ProductVariants({ variants, onVariantSelect }: ProductVariantsProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Extrair opções únicas de tamanho
  const sizes = [...new Set(variants.map(v => v.option1).filter(Boolean))];

  // Encontrar variante baseada na seleção
  const findSelectedVariant = () => {
    return variants.find(v => 
      v.option1 === selectedSize &&
      v.available
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const variant = variants.find(v => 
      v.option1 === size &&
      v.available
    );
    if (variant) {
      onVariantSelect(variant.id);
    }
  };

  // Selecionar primeira variante disponível por padrão
  useEffect(() => {
    const firstAvailable = variants.find(v => v.available);
    if (firstAvailable && !selectedSize) {
      onVariantSelect(firstAvailable.id);
      setSelectedSize(firstAvailable.option1 || '');
    }
  }, [variants, selectedSize, onVariantSelect]);

  return (
    <div className="space-y-4">
      {/* Seleção de Tamanho */}
      {sizes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanho
          </label>
          <select
            value={selectedSize}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Selecione um tamanho</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Preço da variante selecionada */}
      {findSelectedVariant() && (
        <div className="text-lg font-semibold text-gray-900">
          {findSelectedVariant()?.price}
        </div>
      )}
    </div>
  );
} 