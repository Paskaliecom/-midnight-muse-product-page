import { useEffect } from 'react';

export default function ShopifyBuyButton() {
  useEffect(() => {
    const scriptId = 'shopify-buy-button-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.onload = () => {
        // @ts-ignore
        if (window.ShopifyBuy) {
          // @ts-ignore
          if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
          } else {
            loadScript();
          }
        } else {
          loadScript();
        }
        function loadScript() {
          // já carregado
          ShopifyBuyInit();
        }
        function ShopifyBuyInit() {
          // @ts-ignore
          const client = window.ShopifyBuy.buildClient({
            domain: '11kw1j-7a.myshopify.com',
            storefrontAccessToken: '13824e38ac18c667ed467a29e6df949a',
          });
          // @ts-ignore
          window.ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
              id: '8108616876219',
              node: document.getElementById('product-component-1752755916550'),
              moneyFormat: '%C2%A3%7B%7Bamount%7D%7D',
              options: {
                product: {
                  styles: {
                    product: {
                      '@media (min-width: 601px)': {
                        'max-width': 'calc(25% - 20px)',
                        'margin-left': '20px',
                        'margin-bottom': '50px',
                      },
                    },
                    button: {
                      'font-weight': 'bold',
                      'font-size': '16px',
                      'padding-top': '16px',
                      'padding-bottom': '16px',
                      ':hover': { 'background-color': '#0cb516' },
                      'background-color': '#0dc918',
                      ':focus': { 'background-color': '#0cb516' },
                      'padding-left': '95px',
                      'padding-right': '95px',
                    },
                    quantityInput: {
                      'font-size': '16px',
                      'padding-top': '16px',
                      'padding-bottom': '16px',
                    },
                  },
                  contents: {
                    img: false,
                    title: false,
                    price: false,
                  },
                  text: {
                    button: 'Add to cart',
                  },
                },
                productSet: {
                  styles: {
                    products: {
                      '@media (min-width: 601px)': {
                        'margin-left': '-20px',
                      },
                    },
                  },
                },
                modalProduct: {
                  contents: {
                    img: false,
                    imgWithCarousel: true,
                    button: false,
                    buttonWithQuantity: true,
                  },
                  styles: {
                    product: {
                      '@media (min-width: 601px)': {
                        'max-width': '100%',
                        'margin-left': '0px',
                        'margin-bottom': '0px',
                      },
                    },
                    button: {
                      'font-weight': 'bold',
                      'font-size': '16px',
                      'padding-top': '16px',
                      'padding-bottom': '16px',
                      ':hover': { 'background-color': '#0cb516' },
                      'background-color': '#0dc918',
                      ':focus': { 'background-color': '#0cb516' },
                      'padding-left': '95px',
                      'padding-right': '95px',
                    },
                    quantityInput: {
                      'font-size': '16px',
                      'padding-top': '16px',
                      'padding-bottom': '16px',
                    },
                  },
                  text: {
                    button: 'Add to cart',
                  },
                },
                option: {},
                cart: {
                  styles: {
                    button: {
                      'font-weight': 'bold',
                      'font-size': '16px',
                      'padding-top': '16px',
                      'padding-bottom': '16px',
                      ':hover': { 'background-color': '#0cb516' },
                      'background-color': '#0dc918',
                      ':focus': { 'background-color': '#0cb516' },
                    },
                  },
                  text: {
                    total: 'Subtotal',
                    button: 'Checkout',
                  },
                },
                toggle: {
                  styles: {
                    toggle: {
                      'font-weight': 'bold',
                      'background-color': '#0dc918',
                      ':hover': { 'background-color': '#0cb516' },
                      ':focus': { 'background-color': '#0cb516' },
                    },
                    count: {
                      'font-size': '16px',
                    },
                  },
                },
              },
            });
          });
        }
      };
      document.body.appendChild(script);
    } else {
      // Se já existe, só inicializa
      // @ts-ignore
      if (window.ShopifyBuy && window.ShopifyBuy.UI) {
        // @ts-ignore
        ShopifyBuyInit();
      }
    }
  }, []);

  return <div id="product-component-1752755916550" />;
} 