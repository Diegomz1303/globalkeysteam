"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import GameCard from '../components/GameCard';
import GameModal from '../components/GameModal';
import { useGames } from '../store/useGames';

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  
  // Extraemos los juegos y la función para traerlos de la base de datos
  const { games, fetchGames } = useGames();

  // Esto hace que la página busque los juegos en tu base de datos apenas cargue
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <main className="min-h-screen font-sans selection:bg-[#FF6600] selection:text-white pb-16 relative">
      <Navbar />

      {/* RENDERIZAMOS EL MODAL SI HAY UN JUEGO SELECCIONADO */}
      {selectedGame && (
        <GameModal juego={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

      {/* HERO SECTION */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF6600]/20 blur-[120px] rounded-full pointer-events-none opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic tracking-tighter leading-none drop-shadow-lg">
            Tus Juegos. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-500">Al Instante.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            La tienda de <strong className="text-white">Steam Keys</strong> más rápida y segura de Latinoamérica.
          </p>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL: SIDEBAR + LISTA */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <div className="lg:sticky lg:top-24 h-fit"><Sidebar /></div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-[#121212] p-4 rounded-2xl border border-gray-800/50">
            <h2 className="text-xl font-bold text-white mb-4 sm:mb-0 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-[#FF6600] rounded-full"></span>
              Ofertas Destacadas
              <span className="text-gray-500 text-sm font-medium ml-2">({games.length})</span>
            </h2>
          </div>

          {/* LISTA DINÁMICA DE JUEGOS DESDE LA BASE DE DATOS */}
          <div className="space-y-4">
            {games.length === 0 ? (
              // Mensaje elegante si tu base de datos está vacía
              <div className="text-center py-20 bg-[#121212] border border-gray-800 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-600"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                <p className="text-xl font-bold text-gray-400 mb-2">Catálogo vacío</p>
                <p className="text-sm text-gray-500">Aún no hay juegos en la base de datos. ¡Agrega algunos!</p>
              </div>
            ) : (
              games.map((juego) => (
                <GameCard 
                  key={juego.id}
                  juego={juego}
                  onClick={() => setSelectedGame(juego)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}