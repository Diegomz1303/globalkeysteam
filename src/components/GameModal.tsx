"use client";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../store/useCart';

export default function GameModal({ juego, onClose }: { juego: any, onClose: () => void }) {
  const addToCart = useCart((state) => state.addToCart);

  if (!juego) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
        {/* Fondo oscuro desenfocado */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        ></motion.div>

        {/* Contenedor del Modal - MÁS GRANDE (max-w-7xl) y más altura */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-7xl bg-[#0a0a0a] border border-gray-800 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(255,102,0,0.15)] flex flex-col lg:flex-row max-h-[90vh] min-h-[70vh]"
        >
          {/* BOTÓN CERRAR */}
          <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-[#FF6600] text-white p-3 rounded-full transition-colors backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* COLUMNA IZQUIERDA: Imágenes (Ahora ocupa el 55% del espacio en PC) */}
          <div className="w-full lg:w-[55%] bg-[#121212] flex flex-col">
            <div className="relative w-full h-72 lg:h-[450px]">
              <Image src={juego.image} alt={juego.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90"></div>
            </div>
            
            {/* Galería de Screenshots */}
            <div className="flex gap-3 p-6 overflow-x-auto custom-scrollbar bg-[#121212]">
              {juego.screenshots?.map((img: string, i: number) => (
                <div key={i} className="relative w-32 h-20 lg:w-40 lg:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#FF6600] cursor-pointer transition-all hover:scale-105">
                  <Image src={img} alt={`Screenshot ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: Info del Juego */}
          <div className="w-full lg:w-[45%] p-8 lg:p-10 flex flex-col overflow-y-auto custom-scrollbar relative z-10 bg-[#0a0a0a]">
            <div className="mb-4">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">{juego.title}</h2>
              <div className="flex items-center gap-3">
                <span className="bg-[#FF6600]/10 text-[#FF6600] border border-[#FF6600]/30 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase">
                  🌍 {juego.region}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${juego.stock > 0 ? 'bg-green-500/10 text-green-500 border-green-500/30' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                  {juego.stock > 0 ? `🔥 Stock: ${juego.stock}` : '❌ Agotado'}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-base lg:text-lg mb-8 leading-relaxed">
              {juego.description}
            </p>

            {/* Requisitos del Sistema */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-gray-800 mb-8">
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest text-[#FF6600]">Requisitos Mínimos</h4>
              <ul className="text-sm text-gray-400 space-y-3">
                <li><strong className="text-gray-200">SO:</strong> {juego.requirements?.os}</li>
                <li><strong className="text-gray-200">Procesador:</strong> {juego.requirements?.cpu}</li>
                <li><strong className="text-gray-200">Memoria:</strong> {juego.requirements?.ram}</li>
                <li><strong className="text-gray-200">Gráficos:</strong> {juego.requirements?.gpu}</li>
              </ul>
            </div>

            {/* Área de Precio y Botón al fondo */}
            <div className="mt-auto pt-6 border-t border-gray-800 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div>
                {juego.oldPrice && <span className="text-gray-500 line-through text-lg font-medium">S/ {juego.oldPrice.toFixed(2)}</span>}
                <div className="text-5xl font-black text-white tracking-tighter">S/ {juego.price.toFixed(2)}</div>
              </div>
              
              <button 
                onClick={() => { addToCart(juego); onClose(); }}
                disabled={juego.stock === 0}
                className="w-full xl:w-auto bg-[#FF6600] disabled:bg-gray-800 disabled:text-gray-500 hover:bg-orange-600 text-white font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-[0_10px_30px_rgba(255,102,0,0.3)] text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                {juego.stock > 0 ? 'AL CARRITO' : 'AGOTADO'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}