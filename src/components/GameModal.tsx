"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  // --- ESTADOS PARA LAS RESEÑAS DINÁMICAS ---
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [newReview, setNewReview] = useState({ user: '', stars: 5, text: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // --- OBTENER RESEÑAS DE LA BASE DE DATOS ---
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?gameId=${juego.id}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.error("Error cargando reseñas:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [juego.id]);

  // --- ENVIAR NUEVA RESEÑA ---
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.user.trim() || !newReview.text.trim()) return;
    
    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newReview, gameId: juego.id })
      });

      if (res.ok) {
        const savedReview = await res.json();
        // Agregamos la nueva reseña al inicio de la lista localmente
        setReviews([savedReview, ...reviews]);
        // Limpiamos el formulario
        setNewReview({ user: '', stars: 5, text: '' });
      }
    } catch (error) {
      alert("Hubo un error al publicar tu opinión.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const relacionados = games
    .filter((g) => g.genre === juego.genre && g.id !== juego.id)
    .slice(0, 3);

  const screenshots = typeof juego.screenshots === 'string' 
    ? juego.screenshots.split(',').filter((s: string) => s.trim() !== "") 
    : (Array.isArray(juego.screenshots) ? juego.screenshots : []);

  // Calcular el promedio de estrellas
  const averageStars = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.stars, 0) / reviews.length).toFixed(1)
    : "Nuevo";

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
        {/* Banner Principal Premium */}
        <div className="relative h-72 md:h-[450px] w-full group overflow-hidden">
          <img src={juego.image} alt={juego.title} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
          
          <button onClick={onClose} className="absolute top-6 right-6 bg-black/50 backdrop-blur-md hover:bg-[#FF6600] hover:scale-110 text-white p-3 rounded-full transition-all z-20 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Contenido Principal */}
        <div className="p-6 md:p-12 -mt-32 md:-mt-40 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10">
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-[#FF6600] text-black font-black px-3 py-1.5 rounded-md text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,102,0,0.4)]">
                  {juego.region}
                </span>
                <span className="bg-[#121212] border border-gray-700 text-gray-300 font-black px-3 py-1.5 rounded-md text-xs uppercase tracking-widest">
                  {juego.genre || 'Acción'}
                </span>
                <span className="flex items-center gap-1.5 bg-gradient-to-r from-[#171a21] to-[#1b2838] border border-[#2a475e] text-white font-black px-3 py-1.5 rounded-md text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(27,40,56,0.5)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.01-8A8.006 8.006 0 0 0 0 7.468l5.17 2.111c.089-.046.19-.074.296-.074.394 0 .713.318.713.712 0 .044-.006.085-.015.125L9.61 12.28a2.4 2.4 0 0 0 2.22-1.52c.24-.68.04-1.44-.48-1.96s-1.28-.72-1.96-.48a2.4 2.4 0 0 0-1.52 2.22l-1.944-3.447a1.69 1.69 0 0 1-.366-.039L.329 10.333Z"/>
                    <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023 1.936a.7.7 0 1 1-1.033.725.7.7 0 0 1 .054-.216l-1.06-2.004a1.715 1.715 0 0 0 .961 2.744Z"/>
                  </svg>
                  STEAM KEY
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">{juego.title}</h2>
              
              <div className="space-y-8 text-gray-400 leading-relaxed">
                <p className="text-lg font-medium">{juego.description}</p>
                
                {/* REQUISITOS DEL SISTEMA */}
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

            {/* CAJA FLOTANTE DE PRECIO */}
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
                     Clave de Steam Original
                  </div>
                </div>

                <button 
                  onClick={() => addToCart(juego)}
                  className="w-full bg-gradient-to-r from-[#FF6600] to-orange-500 hover:from-orange-500 hover:to-[#FF6600] text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(255,102,0,0.4)] hover:shadow-[0_0_30px_rgba(255,102,0,0.6)] active:scale-95 flex items-center justify-center gap-2 text-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  AÑADIR AL CARRITO
                </button>
              </div>
            </div>
          </div>

          {/* SCREENSHOTS */}
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

          {/* SECCIÓN DE RESEÑAS DINÁMICAS */}
          <div className="mt-16 pt-8 border-t border-gray-800/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h4 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
                Opiniones de Compradores
                <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-xs ml-2">{reviews.length}</span>
              </h4>
              
              <div className="flex items-center gap-2 bg-[#121212] border border-gray-800 px-4 py-2 rounded-xl">
                <span className="text-[#FF6600] text-xl">★</span>
                <span className="text-white font-black">{averageStars}</span>
                <span className="text-gray-500 text-sm font-bold">/ 5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* FORMULARIO PARA DEJAR RESEÑA */}
              <div className="lg:col-span-1 bg-[#121212] p-6 rounded-3xl border border-gray-800 shadow-xl h-fit">
                <h5 className="text-white font-bold mb-4">¿Ya compraste este juego?</h5>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text" required placeholder="Tu Nombre o Nickname" 
                      value={newReview.user} onChange={e => setNewReview({...newReview, user: e.target.value})}
                      className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <select 
                      value={newReview.stars} onChange={e => setNewReview({...newReview, stars: Number(e.target.value)})}
                      className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none text-sm appearance-none cursor-pointer"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
                      <option value="4">⭐⭐⭐⭐ Muy Bueno</option>
                      <option value="3">⭐⭐⭐ Bueno</option>
                      <option value="2">⭐⭐ Regular</option>
                      <option value="1">⭐ Malo</option>
                    </select>
                  </div>
                  <div>
                    <textarea 
                      required placeholder="¿Qué te pareció el juego y la entrega?" rows={3}
                      value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})}
                      className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none text-sm resize-none custom-scrollbar"
                    />
                  </div>
                  <button type="submit" disabled={isSubmittingReview} className="w-full bg-[#FF6600] hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all disabled:opacity-50 text-sm">
                    {isSubmittingReview ? 'PUBLICANDO...' : 'PUBLICAR OPINIÓN'}
                  </button>
                </form>
              </div>

              {/* LISTA DE RESEÑAS */}
              <div className="lg:col-span-2 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {isLoadingReviews ? (
                  <div className="text-center text-gray-500 py-10 animate-pulse">Cargando opiniones...</div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-12 bg-[#121212] rounded-3xl border border-gray-800 border-dashed">
                    <p className="text-gray-400 font-bold">Aún no hay opiniones. ¡Sé el primero en comentar!</p>
                  </div>
                ) : (
                  reviews.map(rev => (
                    <div key={rev.id} className="bg-[#121212] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 font-black text-sm uppercase">
                            {rev.user.charAt(0)}
                          </div>
                          <span className="text-white font-bold text-sm">{rev.user}</span>
                        </div>
                        <div className="flex text-[#FF6600] text-sm tracking-widest">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < rev.stars ? "opacity-100" : "opacity-30"}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm italic font-medium">"{rev.text}"</p>
                      {/* Opcional: Mostrar fecha */}
                      {rev.createdAt && (
                        <p className="text-gray-600 text-[10px] uppercase font-bold mt-4 tracking-widest">
                          {new Date(rev.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric'})}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RELACIONADOS */}
          {relacionados.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-800/60">
              <h4 className="text-white font-black mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
                También te podría gustar
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relacionados.map(rel => (
                  <div key={rel.id} className="transform scale-[0.98] hover:scale-100 transition-transform">
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