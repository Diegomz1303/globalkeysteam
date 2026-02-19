"use client";
import { motion } from 'framer-motion';
import { useCurrency } from '../store/useCurrency';

interface GameCardProps {
  juego: any;
  onClick: () => void;
}

export default function GameCard({ juego, onClick }: GameCardProps) {
  // TRAEMOS LA MONEDA Y EL FORMATEADOR
  const { formatPrice, currency } = useCurrency();

  return (
    <div 
      onClick={onClick}
      className="bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#FF6600] transition-colors shadow-lg flex flex-col md:flex-row items-stretch"
    >
      <div className="relative w-full md:w-64 h-56 md:h-auto flex-shrink-0 overflow-hidden bg-black">
        <img 
          src={juego.image} 
          alt={juego.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#FF6600] text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">
            {juego.region}
          </span>
          {juego.stock > 0 ? (
            <span className="bg-green-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">
              En Stock
            </span>
          ) : (
             <span className="bg-red-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">
              Agotado
            </span>
          )}
        </div>
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
          <span className="text-xs font-bold text-gray-400 bg-gray-900 px-3 py-1 rounded-full">{juego.platform || 'Steam'}</span>
        </div>
      </div>

      <div className="w-full md:w-56 bg-black/40 p-6 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end border-t md:border-t-0 md:border-l border-gray-800">
        <div className="text-left md:text-right mb-0 md:mb-4">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1 hidden md:block">Precio final</p>
          
          {/* ANIMACIÓN DEL PRECIO AL CAMBIAR DE MONEDA */}
          <motion.h4 
            key={currency} // Esto hace que la animación se dispare al cambiar la moneda
            initial={{ opacity: 0, scale: 0.8, y: -10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            className="text-2xl md:text-3xl font-black text-white"
          >
            {formatPrice(juego.price)}
          </motion.h4>

          {juego.oldPrice && (
            <motion.p 
              key={`old-${currency}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-gray-600 line-through font-bold text-sm"
            >
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