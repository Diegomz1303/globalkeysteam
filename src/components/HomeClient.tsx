"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import GameCard from './GameCard';
import GameModal from './GameModal';
import Footer from './Footer'; 
import { useGames } from '../store/useGames';
import { useCurrency } from '../store/useCurrency';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeClient({ initialGames }: { initialGames: any[] }) {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  
  // Extraemos estado global
  const { games } = useGames();
  const { formatPrice } = useCurrency(); 
  
  // Sincronizamos los juegos del servidor con Zustand de inmediato
  useEffect(() => {
    useGames.setState({ games: initialGames, isLoading: false });
  }, [initialGames]);

  // Usamos initialGames mientras Zustand hidrata para evitar parpadeos
  const displayGames = games.length > 0 ? games : initialGames;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('Todos');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredGames = displayGames.filter((g: any) => (g.stock || 0) > 0).slice(0, 4);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, priceRange, selectedPlatform]);

  useEffect(() => {
    if (featuredGames.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const filteredGames = displayGames.filter((game: any) => {
    const matchSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGenre = selectedGenre === 'Todos' || game.genre === selectedGenre;
    const matchPlatform = selectedPlatform === 'Todos' || game.platform === selectedPlatform;
    
    let matchPrice = true;
    if (priceRange === '20') matchPrice = game.price < 20;
    else if (priceRange === '50') matchPrice = game.price >= 20 && game.price <= 50;
    else if (priceRange === 'plus') matchPrice = game.price > 50;

    return matchSearch && matchGenre && matchPlatform && matchPrice;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen font-sans selection:bg-[#FF6600] selection:text-white relative bg-[#050505] pt-20">
      <Navbar />

      {selectedGame && (
        <GameModal juego={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

      {/* HERO SECTION CON BANNER ESTILO G2A */}
      <div className="relative pt-4 pb-12 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF6600]/20 blur-[120px] rounded-full pointer-events-none opacity-40 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic tracking-tighter leading-none">
              Tus Juegos. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-500">Al Instante.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              La tienda de <strong className="text-white">Steam Keys</strong> más rápida y segura de Latinoamérica.
            </p>
          </div>

          {featuredGames.length > 0 ? (
            <div className="relative w-full max-w-6xl mx-auto h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gray-800 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="absolute inset-0 bg-black z-0">
                    <img src={featuredGames[currentSlide].image} alt="Background" className="w-full h-full object-cover opacity-40 blur-md scale-110" />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10"></div>

                  <div className="absolute inset-0 z-20 flex items-center justify-between p-6 md:p-16">
                    
                    <div className="w-full md:w-1/2 flex flex-col items-start justify-end h-full md:justify-center relative z-20 pb-4 md:pb-0">
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="bg-[#FF6600] text-white text-[10px] md:text-xs font-black uppercase px-4 py-1.5 rounded-full mb-4 tracking-wider shadow-[0_0_15px_rgba(255,102,0,0.5)]"
                      >
                        🔥 DESTACADO
                      </motion.span>
                      
                      <motion.h2 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-2xl line-clamp-2 max-w-[80%] md:max-w-full"
                      >
                        {featuredGames[currentSlide].title}
                      </motion.h2>
                      
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 mb-8"
                      >
                        <span className="text-3xl md:text-4xl font-black text-[#FF6600] drop-shadow-lg">
                          {formatPrice(featuredGames[currentSlide].price)}
                        </span>
                        {featuredGames[currentSlide].oldPrice && (
                          <span className="text-gray-400 line-through font-bold text-xl">
                            {formatPrice(featuredGames[currentSlide].oldPrice)}
                          </span>
                        )}
                      </motion.div>
                      
                      <motion.button 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        onClick={() => setSelectedGame(featuredGames[currentSlide])}
                        className="bg-white text-black hover:bg-gray-200 font-black py-4 px-8 rounded-xl transition-all active:scale-95 flex items-center gap-3 uppercase tracking-wide shadow-xl"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        Ver Oferta
                      </motion.button>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }} 
                      animate={{ opacity: 1, scale: 1, rotate: 2 }} 
                      transition={{ delay: 0.2, type: "spring" }}
                      className="absolute right-[-10px] top-6 w-[130px] h-[180px] opacity-80 md:opacity-100 md:relative md:right-0 md:top-0 md:w-5/12 md:h-full md:py-4 z-10"
                    >
                       <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-out cursor-pointer" onClick={() => setSelectedGame(featuredGames[currentSlide])}>
                          <Image src={featuredGames[currentSlide].image} alt="Cover" fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:from-black/60 to-transparent"></div>
                       </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {featuredGames.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-[#FF6600] w-8 shadow-[0_0_10px_rgba(255,102,0,0.8)]' : 'bg-white/30 w-2.5 hover:bg-white/60'}`}
                    aria-label={`Ir al slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* INSIGNIAS DE CONFIANZA */}
      <div className="container mx-auto px-4 mb-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 flex items-center gap-5 shadow-lg hover:border-[#FF6600]/50 transition-colors">
            <div className="w-14 h-14 bg-[#FF6600]/10 rounded-full flex items-center justify-center text-[#FF6600] flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
              <h4 className="font-black text-white text-lg leading-tight">Entrega Inmediata</h4>
              <p className="text-sm text-gray-500 font-medium">Recibe tu key al instante</p>
            </div>
          </div>
          
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 flex items-center gap-5 shadow-lg hover:border-[#FF6600]/50 transition-colors">
            <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div>
              <h4 className="font-black text-white text-lg leading-tight">Pago 100% Seguro</h4>
              <p className="text-sm text-gray-500 font-medium">Sin comisiones ocultas</p>
            </div>
          </div>

          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 flex items-center gap-5 shadow-lg hover:border-[#FF6600]/50 transition-colors">
            <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div>
              <h4 className="font-black text-white text-lg leading-tight">Soporte Activo</h4>
              <p className="text-sm text-gray-500 font-medium">Te ayudamos vía WhatsApp</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <div className="lg:sticky lg:top-24 h-fit z-20">
          <Sidebar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            selectedGenre={selectedGenre} 
            setSelectedGenre={setSelectedGenre}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 bg-[#121212] p-4 rounded-2xl border border-gray-800/50 shadow-lg">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-[#FF6600] rounded-full shadow-[0_0_10px_rgba(255,102,0,0.5)]"></span>
              {selectedGenre === 'Todos' ? 'Catálogo Completo' : `Género: ${selectedGenre}`}
              <span className="text-[#FF6600] text-sm font-black ml-2 bg-[#FF6600]/10 px-3 py-1 rounded-full">
                {filteredGames.length}
              </span>
            </h2>
          </div>

          <motion.div layout className="space-y-4">
            <AnimatePresence mode='popLayout'>
              {currentGames.length > 0 ? (
                currentGames.map((juego: any) => (
                  <motion.div
                    key={juego.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GameCard juego={juego} onClick={() => setSelectedGame(juego)} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-[#121212] border border-gray-800 rounded-2xl">
                  <p className="text-xl font-bold text-gray-300">No hay juegos que coincidan 👻</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 mb-12">
              <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#121212] border border-gray-800 rounded-lg text-white hover:border-[#FF6600] disabled:opacity-30 disabled:hover:border-gray-800 transition-all font-bold"
              >
                Anterior
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === page ? 'bg-[#FF6600] text-white shadow-lg shadow-orange-500/20' : 'bg-[#121212] text-gray-400 border border-gray-800 hover:border-gray-600'}`}
                      >
                        {page}
                      </button>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="text-gray-600">...</span>;
                  return null;
                })}
              </div>

              <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#121212] border border-gray-800 rounded-lg text-white hover:border-[#FF6600] disabled:opacity-30 disabled:hover:border-gray-800 transition-all font-bold"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}