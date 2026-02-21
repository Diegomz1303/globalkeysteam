"use server";

export async function createCartpandaPayment(juego: any) {
  try {
    if (!juego) return { error: "No hay producto para comprar." };

    const cartpandaData = {
      line_items: [{
        title: juego.title,
        price: juego.price, 
        quantity: 1, 
      }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success`, 
    };

    // AQUÍ ESTÁ EL CAMBIO: Usamos accounts.cartpanda.com que es el servidor real
    const response = await fetch('https://accounts.cartpanda.com/api/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CARTPANDA_TOKEN}`, 
      },
      body: JSON.stringify(cartpandaData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cartpanda rechazó la petición. Detalles:", errorText);
      return { error: `Error de Cartpanda: Revisa la terminal de VS Code.` };
    }

    const data = await response.json();
    
    if (data.checkout_url) {
      return { checkoutUrl: data.checkout_url }; 
    } else {
      console.error("Cartpanda no devolvió la URL:", data);
      return { error: "Cartpanda no generó el link de pago." };
    }

  } catch (error) {
    console.error("Error grave del servidor:", error);
    return { error: "No se pudo alcanzar el servidor de Cartpanda." };
  }
}