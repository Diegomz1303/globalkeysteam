"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../store/useCart';
import { useCurrency } from '../store/useCurrency';
import { useWishlist } from '../store/useWishlist'; 

export default function Navbar() {
  const { cart, isCartOpen, toastMessage, openCart, closeCart, removeFromCart } = useCart();
  const { currency, initCurrency, formatPrice, setCurrencyManual } = useCurrency(); 
  const { wishlist } = useWishlist(); 
  
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  
  // 🚀 ESTADO PARA LA ANIMACIÓN GLOBAL DE MONEDA
  const [isChangingCurrency, setIsChangingCurrency] = useState(false);

  useEffect(() => {
    initCurrency();
  }, [initCurrency]);

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

  // 🚀 FUNCIÓN QUE CAMBIA LA MONEDA Y DISPARA LA ANIMACIÓN
  const handleCurrencyChange = (newCurrency: 'PEN' | 'COP') => {
    if (newCurrency === currency) {
      setIsCurrencyMenuOpen(false);
      return;
    }
    
    setIsCurrencyMenuOpen(false);
    setIsChangingCurrency(true); // Enciende la pantalla de carga
    
    // Cambiamos la moneda en el sistema
    setCurrencyManual(newCurrency);

    // Apagamos la pantalla de carga después de 1.2 segundos
    setTimeout(() => {
      setIsChangingCurrency(false);
    }, 1200);
  };

  return (
    <>
      {/* 🌟 ANIMACIÓN GLOBAL DE CAMBIO DE MONEDA (Cubre toda la pantalla) */}
      <AnimatePresence>
        {isChangingCurrency && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-md"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-[#FF6600] border-t-transparent rounded-full mb-6 shadow-[0_0_20px_rgba(255,102,0,0.6)]"
            />
            <motion.h3 
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="text-2xl md:text-4xl font-black text-white tracking-widest uppercase text-center drop-shadow-lg"
            >
              Actualizando Precios
            </motion.h3>
            <motion.p 
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-[#FF6600] font-bold mt-3 text-lg md:text-xl"
            >
              Calculando en {currency === 'PEN' ? 'Soles (PEN)' : 'Pesos (COP)'}...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-[#050505]/85 backdrop-blur-xl border-b-2 border-[#FF6600] py-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' : 'bg-transparent py-4 border-b-2 border-transparent'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
               <Image 
                 src="/logo.png" 
                 alt="GlobalKeySteam Logo" 
                 width={isScrolled ? 40 : 45} 
                 height={isScrolled ? 40 : 45} 
                 className="object-contain drop-shadow-[0_0_12px_rgba(255,102,0,0.6)] transition-all duration-300"
                 priority
               />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-wide">
              GLOBAL<span className="text-[#FF6600]">KeySTEAM</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            
            {/* SELECTOR DE MONEDA (BANDERAS) */}
            <div className="relative">
              <button 
                onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                className="flex items-center gap-2 bg-[#121212] border border-gray-800 hover:border-[#FF6600] px-3 py-1.5 md:px-4 md:py-2 rounded-xl transition-all shadow-lg"
              >
                <span className="text-lg md:text-xl leading-none">{currency === 'PEN' ? '🇵🇪' : '🇨🇴'}</span>
                <span className="text-white font-bold text-xs md:text-sm">{currency}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 transition-transform duration-300 ${isCurrencyMenuOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>

              <AnimatePresence>
                {isCurrencyMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-3 bg-[#121212] border border-gray-800 rounded-xl shadow-2xl overflow-hidden w-36 z-50"
                  >
                    <button 
                      onClick={() => handleCurrencyChange('PEN')}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${currency === 'PEN' ? 'bg-[#FF6600]/10 text-[#FF6600]' : 'text-gray-300'}`}
                    >
                      <span className="text-xl">🇵🇪</span>
                      <span className="font-black text-sm">Soles (PEN)</span>
                    </button>
                    <button 
                      onClick={() => handleCurrencyChange('COP')}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${currency === 'COP' ? 'bg-[#FF6600]/10 text-[#FF6600]' : 'text-gray-300'}`}
                    >
                      <span className="text-xl">🇨🇴</span>
                      <span className="font-black text-sm">Pesos (COP)</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOTÓN DE WISHLIST (CORAZÓN) */}
            <Link href="/wishlist" className="relative group p-2 hidden sm:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-red-500 transition-colors w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-pulse shadow-lg shadow-red-500/50">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* BOTÓN DEL CARRITO */}
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
            className="fixed bottom-8 right-4 md:right-8 z-[9999] bg-[#121212] border-l-4 border-[#FF6600] text-white px-5 py-4 rounded-xl shadow-[0_10px_40px_rgba(255,102,0,0.3)] flex items-center gap-3"
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
          <div className="fixed inset-0 z-[999] flex justify-end">
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
                        <p className="text-[#FF6600] font-black text-sm">{formatPrice(juego.price)}</p>
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
                    <span className="text-3xl font-black text-white">{formatPrice(total)}</span>
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