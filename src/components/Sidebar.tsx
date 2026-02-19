export default function Sidebar() {
  return (
    <aside className="w-full md:w-72 flex-shrink-0 p-6 bg-[#121212] rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/50">
      
      {/* BUSCADOR MODERNO */}
      <div className="mb-10">
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm flex items-center gap-2">
          <span className="text-brand-orange">🔍</span> Buscar Juego
        </h3>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Ej: Elden Ring..." 
            className="w-full bg-black/50 border-2 border-gray-800 text-white rounded-xl px-4 py-3 pl-10 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none transition-all duration-300 placeholder-gray-500 group-hover:border-gray-700"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5 group-focus-within:text-brand-orange transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* CATEGORÍAS CON EFECTO HOVER */}
      <div className="mb-10">
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm border-b border-gray-800 pb-2 flex items-center gap-2">
          <span className="text-brand-orange">🎮</span> Géneros
        </h3>
        <ul className="space-y-1">
          {['Acción', 'Aventura', 'RPG', 'Estrategia', 'Shooter', 'Deportes', 'Terror', 'Indie'].map((cat) => (
            <li key={cat}>
              <a href="#" className="block px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-brand-orange/10 hover:border-l-4 hover:border-brand-orange transition-all duration-200 font-medium">
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* FILTRO DE PRECIO */}
      <div>
        <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm border-b border-gray-800 pb-2 flex items-center gap-2">
          <span className="text-brand-orange">💰</span> Precio
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-full">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input type="number" placeholder="Min" className="w-full bg-black/50 border-2 border-gray-800 text-white rounded-xl px-4 py-2 pl-8 focus:border-brand-orange focus:outline-none transition placeholder-gray-500 text-sm" />
          </div>
          <span className="text-gray-400 font-bold">-</span>
          <div className="relative w-full">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input type="number" placeholder="Max" className="w-full bg-black/50 border-2 border-gray-800 text-white rounded-xl px-4 py-2 pl-8 focus:border-brand-orange focus:outline-none transition placeholder-gray-500 text-sm" />
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-brand-orange/20 uppercase tracking-wider text-sm">
          Aplicar Filtro
        </button>
      </div>

    </aside>
  );
}