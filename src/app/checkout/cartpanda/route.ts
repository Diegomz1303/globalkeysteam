import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cart } = body; 

    // Verificamos que sí llegue el juego
    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: 'No hay productos para procesar' }, { status: 400 });
    }

    const lineItems = cart.map((juego: any) => ({
      title: juego.title,
      price: juego.price, 
      quantity: 1, 
    }));

    const cartpandaData = {
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success`, 
    };

    const response = await fetch('https://api.cartpanda.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CARTPANDA_TOKEN}`, 
      },
      body: JSON.stringify(cartpandaData),
    });

    if (!response.ok) {
      // Si Cartpanda da error, lo imprimimos en la terminal del servidor
      const errorText = await response.text();
      console.error("Detalles del error de Cartpanda:", errorText);
      throw new Error('Error al conectar con la pasarela');
    }

    const data = await response.json();
    
    return NextResponse.json({ checkoutUrl: data.checkout_url });

  } catch (error) {
    console.error("Error API Cartpanda:", error);
    return NextResponse.json({ error: 'Error procesando el pago' }, { status: 500 });
  }
}