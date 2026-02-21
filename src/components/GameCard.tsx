"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCurrency } from '../store/useCurrency';
import { useWishlist } from '../store/useWishlist'; 

interface GameCardProps {
  juego: any;
  onClick: () => void;
}

export default function GameCard({ juego, onClick }: GameCardProps) {
  const { formatPrice, currency } = useCurrency();
  const { toggleWishlist, wishlist } = useWishlist(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWished = mounted ? wishlist.some(item => item.id === juego.id) : false;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    toggleWishlist(juego);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#FF6600] transition-colors shadow-lg flex flex-col md:flex-row items-stretch relative"
    >
      <div className="relative w-full md:w-64 h-56 md:h-auto min-h-[224px] flex-shrink-0 overflow-hidden bg-black">
        <Image 
          src={juego.image} 
          alt={juego.title}
          fill
          sizes="(max-width: 768px) 100vw, 256px"
          className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
        />
        
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <span className="bg-[#FF6600] text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">
            {juego.region}
          </span>
          {juego.stock > 0 ? (
            <span className="bg-green-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">En Stock</span>
          ) : (
             <span className="bg-red-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">Agotado</span>
          )}
        </div>

        {mounted && (
          <button 
            onClick={handleHeartClick}
            className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black border border-transparent hover:border-gray-700 transition-all shadow-lg group/heart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              className={`transition-all duration-300 ${isWished ? 'fill-red-500 stroke-red-500 scale-110' : 'fill-none stroke-white group-hover/heart:stroke-red-500 group-hover/heart:scale-110'}`}
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center">
        <p className="text-[#FF6600] text-xs font-black uppercase tracking-widest mb-2">{juego.genre || 'Acción'}</p>
        <h3 className="text-xl md:text-2xl font-black text-white mb-2 line-clamp-2 group-hover:text-[#FF6600] transition-colors">
          {juego.title}
        </h3>
        <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-4">
          {juego.description}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <span className="flex items-center gap-1.5 text-[11px] font-black text-white bg-gradient-to-r from-[#171a21] to-[#1b2838] border border-[#2a475e] px-3 py-1.5 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.01-8A8.006 8.006 0 0 0 0 7.468l5.17 2.111c.089-.046.19-.074.296-.074.394 0 .713.318.713.712 0 .044-.006.085-.015.125L9.61 12.28a2.4 2.4 0 0 0 2.22-1.52c.24-.68.04-1.44-.48-1.96s-1.28-.72-1.96-.48a2.4 2.4 0 0 0-1.52 2.22l-1.944-3.447a1.69 1.69 0 0 1-.366-.039L.329 10.333Z"/><path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023 1.936a.7.7 0 1 1-1.033.725.7.7 0 0 1 .054-.216l-1.06-2.004a1.715 1.715 0 0 0 .961 2.744Z"/></svg>
            STEAM KEY
          </span>
        </div>
      </div>

      <div className="w-full md:w-56 bg-black/40 p-6 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end border-t md:border-t-0 md:border-l border-gray-800">
        <div className="text-left md:text-right mb-0 md:mb-4">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1 hidden md:block">Precio final</p>
          {/* AQUÍ ESTÁ LA SOLUCIÓN: suppressHydrationWarning */}
          <motion.h4 suppressHydrationWarning key={currency} initial={{ opacity: 0, scale: 0.8, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="text-2xl md:text-3xl font-black text-white">
            {formatPrice(juego.price)}
          </motion.h4>
          {juego.oldPrice && (
            <motion.p suppressHydrationWarning key={`old-${currency}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 line-through font-bold text-sm">
              {formatPrice(juego.oldPrice)}
            </motion.p>
          )}
        </div>
        <button className="bg-white group-hover:bg-[#FF6600] text-black group-hover:text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all duration-300 flex items-center gap-2">
          Ver Oferta
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}