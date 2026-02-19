import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import GameCard from '../components/GameCard';

// DATOS REALES DE STEAM (Con imágenes que no fallan)
const JUEGOS_DATA = [
  { 
    id: 1, 
    title: "Resident Evil 4 Remake", 
    price: 29.99, 
    oldPrice: 59.99, 
    region: "LATAM", 
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg" 
  },
  { 
    id: 2, 
    title: "Elden Ring", 
    price: 34.50, 
    oldPrice: 59.99, 
    region: "GLOBAL", 
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg" 
  },
  { 
    id: 3, 
    title: "EA SPORTS FC 24", 
    price: 19.99, 
    oldPrice: 69.99, 
    region: "GLOBAL", 
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2195250/header.jpg" 
  },
  { 
    id: 4, 
    title: "Cyberpunk 2077", 
    price: 45.00, 
    oldPrice: 89.99, 
    region: "GLOBAL", 
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg" 
  },
];

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* HERO SECTION (ENCABEZADO IMPACTANTE) */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        {/* Efecto de luz de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic tracking-tighter leading-none drop-shadow-lg">
            Tus Juegos. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-500">Al Instante.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            La tienda de <strong className="text-white">Steam Keys</strong> más rápida y segura de Latinoamérica.
          </p>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL: SIDEBAR + LISTA */}
      <div className="container mx-auto px-4 pb-16 flex flex-col lg:flex-row gap-8">
        
        {/* COLUMNA IZQUIERDA (FILTROS) */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Sidebar />
        </div>

        {/* COLUMNA DERECHA (JUEGOS) */}
        <div className="flex-1">
          {/* Barra de título de la lista */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-[#121212] p-4 rounded-2xl border border-gray-800/50">
            <h2 className="text-xl font-bold text-white mb-4 sm:mb-0 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-brand-orange rounded-full"></span>
              Ofertas Destacadas
              <span className="text-gray-500 text-sm font-medium ml-2">({JUEGOS_DATA.length})</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm font-medium">Ordenar:</span>
              <select className="bg-[#0a0a0a] border-2 border-gray-800 text-white text-sm rounded-xl px-4 py-2 focus:border-brand-orange outline-none cursor-pointer">
                <option>Populares</option>
                <option>Menor Precio</option>
              </select>
            </div>
          </div>

          {/* Renderizado de las tarjetas */}
          <div className="space-y-4">
            {JUEGOS_DATA.map((juego) => (
              <GameCard 
                key={juego.id}
                title={juego.title}
                price={juego.price}
                oldPrice={juego.oldPrice}
                image={juego.image}
                region={juego.region}
              />
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}