"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import GameCard from '../components/GameCard';
import GameModal from '../components/GameModal';
import { useGames } from '../store/useGames';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const { games, fetchGames } = useGames();
  
  // Estados para filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');

  // --- LÓGICA DE PAGINACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // Resetear a la página 1 cuando se busca o cambia de género
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre]);

  // Filtrado de juegos
  const filteredGames = games.filter((game) => {
    const matchSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGenre = selectedGenre === 'Todos' || game.genre === selectedGenre;
    return matchSearch && matchGenre;
  });

  // Cálculo de juegos por página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen font-sans selection:bg-[#FF6600] selection:text-white pb-16 relative bg-[#050505]">
      <Navbar />

      {selectedGame && (
        <GameModal juego={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

      {/* HERO SECTION */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF6600]/20 blur-[120px] rounded-full pointer-events-none opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic tracking-tighter leading-none">
            Tus Juegos. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-500">Al Instante.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            La tienda de <strong className="text-white">Steam Keys</strong> más rápida y segura de Latinoamérica.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <div className="lg:sticky lg:top-24 h-fit z-20">
          <Sidebar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            selectedGenre={selectedGenre} 
            setSelectedGenre={setSelectedGenre} 
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 bg-[#121212] p-4 rounded-2xl border border-gray-800/50">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-[#FF6600] rounded-full"></span>
              {selectedGenre === 'Todos' ? 'Catálogo Completo' : `Género: ${selectedGenre}`}
              <span className="text-[#FF6600] text-sm font-black ml-2 bg-[#FF6600]/10 px-3 py-1 rounded-full">
                {filteredGames.length}
              </span>
            </h2>
          </div>

          <motion.div layout className="space-y-4">
            <AnimatePresence mode='popLayout'>
              {currentGames.length > 0 ? (
                currentGames.map((juego) => (
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
                  <p className="text-xl font-bold text-gray-300">No hay juegos aquí 👻</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* COMPONENTE DE PAGINACIÓN TIENDA */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
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
                  // Mostrar solo algunas páginas si hay demasiadas
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
    </main>
  );
}