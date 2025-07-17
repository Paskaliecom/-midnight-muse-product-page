'use client';

import ShopifyBuyButton from './ShopifyBuyButton';

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



  return (
    <div className="space-y-6">
      {/* Título e Preço */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>
        <p className="text-2xl font-bold text-black">{product.price}</p>
        <div className="my-6">
          <ShopifyBuyButton />
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