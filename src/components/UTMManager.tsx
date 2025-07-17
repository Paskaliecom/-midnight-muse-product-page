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

    // Espera o carrinho carregar (Buy Button)
    const observer = new MutationObserver(() => {
      const checkoutBtn = document.querySelector('button.shopify-buy__cart__checkout');

      if (checkoutBtn && !(checkoutBtn as HTMLElement).dataset.utmAttached) {
        (checkoutBtn as HTMLElement).dataset.utmAttached = 'true';

        checkoutBtn.addEventListener('click', function (e: Event) {
          e.preventDefault(); // impede o comportamento padrão
          
          const iframe = document.querySelector('iframe');
          if (!iframe) return;
          
          const iframeWindow = iframe.contentWindow;
          if (!iframeWindow) return;

          // @ts-expect-error - ShopifyBuy.UI.components is a global variable from external script
          const cartData = iframeWindow.ShopifyBuy.UI.components.cart[0].model.lineItems;

          // Cria checkout com os mesmos itens do carrinho
          const lineItems = cartData.map((item: { variant: { id: string }; quantity: number }) => ({
            variantId: item.variant.id,
            quantity: item.quantity,
          }));

          // @ts-expect-error - ShopifyBuy.buildClient is a global function from external script
          const client = window.ShopifyBuy.buildClient({
            domain: '11kw1j-7a.myshopify.com',
            storefrontAccessToken: '13824e38ac18c667ed467a29e6df949a',
          });

          client.checkout.create({ lineItems }).then((checkout: { webUrl: string }) => {
            const suffix = checkout.webUrl.includes('?') ? '&' : '?';
            const checkoutUrl = checkout.webUrl + suffix + serialize(utmParams);
            window.location.href = checkoutUrl;
          });
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // Este componente não renderiza nada visualmente
} 