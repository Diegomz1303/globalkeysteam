"use client";
import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../../store/useCart';
import { useCurrency } from '../../store/useCurrency';
// IMPORTAMOS LA ACCIÓN SEGURA QUE CREAMOS EN EL PASO 2
import { createCartpandaPayment } from './actions'; 

export default function CheckoutPage() {
  const { cart } = useCart();
  const { formatPrice, currency } = useCurrency();
  
  const [isProcessing, setIsProcessing] = useState(false); 
  const router = useRouter();
  
  const juegoComprar = cart[0]; 

  useEffect(() => {
    if (!juegoComprar) {
      router.push('/');
    }
  }, [juegoComprar, router]);

  const handleCartpandaCheckout = async () => {
    if (!juegoComprar) return;
    setIsProcessing(true);

    try {
      // LLAMAMOS A LA FUNCIÓN DIRECTAMENTE (¡Adiós error 404!)
      const result = await createCartpandaPayment(juegoComprar);

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl; // Redirige a Cartpanda
      } else {
        alert(result.error || "Ocurrió un error al generar el pago.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
      alert("No pudimos conectar con el servidor.");
      setIsProcessing(false);
    }
  };

  if (!juegoComprar) return null; 

  return (
    <main className="min-h-screen bg-[#050505] text-white py-8 px-4 selection:bg-[#FF6600]">
      <div className="container mx-auto max-w-5xl">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800/60 mt-16">
          <Link href="/" className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Cancelar y volver a la tienda
          </Link>
          <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Pago Seguro Cartpanda
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-black text-white mb-6">Resumen de tu compra</h2>
            
            <div className="bg-[#121212] rounded-2xl border border-gray-800/60 overflow-hidden shadow-lg">
              <div className="flex items-center gap-4 p-4 md:p-6">
                <div className="relative w-24 h-14 md:w-32 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-800">
                  <Image src={juegoComprar.image} alt={juegoComprar.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 leading-tight">{juegoComprar.title}</h3>
                  <div className="flex gap-2 items-center">
                      <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-bold">Entrega Digital Inmediata</span>
                  </div>
                </div>
                <motion.div 
                  key={currency} 
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  className="text-xl md:text-2xl font-black text-[#FF6600]"
                >
                  {formatPrice(juegoComprar.price)}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] border border-gray-800/60 rounded-2xl p-6 lg:p-8 sticky top-24 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-6">Total a pagar</h2>

            <div className="flex justify-between items-end mb-8 border-b border-gray-800/60 pb-6">
              <span className="text-gray-300 font-medium">Precio Final</span>
              <motion.span 
                key={currency}
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="text-3xl md:text-4xl font-black text-white tracking-tight"
              >
                {formatPrice(juegoComprar.price)}
              </motion.span>
            </div>

            <button 
              onClick={handleCartpandaCheckout}
              disabled={isProcessing}
              className={`w-full font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_5px_20px_rgba(255,102,0,0.2)] mb-4
                ${isProcessing ? 'bg-gray-500 cursor-not-allowed text-gray-300' : 'bg-[#FF6600] hover:bg-orange-600 text-white'}`}
            >
              {isProcessing ? (
                "Generando pago..."
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  PROCEDER AL PAGO
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}