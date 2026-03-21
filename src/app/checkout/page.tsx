"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../store/useCart';
import { useCurrency } from '../../store/useCurrency';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Nuevos estados para la magia del Checkout
  const [hasClickedPay, setHasClickedPay] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const juego: any = cart[0];

  
  const handleReturnHome = () => {
    clearCart();
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[#050505] font-sans pt-28 pb-12 text-white flex flex-col justify-between relative">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-5xl flex-1 relative z-10">
        
        {/* BOTÓN DE VOLVER A LA TIENDA SUPERIOR */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FF6600] transition-colors mb-6 font-bold text-sm uppercase tracking-widest group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          Seguir Comprando
        </Link>

        <h1 className="text-3xl md:text-5xl font-black mb-8 border-b border-gray-800 pb-4">
          Resumen de tu <span className="text-[#FF6600]">Compra</span>
        </h1>
        
        {!juego ? (
          <div className="text-center py-20 bg-[#121212] border border-gray-800 rounded-3xl shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4 text-gray-500"><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <p className="text-xl font-bold text-gray-400 mb-6">No has seleccionado ningún juego.</p>
            <Link href="/" className="bg-[#FF6600] hover:bg-orange-500 text-white px-8 py-3 rounded-xl font-black transition-colors shadow-[0_0_15px_rgba(255,102,0,0.4)]">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Detalles del Juego */}
            <div className="bg-[#121212] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl h-fit">
              <h2 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
                Producto a Entregar
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-full sm:w-36 h-48 relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 border border-gray-700">
                  <Image src={juego.image} alt={juego.title} fill className="object-cover" />
                </div>
                
                <div className="flex-1 w-full text-center sm:text-left">
                  <span className="bg-black text-[#FF6600] border border-[#FF6600]/30 text-[10px] font-black uppercase px-3 py-1 rounded shadow-lg mb-3 inline-block">
                    {juego.region || 'GLOBAL'}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2 leading-tight">{juego.title}</h3>
                  <p className="text-gray-400 text-sm mb-5 font-medium">{juego.platform || 'Steam'} • {juego.genre || 'Acción'}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-gray-300">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                       Entrega Digital Inmediata
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-gray-300">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                       Garantía de Activación
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen de Pago y Botones */}
            <div className="bg-[#121212] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <h2 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Detalles de Facturación
                </h2>
                
                <div className="flex justify-between items-center mb-4 text-gray-300">
                  <span className="font-medium">Juego ({juego.title})</span>
                  <span className="font-bold">{formatPrice(juego.price)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-gray-300">
                  <span className="font-medium">Impuestos / Comisiones</span>
                  <span className="font-bold text-green-500 uppercase">Gratis</span>
                </div>
                
                <div className="border-t border-gray-800/80 pt-6 flex justify-between items-center mb-10">
                  <span className="text-xl font-black text-white">Total a Pagar</span>
                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-400">
                    {formatPrice(juego.price)}
                  </span>
                </div>
              </div>

              <div>
                {/* LÓGICA DE CAMBIO DE BOTÓN */}
                {!hasClickedPay ? (
                  <a 
                    href={juego.stripeLink || "https://buy.stripe.com/eVq9ATfni8bA6StevmbV604"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setHasClickedPay(true)} 
                    className="w-full bg-white hover:bg-gray-100 text-gray-900 font-black py-5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_25px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95 text-xl overflow-hidden border-2 border-transparent hover:border-[#635BFF]"
                  >
                    <span className="tracking-wide relative z-10">PAGAR CON</span>
                    <div className="relative w-[100px] h-[36px] scale-[1.1] transform origin-left ml-2">
                      <Image src="/Stripe.png" alt="Stripe" fill className="object-contain" priority />
                    </div>
                  </a>
                ) : (
                  <button 
                    onClick={() => setShowSuccessModal(true)}
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-black py-5 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_25px_rgba(34,197,94,0.3)] hover:shadow-[0_10px_35px_rgba(34,197,94,0.5)] hover:-translate-y-1 active:scale-95 text-xl uppercase tracking-wide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    Ya realicé el pago
                  </button>
                )}

                <div className="mt-5 p-4 bg-[#FF6600]/10 border border-[#FF6600]/30 rounded-xl flex items-start gap-3 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <p className="text-xs text-gray-300 font-medium leading-relaxed">
                    La clave de activación se enviará automáticamente al <strong className="text-white">correo electrónico</strong> que registres en la pasarela de pago.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
      
      <div className="mt-16 relative z-10">
        <Footer />
      </div>

      {/*  EL GRAN MODAL DE ÉXITO */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Fondo difuminado */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            {/* Contenido del Modal */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.8, opacity: 0, y: 30 }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-[#121212] border border-gray-800 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center shadow-[0_0_80px_rgba(255,102,0,0.2)]"
            >
              {/* Ícono de Check gigante animado */}
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1, rotate: 360 }} 
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 bg-gradient-to-br from-[#FF6600] to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,102,0,0.5)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">¡Grandioso!</h2>
              
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                En unos momentos tendrás tu key en el <strong className="text-white">correo electrónico</strong> que ingresaste al comprar. ¡Prepárate para jugar! 🎮
              </p>
              
              {/* Botón CTA de Discord */}
              <a 
                href="https://discord.gg/b7VdGh3n" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_10px_20px_rgba(88,101,242,0.3)] hover:-translate-y-1 mb-4 text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77.7,77.7,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
                Únete a la Comunidad
              </a>

              {/* Botón para regresar al inicio */}
              <button 
                onClick={handleReturnHome}
                className="w-full bg-transparent border-2 border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white font-bold py-4 px-6 rounded-2xl transition-all"
              >
                Volver a la tienda
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}