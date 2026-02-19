"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../store/useCart';

export default function GameCard({ juego, onClick }: { juego: any, onClick: () => void }) {
  const addToCart = useCart((state) => state.addToCart);
  const discount = juego.oldPrice ? Math.round(((juego.oldPrice - juego.price) / juego.oldPrice) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      onClick={onClick} 
      className="group flex flex-col md:flex-row bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#FF6600] transition-all duration-500 mb-4 shadow-xl hover:shadow-[0_0_30px_rgba(255,102,0,0.15)] cursor-pointer"
    >
      <div className="relative w-full md:w-64 h-56 md:h-auto flex-shrink-0 overflow-hidden bg-black">
        <Image src={juego.image} alt={juego.title} fill className="object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80"></div>
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#FF6600] text-white text-sm font-black px-3 py-1 rounded-lg shadow-lg transform -rotate-6">-{discount}% OFF</div>
        )}
      </div>
      
      <div className="flex-1 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800 relative z-10">
        <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#FF6600] transition-colors duration-300 line-clamp-2 leading-tight">{juego.title}</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-gray-700 text-xs font-bold text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF6600]"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            {juego.region}
          </span>
          <span className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 text-xs font-bold text-green-500 uppercase">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Entrega Inmediata
          </span>
        </div>
      </div>

      <div className="w-full md:w-56 p-6 flex flex-col justify-center items-end bg-[#0a0a0a] relative z-10">
        <div className="text-right mb-4">
            {juego.oldPrice && <div className="text-gray-500 text-sm line-through font-medium">S/ {juego.oldPrice.toFixed(2)}</div>}
            <div className="text-4xl font-black text-white tracking-tighter flex items-start gap-1"><span className="text-xl mt-1 text-[#FF6600]">S/</span>{juego.price.toFixed(2)}</div>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(juego); }}
          className="w-full relative overflow-hidden bg-[#FF6600] rounded-xl text-white font-black py-3 px-4 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 flex items-center justify-center gap-2 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          <span>AÑADIR</span>
        </button>
      </div>
    </motion.div>
  );
}