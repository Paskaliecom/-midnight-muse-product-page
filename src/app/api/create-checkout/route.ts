import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Dados recebidos:', body);
    
    const { lineItems, note, customAttributes } = body;

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      console.error('lineItems inválido:', lineItems);
      return NextResponse.json(
        { error: 'lineItems is required and must be an array' },
        { status: 400 }
      );
    }

    // Configurações do Shopify
    const domain = 'nkgzhm-1d.myshopify.com';
    const storefrontAccessToken = 'a2573f84312eb27417abbd6671a74bb9';

    // Query GraphQL para criar carrinho
    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            code
            field
            message
          }
        }
      }
    `;

    // Preparar dados do carrinho
    const variables = {
      input: {
        lines: lineItems.map((item: any) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity
        })),
        note,
        attributes: customAttributes
      }
    };

    console.log('Variáveis GraphQL:', JSON.stringify(variables, null, 2));

    // Fazer requisição para a Storefront API
    const shopifyResponse = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    console.log('Status da resposta Shopify:', shopifyResponse.status);

    if (!shopifyResponse.ok) {
      const errorText = await shopifyResponse.text();
      console.error('Erro da API Shopify:', errorText);
      throw new Error(`Shopify API error: ${shopifyResponse.status} - ${errorText}`);
    }

    const data = await shopifyResponse.json();
    console.log('Resposta da Shopify:', JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: 'GraphQL errors occurred', details: data.errors },
        { status: 400 }
      );
    }

    if (data.data?.cartCreate?.userErrors?.length > 0) {
      console.error('Cart creation errors:', data.data.cartCreate.userErrors);
      return NextResponse.json(
        { error: 'Cart creation failed', details: data.data.cartCreate.userErrors },
        { status: 400 }
      );
    }

    const cart = data.data?.cartCreate?.cart;
    
    if (!cart?.checkoutUrl) {
      console.error('No checkout URL received:', cart);
      return NextResponse.json(
        { error: 'No checkout URL received' },
        { status: 500 }
      );
    }

    console.log('Carrinho criado com sucesso:', cart.checkoutUrl);

    return NextResponse.json({
      checkoutUrl: cart.checkoutUrl,
      cartId: cart.id
    });

  } catch (error) {
    console.error('Erro ao criar carrinho:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create cart',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 