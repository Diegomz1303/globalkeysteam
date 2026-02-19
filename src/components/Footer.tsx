"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-gray-800/60 pt-16 pb-8 mt-20 relative overflow-hidden">
      {/* Brillo de fondo para el footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF6600]/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          
          {/* Columna 1: Logo y Descripción */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="GlobalKeySteam Logo" width={40} height={40} className="object-contain drop-shadow-[0_0_12px_rgba(255,102,0,0.6)]" />
              <span className="text-xl font-bold text-white tracking-wide">
                GLOBAL<span className="text-[#FF6600]">KeySTEAM</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
              Tu tienda de confianza para adquirir juegos digitales al mejor precio y con entrega inmediata en todo el mundo.
            </p>
          </div>

          {/* Columna 2: Únete a la Comunidad (Discord) */}
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF6600] rounded-full"></span>
              Comunidad Oficial
            </h4>
            <a 
              href="https://discord.gg/rYBszD3B" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 bg-[#5865F2]/10 hover:bg-[#5865F2] border border-[#5865F2]/30 hover:border-[#5865F2] p-4 rounded-2xl transition-all duration-300 w-full max-w-[250px]"
            >
              <div className="bg-[#5865F2] p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77.7,77.7,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
              </div>
              <div>
                <p className="text-[#5865F2] group-hover:text-white font-black text-sm uppercase tracking-wider transition-colors">Únete al Discord</p>
                <p className="text-gray-500 group-hover:text-white/80 text-xs font-medium transition-colors">Soporte y Sorteos</p>
              </div>
            </a>
          </div>

          {/* Columna 3: Métodos de pago seguros */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              Pago 100% Seguro
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </h4>
            
            <p className="text-gray-600 text-xs mt-4 font-medium">Sin pasarelas de pago, sin comisiones extra.</p>
          </div>

        </div>

        {/* Línea inferior */}
        <div className="border-t border-gray-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} GlobalKeySteam. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <span className="hover:text-[#FF6600] cursor-pointer transition-colors">Términos de Servicio</span>
            <span className="hover:text-[#FF6600] cursor-pointer transition-colors">Política de Reembolso</span>
          </div>
        </div>
      </div>
    </footer>
  );
}