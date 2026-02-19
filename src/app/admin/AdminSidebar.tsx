"use client";
import Image from 'next/image';
import Link from 'next/link';

interface AdminSidebarProps {
  activeTab: 'dashboard' | 'productos';
  setActiveTab: (tab: 'dashboard' | 'productos') => void;
  onLogout: () => void;
}

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-[#121212] border-r border-gray-800 flex flex-col shadow-2xl z-10 relative flex-shrink-0">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image src="/logo.png" alt="Logo" fill className="object-contain drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" priority />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-wide leading-tight">GLOBALKEY<span className="text-[#FF6600]">STEAM</span></h1>
          <span className="text-xs text-[#FF6600] font-bold tracking-widest uppercase">Admin Panel</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-[#FF6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.3)]' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
          Dashboard
        </button>
        
        <button onClick={() => setActiveTab('productos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'productos' ? 'bg-[#FF6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.3)]' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          Productos
        </button>
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-3">
        {/* NUEVO BOTÓN: IR A LA TIENDA */}
        <Link href="/" target="_blank" className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-gray-300 border border-gray-700 hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600] px-4 py-3 rounded-xl font-bold transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Ver Tienda
        </Link>

        <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-3 rounded-xl font-bold transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Salir
        </button>
      </div>
    </aside>
  );
}