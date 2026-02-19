"use client";

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

export default function Sidebar({ searchQuery, setSearchQuery, selectedGenre, setSelectedGenre }: SidebarProps) {
  const generos = ['Todos', 'Acción', 'Aventura', 'RPG', 'Estrategia', 'Shooter', 'Deportes', 'Terror', 'Indie'];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 p-6 bg-[#121212] rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/50">
      
      {/* BUSCADOR INTERACTIVO */}
      <div className="mb-10">
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm flex items-center gap-2">
          <span className="text-[#FF6600]">🔍</span> Buscar Juego
        </h3>
        <div className="relative group">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ej: Elden Ring..." 
            className="w-full bg-black/50 border-2 border-gray-800 text-white rounded-xl px-4 py-3 pl-10 focus:border-[#FF6600] focus:ring-2 focus:ring-[#FF6600]/20 focus:outline-none transition-all duration-300 placeholder-gray-500 group-hover:border-gray-700"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5 group-focus-within:text-[#FF6600] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* CATEGORÍAS INTERACTIVAS */}
      <div className="mb-10">
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm border-b border-gray-800 pb-2 flex items-center gap-2">
          <span className="text-[#FF6600]">🎮</span> Géneros
        </h3>
        <ul className="space-y-1">
          {generos.map((cat) => (
            <li key={cat}>
              <button 
                onClick={() => setSelectedGenre(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  selectedGenre === cat 
                  ? 'bg-[#FF6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.3)]' 
                  : 'text-gray-400 hover:text-white hover:bg-[#FF6600]/10 hover:border-l-4 hover:border-[#FF6600]'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
}