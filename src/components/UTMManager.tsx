'use client';

import { useEffect } from 'react';

export default function UTMManager() {
  useEffect(() => {
    function getUTMParams() {
      const params = new URLSearchParams(window.location.search);
      const utms: Record<string, string> = {};
      for (const [key, value] of params.entries()) {
        if (key.startsWith('utm_')) {
          utms[key] = value;
        }
      }
      return utms;
    }

    function serialize(obj: Record<string, string>) {
      return Object.entries(obj).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    }

    const utmParams = getUTMParams();
    
    // Se não há UTMs, não faz nada
    if (Object.keys(utmParams).length === 0) {
      return;
    }

    console.log('UTMs detectadas:', utmParams);

    // Função para criar checkout customizado
    async function createCustomCheckout() {
      try {
        console.log('Criando checkout customizado com UTMs...');
        
        // Dados do produto (você pode ajustar conforme necessário)
        const productData = {
          variantId: 'gid://shopify/ProductVariant/43778592493771',
          quantity: 1
        };

        // Cria o checkout via API do Shopify
        const response = await fetch('/api/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lineItems: [productData],
            utmParams
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Adiciona UTMs à URL do checkout
        const separator = data.checkoutUrl.includes('?') ? '&' : '?';
        const checkoutUrlWithUTMs = data.checkoutUrl + separator + serialize(utmParams);
        
        console.log('Abrindo checkout com UTMs:', checkoutUrlWithUTMs);
        window.open(checkoutUrlWithUTMs, '_blank');
        
      } catch (error) {
        console.error('Erro ao criar checkout customizado:', error);
        // Fallback: redireciona para o carrinho
        window.open('https://11kw1j-7a.myshopify.com/cart', '_blank');
      }
    }

    // Intercepta cliques no Buy Button
    function interceptBuyButton() {
      // Procura por botões de checkout do Buy Button
      const buyButtons = document.querySelectorAll('[data-shopify="payment-button"], .shopify-buy__cart__checkout, button[data-testid="checkout-button"]');
      
      buyButtons.forEach((button) => {
        if (!(button as HTMLElement).dataset.utmIntercepted) {
          (button as HTMLElement).dataset.utmIntercepted = 'true';
          
          button.addEventListener('click', function(e: Event) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Clique no Buy Button interceptado!');
            createCustomCheckout();
          }, true);
        }
      });
    }

    // Observa mudanças no DOM para capturar o Buy Button quando ele carregar
    const observer = new MutationObserver(() => {
      interceptBuyButton();
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    // Executa imediatamente também
    interceptBuyButton();

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
} 