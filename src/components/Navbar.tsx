"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../store/useCurrency';
import { useWishlist } from '../store/useWishlist'; 

export default function Navbar() {
  const { currency, initCurrency, setCurrencyManual } = useCurrency(); 
  const { wishlist } = useWishlist(); 
  
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
          </div>
        </div>
      </nav>
    </>
  );
}