"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lista de términos y condiciones (con el JSX corregido para evitar errores)
  const terms = [
    {
      title: "Producto digital",
      desc: "Vendemos claves (códigos) originales para activar en Steam.",
      icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    },
    {
      title: "Entrega inmediata",
      desc: "Tras confirmar el pago, recibirás la clave en cuestión de minutos.",
      icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    },
    {
      title: "Garantía total",
      desc: "Si no puedes activarlo, te devolvemos el 100 % del importe.",
      icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    },
    {
      title: "Sin reembolso tras la activación",
      desc: "Al tratarse de un producto digital, no aceptamos devoluciones ni cancelaciones una vez que la clave se ha activado correctamente.",
      icon: <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>
    },
    {
      title: "Compatibilidad",
      desc: "No compatible con Windows 7, Linux, Mac o dispositivos móviles.",
      icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>
    },
    {
      title: "Atención rápida",
      desc: "Asistencia personalizada a través de WhatsApp o correo electrónico, lista para ayudarte con cualquier duda.",
      icon: <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></>
    },
    {
      title: "Acceso de por vida",
      desc: "El juego permanecerá para siempre en tu biblioteca de Steam, con todos los DLC y actualizaciones.",
      icon: <><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"/></>
    }
  ];

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
            {/* AQUÍ REEMPLAZAMOS LOS DOS SPANS POR EL BOTÓN DEL MODAL */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="hover:text-[#FF6600] transition-colors font-medium outline-none"
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
      </div>

      {/* MODAL ANIMADO DE TÉRMINOS Y CONDICIONES */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
            
            {/* Fondo Oscurecido (Backdrop) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            
            {/* Contenedor del Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#121212] border border-gray-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh]"
            >
              {/* Cabecera Fija */}
              <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-10">
                <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                  <span className="text-[#FF6600] bg-[#FF6600]/10 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </span>
                  Términos y Condiciones
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-white bg-gray-900 hover:bg-red-500 p-2 rounded-full transition-all outline-none"
                  aria-label="Cerrar términos"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              {/* Cuerpo del Modal (Scrollable) */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6">
                {terms.map((term, index) => (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white group-hover:border-[#FF6600] transition-all shrink-0 duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {term.icon}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1 leading-tight">{term.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-medium">{term.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botón Inferior */}
              <div className="p-6 border-t border-gray-800 bg-[#0a0a0a]">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-[#FF6600] hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all active:scale-95 uppercase tracking-wide shadow-lg shadow-orange-500/20 outline-none"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}