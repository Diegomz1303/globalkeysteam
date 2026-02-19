import Image from 'next/image';

interface GameProps {
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  region?: string;
}

export default function GameCard({ title, price, oldPrice, image, region = "GLOBAL" }: GameProps) {
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  
  const message = `¡Hola! Quiero comprar la STEAM KEY de *${title}* por $${price}.`;
  const whatsappUrl = `https://wa.me/51999999999?text=${encodeURIComponent(message)}`;

  return (
    <div className="group flex flex-col md:flex-row bg-[#121212] border-2 border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-brand-orange transition-all duration-500 relative hover:shadow-[0_0_30px_rgba(255,102,0,0.15)] mb-4">
      
      {/* IMAGEN */}
      <div className="relative w-full md:w-64 h-56 md:h-auto flex-shrink-0 overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"></div>
        
        {/* Badge de Descuento */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-brand-orange text-white text-sm font-black px-3 py-1 rounded-lg shadow-lg transform -rotate-6">
            -{discount}% OFF
          </div>
        )}
      </div>
      
      {/* INFORMACIÓN */}
      <div className="flex-1 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#1a1a1a] relative z-10 bg-[#121212]">
        <h3 className="text-2xl font-black text-white mb-3 group-hover:text-brand-orange transition-colors duration-300 line-clamp-2 leading-tight">
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Steam Badge */}
          <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-gray-800 text-xs font-bold text-gray-200">
            <svg className="w-4 h-4 text-brand-orange" fill="currentColor" viewBox="0 0 24 24"><path d="M11.979 0C5.666 0 .548 5.135.548 11.468c0 3.39 1.48 6.444 3.826 8.536l2.367-3.483a3.52 3.52 0 0 1-.225-1.246c0-1.95 1.58-3.529 3.529-3.529.58 0 1.124.14 1.605.386l2.844-4.148a7.53 7.53 0 0 1-.035-.724c0-4.17 3.37-7.55 7.53-7.55S29.52 3.08 29.52 7.25c0 4.14-3.32 7.5-7.44 7.55-.17.29-.36.57-.57.83l-2.67-1.84c.3-.67.47-1.41.47-2.19 0-3.09-2.5-5.59-5.59-5.59s-5.59 2.5-5.59 5.59c0 1.25.41 2.41 1.11 3.34l-2.9 4.23a7.58 7.58 0 0 1-1.35-.13l-2.5 3.68c1.33.6 2.8.93 4.34.93 6.31 0 11.43-5.13 11.43-11.47S18.29 0 11.98 0zm0 0"/></svg>
            STEAM KEY
          </span>
          {/* Region Badge */}
          <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-gray-800 text-xs font-bold text-gray-300 uppercase">
            🌍 {region}
          </span>
        </div>

        <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
           <span className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
           </span>
           Entrega Inmediata
        </div>
      </div>

      {/* PRECIO Y ACCIÓN */}
      <div className="w-full md:w-56 p-6 flex flex-col justify-center items-end bg-[#0a0a0a] relative z-10">
        <div className="text-right mb-4">
            {oldPrice && (
                <div className="text-gray-500 text-sm line-through font-medium">${oldPrice.toFixed(2)}</div>
            )}
            <div className="text-4xl font-black text-white tracking-tighter flex items-start gap-1">
              <span className="text-xl mt-1 text-brand-orange">$</span>
              {price.toFixed(2)}
            </div>
        </div>

        <a 
          href={whatsappUrl}
          target="_blank"
          className="w-full group/btn relative overflow-hidden bg-brand-orange rounded-xl text-white font-black py-3 px-4 transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/40 flex items-center justify-center gap-2"
        >
          <div className="absolute inset-0 w-0 bg-white transition-all duration-[400ms] ease-out group-hover/btn:w-full opacity-10"></div>
          <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span className="relative z-10">COMPRAR AHORA</span>
        </a>
      </div>
    </div>
  );
}