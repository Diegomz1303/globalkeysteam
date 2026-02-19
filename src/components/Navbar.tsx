import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-brand-dark border-b-2 border-brand-orange sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white group-hover:border-brand-orange transition">
            {/* Asegúrate de que tu imagen se llame logo.png en la carpeta public */}
             <Image 
               src="/logo.png" 
               alt="GlobalKeySteam" 
               fill 
               className="object-cover"
             />
          </div>
          <span className="text-xl md:text-2xl font-bold text-white tracking-wide">
            GLOBAL<span className="text-brand-orange">KeySTEAM</span>
          </span>
        </Link>

        {/* BOTÓN WHATSAPP */}
        <a 
          href="https://wa.me/51999999999" 
          target="_blank"
          className="bg-brand-orange hover:bg-orange-700 text-white font-bold py-2 px-5 rounded-full transition shadow-lg shadow-orange-500/20 text-sm md:text-base"
        >
          Soporte
        </a>
      </div>
    </nav>
  );
}