"use client";
import { motion } from 'framer-motion';
import { useCart } from '../store/useCart';
import { useGames } from '../store/useGames';
import GameCard from './GameCard'; // Reutilizamos el card para relacionados

interface GameModalProps {
  juego: any;
  onClose: () => void;
}

export default function GameModal({ juego, onClose }: GameModalProps) {
  const addToCart = useCart((state) => state.addToCart);
  const { games } = useGames();

  // Lógica de Juegos Relacionados (mismo género, excluyendo el actual)
  const relacionados = games
    .filter((g) => g.genre === juego.genre && g.id !== juego.id)
    .slice(0, 3);

  const screenshots = typeof juego.screenshots === 'string' 
    ? juego.screenshots.split(',').filter((s: string) => s.trim() !== "") 
    : (Array.isArray(juego.screenshots) ? juego.screenshots : []);

  // Mock de opiniones (en un futuro esto vendría de tu DB)
  const reviews = [
    { id: 1, user: "AlexGamer", stars: 5, text: "¡Increíble! Recibí la clave en menos de 5 minutos." },
    { id: 2, user: "Marta_99", stars: 4, text: "Todo perfecto, muy confiable." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-[#0a0a0a] border border-gray-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl custom-scrollbar"
      >
        {/* Banner Principal */}
        <div className="relative h-64 md:h-96 w-full">
          <img src={juego.image} alt={juego.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-6 right-6 bg-black/50 hover:bg-[#FF6600] text-white p-2 rounded-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-8 lg:p-12 -mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <span className="bg-[#FF6600] text-black font-black px-3 py-1 rounded text-xs uppercase mb-4 inline-block tracking-widest">
                {juego.region}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{juego.title}</h2>
              
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p className="text-lg">{juego.description}</p>
                
                {/* REQUISITOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-800">
                  <div>
                    <h4 className="text-white font-bold mb-3 uppercase text-sm tracking-widest text-[#FF6600]">Requisitos</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong className="text-gray-300">OS:</strong> {juego.os || 'Windows 10'}</li>
                      <li><strong className="text-gray-300">RAM:</strong> {juego.ram || '8GB'}</li>
                      <li><strong className="text-gray-300">GPU:</strong> {juego.gpu || 'GTX 1050'}</li>
                    </ul>
                  </div>
                  <div>
                     <h4 className="text-white font-bold mb-3 uppercase text-sm tracking-widest text-[#FF6600]">Género</h4>
                     <p className="text-white bg-gray-800 w-fit px-4 py-1 rounded-full font-bold">{juego.genre || 'Acción'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-80 h-fit bg-[#121212] border border-gray-800 p-6 rounded-3xl sticky top-0">
              <div className="mb-6">
                <p className="text-gray-500 text-sm font-bold uppercase mb-1">Precio Total</p>
                <h3 className="text-4xl font-black text-[#FF6600]">S/ {juego.price.toFixed(2)}</h3>
              </div>
              <button 
                onClick={() => addToCart(juego)}
                className="w-full bg-[#FF6600] hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg active:scale-95 mb-4"
              >
                AÑADIR AL CARRITO
              </button>
            </div>
          </div>

          {/* SECCIÓN DE SCREENSHOTS */}
          {screenshots.length > 0 && (
            <div className="mt-12">
              <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Capturas de Pantalla</h4>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {screenshots.map((img: string, i: number) => (
                  <div key={i} className="relative w-64 h-36 flex-shrink-0 rounded-2xl overflow-hidden border border-gray-800">
                    <img src={img} alt="screenshot" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NUEVA SECCIÓN: OPINIONES */}
          <div className="mt-12 pt-12 border-t border-gray-800">
            <h4 className="text-white font-bold mb-8 uppercase text-sm tracking-widest">Opiniones de Compradores</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(rev => (
                <div key={rev.id} className="bg-[#121212] p-6 rounded-2xl border border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-[#FF6600]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < rev.stars ? "opacity-100" : "opacity-30"}>★</span>
                      ))}
                    </div>
                    <span className="text-white font-bold text-sm">{rev.user}</span>
                  </div>
                  <p className="text-gray-400 text-sm italic">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* NUEVA SECCIÓN: RELACIONADOS */}
          {relacionados.length > 0 && (
            <div className="mt-12 pt-12 border-t border-gray-800">
              <h4 className="text-white font-bold mb-8 uppercase text-sm tracking-widest">También te podría gustar</h4>
              <div className="space-y-4">
                {relacionados.map(rel => (
                  <div key={rel.id} className="scale-90 origin-left">
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