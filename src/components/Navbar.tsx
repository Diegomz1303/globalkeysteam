"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../store/useCurrency';

export default function Navbar() {
  const { currency, initCurrency, setCurrencyManual } = useCurrency(); 
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);

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

  return (
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

        <div className="flex items-center gap-3 md:gap-6">
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
                    onClick={() => { setCurrencyManual('PEN'); setIsCurrencyMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${currency === 'PEN' ? 'bg-[#FF6600]/10 text-[#FF6600]' : 'text-gray-300'}`}
                  >
                    <span className="text-xl">🇵🇪</span>
                    <span className="font-black text-sm">Soles (PEN)</span>
                  </button>
                  <button 
                    onClick={() => { setCurrencyManual('COP'); setIsCurrencyMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${currency === 'COP' ? 'bg-[#FF6600]/10 text-[#FF6600]' : 'text-gray-300'}`}
                  >
                    <span className="text-xl">🇨🇴</span>
                    <span className="font-black text-sm">Pesos (COP)</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}