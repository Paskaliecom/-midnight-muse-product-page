import { useEffect, useRef, useState } from "react";

export default function ShopifyBuyButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    console.log('Iniciando Buy Button...');

    // Função para injetar o script do Buy Button diretamente
    function injectBuyButton() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function () {
          var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
          if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
              ShopifyBuyInit();
            } else {
              loadScript();
            }
          } else {
            loadScript();
          }
          function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = ShopifyBuyInit;
          }
          function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
              domain: 'nkgzhm-1d.myshopify.com',
              storefrontAccessToken: 'a2573f84312eb27417abbd6671a74bb9',
            });
            ShopifyBuy.UI.onReady(client).then(function (ui) {
              ui.createComponent('product', {
                id: '9961456173368',
                node: document.getElementById('shopify-buy-button-container'),
                moneyFormat: '%24%7B%7Bamount%7D%7D',
                options: {
                  "product": {
                    "styles": {
                      "product": {
                        "@media (min-width: 601px)": {
                          "max-width": "calc(25% - 20px)",
                          "margin-left": "20px",
                          "margin-bottom": "50px"
                        }
                      },
                      "button": {
                        "font-weight": "bold",
                        ":hover": {
                          "background-color": "#e06813"
                        },
                        "background-color": "#f97315",
                        ":focus": {
                          "background-color": "#e06813"
                        },
                        "padding-left": "98px",
                        "padding-right": "98px"
                      }
                    },
                    "contents": {
                      "img": false,
                      "title": false,
                      "price": false
                    },
                    "text": {
                      "button": "Add to cart"
                    }
                  },
                  "productSet": {
                    "styles": {
                      "products": {
                        "@media (min-width: 601px)": {
                          "margin-left": "-20px"
                        }
                      }
                    }
                  },
                  "modalProduct": {
                    "contents": {
                      "img": false,
                      "imgWithCarousel": true,
                      "button": false,
                      "buttonWithQuantity": true
                    },
                    "styles": {
                      "product": {
                        "@media (min-width: 601px)": {
                          "max-width": "100%",
                          "margin-left": "0px",
                          "margin-bottom": "0px"
                        }
                      },
                      "button": {
                        "font-weight": "bold",
                        ":hover": {
                          "background-color": "#e06813"
                        },
                        "background-color": "#f97315",
                        ":focus": {
                          "background-color": "#e06813"
                        },
                        "padding-left": "98px",
                        "padding-right": "98px"
                      }
                    },
                    "text": {
                      "button": "Add to cart"
                    }
                  },
                  "option": {},
                  "cart": {
                    "styles": {
                      "button": {
                        "font-weight": "bold",
                        ":hover": {
                          "background-color": "#e06813"
                        },
                        "background-color": "#f97315",
                        ":focus": {
                          "background-color": "#e06813"
                        }
                      }
                    },
                    "text": {
                      "total": "Subtotal",
                      "button": "Checkout"
                    }
                  },
                  "toggle": {
                    "styles": {
                      "toggle": {
                        "font-weight": "bold",
                        "background-color": "#f97315",
                        ":hover": {
                          "background-color": "#e06813"
                        },
                        ":focus": {
                          "background-color": "#e06813"
                        }
                      }
                    }
                  }
                },
              });
            });
          }
        })();
      `;
      
      document.body.appendChild(script);
      console.log('Script injetado');
    }

    // Limpa o container e injeta o script
    if (containerRef.current) {
      containerRef.current.innerHTML = '<div id="shopify-buy-button-container"></div>';
      injectBuyButton();
    }

  }, [isClient]);

  // Só renderiza no cliente
  if (!isClient) return null;
  
  return (
    <div 
      ref={containerRef} 
      style={{ 
        minHeight: '100px', 
        border: '1px solid #ccc',
        padding: '10px',
        backgroundColor: '#f9f9f9'
      }} 
    />
  );
} 