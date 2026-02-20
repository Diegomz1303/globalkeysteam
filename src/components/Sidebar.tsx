"use client";
import { useState, useEffect } from 'react';

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

export default function Sidebar({ 
  searchQuery, setSearchQuery, 
  selectedGenre, setSelectedGenre,
  priceRange, setPriceRange,
  selectedPlatform, setSelectedPlatform
}: SidebarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const generos = ['Todos', 'Acción', 'Aventura', 'RPG', 'Estrategia', 'Shooter', 'Deportes', 'Terror', 'Indie'];
  const precios = [
    { label: 'Todos', value: 'all' },
    { label: 'Menos de S/ 20', value: '20' },
    { label: 'S/ 20 - S/ 50', value: '50' },
    { label: 'Más de S/ 50', value: 'plus' },
  ];

  useEffect(() => {
    const handler = setTimeout(() => setSearchQuery(localQuery), 300);
    return () => clearTimeout(handler);
  }, [localQuery, setSearchQuery]);

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 p-6 bg-[#121212] rounded-2xl border border-gray-800/50 shadow-2xl">
      
      {/* BUSCADOR */}
      <div className="mb-8">
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-xs flex items-center gap-2">
          <span className="text-[#FF6600]">🔍</span> Buscar Juego
        </h3>
        <input 
          type="text" 
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Ej: Elden Ring..." 
          className="w-full bg-black/50 border-2 border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#FF6600] outline-none transition-all placeholder-gray-500"
        />
      </div>

      {/* FILTRO POR PRECIO */}
      <div className="mb-8">
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-xs flex items-center gap-2 border-b border-gray-800 pb-2">
          <span className="text-[#FF6600]">💰</span> Rango de Precio
        </h3>
        <div className="space-y-2">
          {precios.map((p) => (
            <button 
              key={p.value}
              onClick={() => setPriceRange(p.value)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${priceRange === p.value ? 'bg-[#FF6600] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* GÉNEROS */}
      <div>
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-xs flex items-center gap-2 border-b border-gray-800 pb-2">
          <span className="text-[#FF6600]">🎮</span> Géneros
        </h3>
        <div className="flex flex-wrap gap-2">
          {generos.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedGenre(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedGenre === cat ? 'bg-[#FF6600] text-white' : 'bg-black/50 text-gray-400 border border-gray-800 hover:border-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}