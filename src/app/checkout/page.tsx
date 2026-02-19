"use client";
import { useEffect, useState } from 'react'; //
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../store/useCart';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [isOrderSent, setIsOrderSent] = useState(false); //
  const router = useRouter();
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // REDIRECCIÓN AUTOMÁTICA SOLO SI NO ESTAMOS EN EL PASO DE CONFIRMACIÓN
  useEffect(() => {
    if (cart.length === 0 && !isOrderSent) {
      router.push('/');
    }
  }, [cart.length, router, isOrderSent]);

  const handleWhatsApp = () => {
    const listaJuegos = cart.map((j) => `- ${j.title} (S/ ${j.price.toFixed(2)})`).join('\n');
    const mensaje = encodeURIComponent(
      `¡Hola GlobalKeySteam! 🎮\nQuiero pagar mi pedido:\n\n${listaJuegos}\n\n*TOTAL: S/ ${total.toFixed(2)}*`
    );
    window.open(`https://wa.me/555391912151?text=${mensaje}`, '_blank');
    setIsOrderSent(true); // Cambiamos al modo de confirmación
  };

  const handleFinish = () => {
    clearCart(); // Ahora sí limpiamos el carrito
    router.push('/');
  };

  if (cart.length === 0 && !isOrderSent) return null; 

  return (
    <main className="min-h-screen bg-[#050505] text-white py-8 px-4 selection:bg-[#FF6600]">
      <div className="container mx-auto max-w-5xl">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800/60">
          <Link href="/" className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Volver a la tienda
          </Link>
          <div className="text-sm text-gray-500 font-medium">Pago Seguro y Entrega Digital</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-black text-white mb-6">
              {isOrderSent ? "¡Casi listo!" : "Resumen de tu pedido"}
            </h2>
            
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

          <div className="bg-[#121212] border border-gray-800/60 rounded-2xl p-6 lg:p-8 sticky top-24 shadow-xl">
            {!isOrderSent ? (
              <>
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
                  <span className="text-3xl font-black text-[#FF6600] tracking-tight">S/ {total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-[#FF6600] hover:bg-orange-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_5px_20px_rgba(255,102,0,0.2)] mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  FINALIZAR COMPRA
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-xl font-black mb-2">Pedido Enviado</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Si ya nos escribiste por WhatsApp, puedes limpiar tu carrito y volver a la tienda para seguir navegando.
                </p>
                <button 
                  onClick={handleFinish}
                  className="w-full bg-white text-black hover:bg-gray-200 font-black py-4 rounded-xl transition-all active:scale-95 mb-3"
                >
                  HE ENVIADO EL MENSAJE
                </button>
                <button 
                  onClick={() => setIsOrderSent(false)}
                  className="text-gray-500 text-xs font-bold hover:text-white transition"
                >
                  Volver al resumen
                </button>
              </div>
            )}

            <p className="text-[11px] text-gray-500 text-center leading-relaxed">
              Serás redirigido a WhatsApp de forma segura para coordinar tu pago y recibir tu llave digital.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}