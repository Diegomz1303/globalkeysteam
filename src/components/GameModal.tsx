"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const { formatPrice, currency } = useCurrency();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 🚀 NUEVOS ESTADOS PARA LA ANIMACIÓN DE CAMBIO DE MONEDA
  const [isChangingCurrency, setIsChangingCurrency] = useState(false);
  const [prevCurrency, setPrevCurrency] = useState(currency);

  // EFECTO QUE DETECTA CUANDO CAMBIA LA MONEDA
  useEffect(() => {
    if (currency !== prevCurrency) {
      setIsChangingCurrency(true);
      
      // La animación dura 1.2 segundos y luego muestra los nuevos precios
      const timer = setTimeout(() => {
        setIsChangingCurrency(false);
        setPrevCurrency(currency);
      }, 1200); 
      
      return () => clearTimeout(timer);
    }
  }, [currency, prevCurrency]);

  const relacionados = games
    .filter((g) => g.genre === juego.genre && g.id !== juego.id)
    .slice(0, 3);

  const screenshots = typeof juego.screenshots === 'string' 
    ? juego.screenshots.split(',').filter((s: string) => s.trim() !== "") 
    : (Array.isArray(juego.screenshots) ? juego.screenshots : []);

  const faqs = [
    { q: "¿Cómo activo mi clave?", a: "Para activar tu clave, abre el cliente Steam, ve a «Juegos» → «Activar un producto en Steam», pega el código de la clave y sigue las instrucciones que aparecen en pantalla." },
    { q: "¿El juego permanecerá en mi biblioteca de Steam?", a: "¡Sí! Una vez activada la clave, el juego quedará vinculado permanentemente a tu cuenta de Steam y estará disponible en tu biblioteca para siempre." },
    { q: "¿Puedo perder este juego en algún momento?", a: "¡No! Una vez activado en tu cuenta de Steam, el juego es tuyo para siempre. Podrás descargarlo y jugar tantas veces como quieras, sin fecha de caducidad." },
    { q: "¿Qué incluye la clave de mi juego?", a: "La clave incluye el juego base, todos los DLC disponibles, contenido adicional y todas las actualizaciones futuras." },
    { q: "¿Y si tengo algún problema?", a: "¡Nuestro equipo de asistencia está siempre disponible para ayudarte! Ponte en contacto con nosotros por correo electrónico o chat y resolveremos cualquier problema lo antes posible." }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 🛒 AQUÍ ESTÁ EL BOTÓN CORREGIDO (Ya no abre el panel lateral)
  const handleAddToCart = () => {
    addToCart(juego);
    // Solo se ejecuta addToCart, así solo sale la notificación verde y no interrumpe al cliente
  };

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
        
        {/* 🌟 ANIMACIÓN DE CAMBIO DE MONEDA (Se superpone a todo el modal) */}
        <AnimatePresence>
          {isChangingCurrency && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[150] flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-md rounded-3xl"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-16 h-16 border-4 border-[#FF6600] border-t-transparent rounded-full mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"
              />
              <motion.h3 
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase text-center drop-shadow-lg"
              >
                Actualizando Precios
              </motion.h3>
              <motion.p 
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="text-[#FF6600] font-bold mt-3 text-lg"
              >
                Calculando en {currency === 'PEN' ? 'Soles (PEN)' : 'Pesos (COP)'}...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

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
                
                {/* PREGUNTAS FRECUENTES (En lugar de Requisitos) */}
                <div className="pt-8">
                  <h4 className="text-white font-black mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
                    Preguntas Frecuentes
                  </h4>
                  
                  <div className="space-y-3">
                    {faqs.map((faq, index) => (
                      <div key={index} className="bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-700">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none"
                        >
                          <span className="font-bold text-white text-sm md:text-base pr-4">{faq.q}</span>
                          <motion.div
                            animate={{ rotate: openFaq === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 text-[#FF6600]"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {openFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-gray-800/50 mt-1 pt-3">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:w-[350px] flex-shrink-0">
              <div className="bg-[#121212] border border-gray-800 rounded-3xl p-8 sticky top-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="mb-6 text-center">
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Precio Total</p>
                  
                  {/* PRECIO CON ANIMACIÓN */}
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

                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-[#FF6600] to-orange-500 hover:from-orange-500 hover:to-[#FF6600] text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(255,102,0,0.4)] hover:shadow-[0_0_30px_rgba(255,102,0,0.6)] active:scale-95 flex items-center justify-center gap-2 text-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  AÑADIR AL CARRITO
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