"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGames } from '../store/useGames';
import { useCurrency } from '../store/useCurrency';

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

export default function Sidebar({ 
  searchQuery, setSearchQuery, 
  selectedGenre, setSelectedGenre,
  selectedPlatform, setSelectedPlatform
}: SidebarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { games } = useGames();
  const { formatPrice } = useCurrency();

  const generos = ['Todos', 'Acción', 'Aventura', 'RPG', 'Estrategia', 'Shooter', 'Deportes', 'Terror', 'Indie'];

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

 
  const sugerencias = localQuery.trim() === '' 
    ? [] 
    : games.filter(g => g.title.toLowerCase().includes(localQuery.toLowerCase())).slice(0, 5);

  
  const handleSelectSuggestion = (title: string) => {
    setLocalQuery(title);
    setSearchQuery(title); 
    setShowSuggestions(false);
  };

  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(localQuery); 
      setShowSuggestions(false);  
    }
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 p-6 bg-[#121212] rounded-2xl border border-gray-800/50 shadow-2xl">
      
      {/*(LIVE SEARCH) */}
      <div className="mb-8 relative" ref={dropdownRef}>
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-xs flex items-center gap-2">
          <span className="text-[#FF6600]">🔍</span> Buscar Juego
        </h3>
        <div className="relative w-full">
          <input 
            type="text" 
            value={localQuery}
            onChange={(e) => {
              const valor = e.target.value;
              setLocalQuery(valor);
              setShowSuggestions(true);
              
              if (valor.trim() === '') {
                setSearchQuery('');
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: Elden Ring..." 
            className="w-full bg-black/50 border-2 border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#FF6600] outline-none transition-all placeholder-gray-500 relative z-10"
          />

          {/* MENÚ DESPLEGABLE DE SUGERENCIAS */}
          <AnimatePresence>
            {showSuggestions && sugerencias.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[100]"
              >
                {sugerencias.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleSelectSuggestion(game.title)}
                    className="flex items-center gap-3 p-3 hover:bg-[#FF6600]/10 cursor-pointer transition-colors border-b border-gray-800 last:border-0 group"
                  >
                    <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden bg-black border border-gray-700 group-hover:border-[#FF6600] transition-colors">
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-white text-sm font-bold truncate group-hover:text-[#FF6600] transition-colors leading-tight">
                        {game.title}
                      </h4>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-0.5">
                        {game.genre}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-[#FF6600] font-black text-sm block">
                        {formatPrice(game.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            
            {showSuggestions && localQuery.trim() !== '' && sugerencias.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl p-4 text-center z-[100]"
              >
                <p className="text-gray-400 text-sm font-medium">No se encontraron juegos 👻</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* GÉNEROS MEJORADOS */}
      <div>
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-xs flex items-center gap-2 border-b border-gray-800 pb-2">
          <span className="text-[#FF6600]">🎮</span> Explora por Género
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {generos.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedGenre(cat)}
              className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold text-center transition-all duration-300 ${
                selectedGenre === cat 
                  ? 'bg-gradient-to-r from-[#FF6600] to-orange-500 text-white shadow-[0_4px_15px_rgba(255,102,0,0.4)] scale-105 border-transparent' 
                  : 'bg-black/40 text-gray-400 border border-gray-800 hover:border-gray-500 hover:text-white hover:bg-black/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}