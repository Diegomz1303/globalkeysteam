"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '../store/useCart';
import { useWishlist } from '../store/useWishlist';

export default function GameCard({ juego, onClick }: { juego: any, onClick: () => void }) {
  const addToCart = useCart((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(juego.id);
  
  const isOutOfStock = (juego.stock || 0) <= 0; // Validación de stock
  const discount = juego.oldPrice ? Math.round(((juego.oldPrice - juego.price) / juego.oldPrice) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      onClick={!isOutOfStock ? onClick : undefined} 
      className={`group flex flex-col md:flex-row bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 mb-4 shadow-xl ${isOutOfStock ? 'opacity-60 grayscale' : 'hover:border-[#FF6600] cursor-pointer'}`}
    >
      <div className="relative w-full md:w-64 h-56 md:h-auto flex-shrink-0 bg-black">
        <Image src={juego.image} alt={juego.title} fill className="object-cover opacity-90" />
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
            <span className="bg-red-600 text-white font-black px-4 py-2 rounded-lg text-sm uppercase tracking-tighter">AGOTADO</span>
          </div>
        )}

        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(juego); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md z-20 ${liked ? 'bg-[#FF6600] text-white' : 'bg-black/40 text-gray-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      
      <div className="flex-1 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800 relative">
        <h3 className="text-2xl font-black text-white mb-3 line-clamp-2">{juego.title}</h3>
        <div className="flex flex-wrap gap-3">
          <span className="bg-black/60 px-3 py-1.5 rounded-full border border-gray-700 text-[10px] font-bold text-gray-300 uppercase">{juego.platform || 'Steam'}</span>
          {!isOutOfStock && <span className="text-green-500 text-[10px] font-bold uppercase">Disponibilidad Inmediata</span>}
        </div>
      </div>

      <div className="w-full md:w-56 p-6 flex flex-col justify-center items-end bg-[#0a0a0a]">
        <div className="text-right mb-4">
            <div className="text-4xl font-black text-white tracking-tighter">S/ {juego.price.toFixed(2)}</div>
        </div>
        
        <button 
          disabled={isOutOfStock}
          onClick={(e) => { e.stopPropagation(); addToCart(juego); }}
          className={`w-full font-black py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${isOutOfStock ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#FF6600] text-white active:scale-95 shadow-lg shadow-orange-500/20'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <span>{isOutOfStock ? 'SIN STOCK' : 'AÑADIR'}</span>
        </button>
      </div>
    </motion.div>
  );
}