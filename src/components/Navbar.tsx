"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../store/useCart';

export default function Navbar() {
  const { cart, isCartOpen, toastMessage, openCart, closeCart, removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // NUEVO: Estado para saber si el usuario ha hecho scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR DINÁMICO */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-[#050505]/85 backdrop-blur-xl border-b-2 border-[#FF6600] py-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' : 'bg-transparent py-4 border-b-2 border-transparent'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
               <Image 
                 src="/logo.png" 
                 alt="GlobalKeySteam Logo" 
                 width={isScrolled ? 40 : 45} // Se hace un poquito más pequeño al bajar
                 height={isScrolled ? 40 : 45} 
                 className="object-contain drop-shadow-[0_0_12px_rgba(255,102,0,0.6)] transition-all duration-300"
                 priority
               />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-wide">
              GLOBAL<span className="text-[#FF6600]">KeySTEAM</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative group p-2" onClick={openCart}>
              <svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-[#FF6600] transition-colors w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg shadow-orange-500/50">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* NOTIFICACIÓN ANIMADA */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-4 md:right-8 z-50 bg-[#121212] border-l-4 border-[#FF6600] text-white px-5 py-4 rounded-xl shadow-[0_10px_40px_rgba(255,102,0,0.3)] flex items-center gap-3"
          >
            <div className="bg-[#FF6600]/20 p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="font-bold text-sm tracking-wide">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PANEL LATERAL DEL CARRITO */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" />
            
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-md bg-[#0a0a0a] border-l border-gray-800 h-full flex flex-col shadow-2xl shadow-black">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#121212]">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <span className="text-[#FF6600]">Tu</span> Carrito
                </h2>
                <button onClick={closeCart} className="text-gray-400 hover:text-white bg-gray-900 hover:bg-[#FF6600] p-2 rounded-full transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-50"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    <p className="text-lg font-bold">Tu carrito está vacío</p>
                  </div>
                ) : (
                  cart.map((juego) => (
                    <div key={juego.id} className="flex gap-4 bg-[#121212] p-3 rounded-xl border border-gray-800 items-center">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={juego.image} alt={juego.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-sm line-clamp-1">{juego.title}</h4>
                        <p className="text-[#FF6600] font-black text-sm">S/ {juego.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(juego.id)} className="text-gray-500 hover:text-red-500 p-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-[#121212] border-t border-gray-800">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 font-bold">Total:</span>
                    <span className="text-3xl font-black text-white">S/ {total.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout" onClick={closeCart} className="w-full bg-[#FF6600] hover:bg-orange-600 text-white font-black py-4 rounded-xl flex justify-center items-center gap-2 transition-all active:scale-95 shadow-lg shadow-orange-500/20 block text-center">
                    FINALIZAR COMPRA
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}