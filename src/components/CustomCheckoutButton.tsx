'use client';

import { useState } from 'react';

interface CustomCheckoutButtonProps {
  variantId: string;
  productTitle: string;
}

export default function CustomCheckoutButton({ variantId, productTitle }: CustomCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      console.log('Criando carrinho customizado com UTMs...');
      console.log('VariantId:', variantId);
      
      // Capturar UTMs da URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams: Record<string, string> = {};
      
      for (const [key, value] of urlParams.entries()) {
        if (key.startsWith('utm_')) {
          utmParams[key] = value;
        }
      }

      console.log('UTMs detectadas:', utmParams);

      // Garantir que o variantId está no formato correto
      const formattedVariantId = variantId.startsWith('gid://') 
        ? variantId 
        : `gid://shopify/ProductVariant/${variantId}`;

      console.log('VariantId formatado:', formattedVariantId);

      // Dados para criar o carrinho
      const cartData = {
        lineItems: [
          {
            variantId: formattedVariantId,
            quantity: 1
          }
        ],
        note: `UTM Source: ${utmParams.utm_source || 'N/A'}, UTM Medium: ${utmParams.utm_medium || 'N/A'}, UTM Campaign: ${utmParams.utm_campaign || 'N/A'}`,
        customAttributes: [
          {
            key: 'utm_source',
            value: utmParams.utm_source || ''
          },
          {
            key: 'utm_medium', 
            value: utmParams.utm_medium || ''
          },
          {
            key: 'utm_campaign',
            value: utmParams.utm_campaign || ''
          }
        ]
      };

      console.log('Dados do carrinho:', cartData);

      // Criar carrinho via Storefront API
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      console.log('Status da resposta:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro da API:', errorData);
        throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Resposta da API:', data);
      
      // Adicionar UTMs à URL do checkout
      const checkoutUrl = new URL(data.checkoutUrl);
      Object.entries(utmParams).forEach(([key, value]) => {
        checkoutUrl.searchParams.set(key, value);
      });
      
      console.log('Abrindo checkout com UTMs:', checkoutUrl.toString());
      
      // Abrir checkout em nova aba
      window.open(checkoutUrl.toString(), '_blank');
      
    } catch (error) {
      console.error('Erro ao criar carrinho customizado:', error);
      
      // Fallback: redirecionar para o carrinho
      alert('Erro ao criar carrinho. Redirecionando para o carrinho...');
      window.open('https://nkgzhm-1d.myshopify.com/cart', '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Criando carrinho...' : 'Comprar Agora com UTM'}
    </button>
  );
} 