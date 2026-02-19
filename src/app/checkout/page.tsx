"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../store/useCart';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // REDIRECCIÓN AUTOMÁTICA A LA TIENDA SI EL CARRITO ESTÁ VACÍO
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/');
    }
  }, [cart.length, router]);

  const handleWhatsApp = () => {
    const listaJuegos = cart.map((j) => `- ${j.title} (S/ ${j.price.toFixed(2)})`).join('\n');
    const mensaje = encodeURIComponent(
      `¡Hola GlobalKeySteam! 🎮\nQuiero pagar mi pedido:\n\n${listaJuegos}\n\n*TOTAL: S/ ${total.toFixed(2)}*`
    );
    window.open(`https://wa.me/555391912151?text=${mensaje}`, '_blank');
    
    // Al limpiar el carrito, el useEffect de arriba te manda a la Home en automático
    clearCart(); 
  };

  // Prevenir que se vea una página rara antes de que el redireccionamiento haga efecto
  if (cart.length === 0) return null; 

  return (
    <main className="min-h-screen bg-[#050505] text-white py-8 px-4 selection:bg-[#FF6600]">
      <div className="container mx-auto max-w-5xl">
        
        {/* ENCABEZADO MINIMALISTA */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800/60">
          <Link href="/" className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Volver a la tienda
          </Link>
          <div className="text-sm text-gray-500 font-medium">Pago Seguro y Entrega Digital</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: RESUMEN DE COMPRA (MÁS LIMPIA) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-black text-white mb-6">Resumen de tu pedido</h2>
            
            <div className="bg-[#121212] rounded-2xl border border-gray-800/60 overflow-hidden">
              {cart.map((juego, index) => (
                <div key={juego.id} className={`flex items-center gap-4 p-4 md:p-6 ${index !== cart.length - 1 ? 'border-b border-gray-800/60' : ''}`}>
                  <div className="relative w-24 h-14 md:w-32 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-800">
                    <Image src={juego.image} alt={juego.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 leading-tight">{juego.title}</h3>
                    <div className="flex gap-2 items-center">
                       <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-bold">Steam Key</span>
                       <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                       <span className="text-green-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">Entrega Instantánea</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-white">
                    S/ {juego.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: TOTAL Y BOTÓN DE PAGO (MÁS COMPACTO Y PROFESIONAL) */}
          <div className="bg-[#121212] border border-gray-800/60 rounded-2xl p-6 lg:p-8 sticky top-24 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-6">Total a pagar</h2>
            
            <div className="space-y-3 mb-6 border-b border-gray-800/60 pb-6">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal ({cart.length} items)</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Comisiones</span>
                <span className="text-green-500">Gratis</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-gray-300 font-medium">Total</span>
              {/* Total más elegante y no tan gigante */}
              <span className="text-3xl font-black text-[#FF6600] tracking-tight">S/ {total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleWhatsApp}
              className="w-full bg-[#FF6600] hover:bg-orange-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_5px_20px_rgba(255,102,0,0.2)] mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              FINALIZAR COMPRA
            </button>

            <p className="text-[11px] text-gray-500 text-center leading-relaxed">
              Serás redirigido a WhatsApp de forma segura para coordinar tu pago y recibir tu llave digital.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}