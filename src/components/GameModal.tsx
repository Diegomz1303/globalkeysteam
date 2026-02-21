"use client";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // IMPORTAMOS ROUTER
import { useCart } from '../store/useCart';
import { useGames } from '../store/useGames';
import { useCurrency } from '../store/useCurrency';
import GameCard from './GameCard'; 

interface GameModalProps {
  juego: any;
  onClose: () => void;
}

export default function GameModal({ juego, onClose }: GameModalProps) {
  const addToCart = useCart((state) => state.addToCart);
  const { games } = useGames();
  const { formatPrice } = useCurrency();
  const router = useRouter(); // INICIAMOS ROUTER

  // FUNCIÓN PARA COMPRAR DIRECTAMENTE
  const handleBuyNow = () => {
    addToCart(juego);
    router.push('/checkout'); // Redirige inmediatamente
  };

  const relacionados = games
    .filter((g) => g.genre === juego.genre && g.id !== juego.id)
    .slice(0, 3);

  const screenshots = typeof juego.screenshots === 'string' 
    ? juego.screenshots.split(',').filter((s: string) => s.trim() !== "") 
    : (Array.isArray(juego.screenshots) ? juego.screenshots : []);

  const reviews = [
    { id: 1, user: "AlexGamer", stars: 5, text: "¡Increíble! Recibí la clave en menos de 5 minutos." },
    { id: 2, user: "Marta_99", stars: 4, text: "Todo perfecto, muy confiable." }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-[#050505] border border-gray-800 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] custom-scrollbar"
      >
        <div className="relative h-72 md:h-[450px] w-full group overflow-hidden">
          <img src={juego.image} alt={juego.title} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
          
          <button onClick={onClose} className="absolute top-6 right-6 bg-black/50 backdrop-blur-md hover:bg-[#FF6600] hover:scale-110 text-white p-3 rounded-full transition-all z-20 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6 md:p-12 -mt-32 md:-mt-40 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10">
            
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-[#FF6600] text-black font-black px-3 py-1 rounded-md text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,102,0,0.4)]">
                  {juego.region}
                </span>
                <span className="bg-[#121212] border border-gray-700 text-gray-300 font-black px-3 py-1 rounded-md text-xs uppercase tracking-widest">
                  {juego.genre || 'Acción'}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">{juego.title}</h2>
              
              <div className="space-y-8 text-gray-400 leading-relaxed">
                <p className="text-lg font-medium">{juego.description}</p>
                
                <div className="pt-8">
                  <h4 className="text-white font-black mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
                    Requisitos del Sistema (PC)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:border-[#FF6600]/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sistema</p>
                        <p className="text-white text-sm font-bold mt-0.5">{juego.os || 'Windows 10'}</p>
                      </div>
                    </div>
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:border-[#FF6600]/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
                      <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Procesador</p>
                        <p className="text-white text-sm font-bold mt-0.5">{juego.cpu || 'Intel Core i5'}</p>
                      </div>
                    </div>
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:border-[#FF6600]/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="10" x2="4" y2="14"/><line x1="20" y1="10" x2="20" y2="14"/><rect x="8" y="4" width="8" height="16" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/></svg>
                      <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Memoria RAM</p>
                        <p className="text-white text-sm font-bold mt-0.5">{juego.ram || '8 GB RAM'}</p>
                      </div>
                    </div>
                    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:border-[#FF6600]/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/></svg>
                      <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Gráficos (GPU)</p>
                        <p className="text-white text-sm font-bold mt-0.5">{juego.gpu || 'NVIDIA GTX 1050'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-[350px] flex-shrink-0">
              <div className="bg-[#121212] border border-gray-800 rounded-3xl p-8 sticky top-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="mb-6 text-center">
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Precio Total</p>
                  <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-400">
                    {formatPrice(juego.price)}
                  </h3>
                  {juego.oldPrice && (
                     <p className="text-gray-600 line-through font-bold text-lg mt-1">{formatPrice(juego.oldPrice)}</p>
                  )}
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                     Entrega Digital Inmediata
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                     Garantía de Activación
                  </div>
                </div>

                {/* BOTÓN ACTUALIZADO PARA REDIRIGIR A CHECKOUT */}
                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-[#FF6600] to-orange-500 hover:from-orange-500 hover:to-[#FF6600] text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(255,102,0,0.4)] hover:shadow-[0_0_30px_rgba(255,102,0,0.6)] active:scale-95 flex items-center justify-center gap-2 text-lg uppercase"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  COMPRAR AHORA
                </button>
              </div>
            </div>
          </div>

          {screenshots.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-800/60">
              <h4 className="text-white font-black mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
                Capturas de Pantalla
              </h4>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {screenshots.map((img: string, i: number) => (
                  <div key={i} className="relative w-72 h-40 flex-shrink-0 rounded-2xl overflow-hidden border border-gray-800 group cursor-pointer">
                    <img src={img} alt="screenshot" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-gray-800/60">
            <h4 className="text-white font-black mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
              Opiniones de Compradores
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(rev => (
                <div key={rev.id} className="bg-[#121212] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-bold text-sm bg-gray-900 px-3 py-1 rounded-full">{rev.user}</span>
                    <div className="flex text-[#FF6600]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < rev.stars ? "opacity-100" : "opacity-30"}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm italic font-medium">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {relacionados.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-800/60">
              <h4 className="text-white font-black mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
                También te podría gustar
              </h4>
              <div className="space-y-4">
                {relacionados.map(rel => (
                  <div key={rel.id} className="transform scale-[0.98] hover:scale-100 origin-left transition-transform">
                     <GameCard juego={rel} onClick={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}