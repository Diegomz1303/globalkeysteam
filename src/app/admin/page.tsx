"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGames } from '../../store/useGames';
import { useCurrency } from '../../store/useCurrency';

import AdminSidebar from '../admin/AdminSidebar';
import GameFormModal from '../admin/GameFormModal';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { games, fetchGames } = useGames();
  const { formatPrice, currency } = useCurrency();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'productos'>('productos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  // NUEVO ESTADO: Menú móvil
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchTermAdmin, setSearchTermAdmin] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchGames();
    }
  }, [router, fetchGames]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTermAdmin]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.replace('/admin/login');
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => 
      game.title.toLowerCase().includes(searchTermAdmin.toLowerCase())
    );
  }, [games, searchTermAdmin]);

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const currentGames = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGames.slice(start, start + itemsPerPage);
  }, [filteredGames, currentPage]);

  const handleDelete = async (id: number, title: string) => {
    const confirmDelete = window.confirm(`¿Eliminar permanentemente "${title}"?`);
    if (!confirmDelete) return;

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/games/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('¡Juego eliminado!', 'success');
        fetchGames();
      } else {
        showToast('Error al eliminar', 'error');
      }
    } catch (error) {
      showToast('Error de conexión', 'error');
    }
  };

  const openEditModal = (juego: any) => {
    setGameToEdit(juego);
    setIsModalOpen(true);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden relative w-full">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] relative flex flex-col w-full">
        
        {/* CABECERA MÓVIL (Solo se ve en celulares) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-[#121212] sticky top-0 z-30 shadow-lg">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" width={28} height={28} alt="Logo" className="drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
            <h1 className="text-sm font-black tracking-wide leading-none">GLOBALKEY<span className="text-[#FF6600]">STEAM</span></h1>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:text-[#FF6600] hover:border-[#FF6600] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>

        {/* Brillo decorativo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6600]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="p-4 md:p-8 flex-1 flex flex-col relative z-10">
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl md:text-3xl font-black mb-6 border-b border-gray-800 pb-4">Resumen General</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-gray-400 font-bold mb-2">Total de Juegos</h3>
                  <p className="text-4xl md:text-5xl font-black text-white">{games.length}</p>
                </div>
                <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-gray-400 font-bold mb-2">Stock en Sistema</h3>
                  <p className="text-4xl md:text-5xl font-black text-[#FF6600]">
                    {games.reduce((acc, g) => acc + (g.stock || 0), 0)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'productos' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
              
              {/* CABECERA CON BUSCADOR */}
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4 border-b border-gray-800 pb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black">Catálogo de Productos</h2>
                  <p className="text-gray-500 text-sm font-bold mt-1">Gestiona tus {filteredGames.length} juegos disponibles</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                  <div className="relative w-full sm:w-64 flex-shrink-0">
                    <input 
                      type="text" 
                      placeholder="Buscar producto..."
                      value={searchTermAdmin}
                      onChange={(e) => setSearchTermAdmin(e.target.value)}
                      className="w-full bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 pl-10 text-sm focus:border-[#FF6600] outline-none transition-all"
                    />
                    <svg className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>

                  <button 
                    onClick={() => { setGameToEdit(null); setIsModalOpen(true); }}
                    className="bg-[#FF6600] hover:bg-orange-600 text-white font-black py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    CREAR JUEGO
                  </button>
                </div>
              </div>

              {/* TABLA DE PRODUCTOS (Optimizada para Móvil) */}
              <div className="bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex-1 flex flex-col">
                <div className="grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 border-b border-gray-800 text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-wider bg-black/40">
                  <div className="col-span-6 md:col-span-6">Producto</div>
                  <div className="col-span-3 md:col-span-2">Precio</div>
                  <div className="hidden md:block md:col-span-2">Stock</div>
                  <div className="col-span-3 md:col-span-2 text-center">Acciones</div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <AnimatePresence mode='wait'>
                    {currentGames.length > 0 ? (
                      currentGames.map((juego) => (
                        <motion.div 
                          key={juego.id}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 border-b border-gray-800/50 items-center hover:bg-white/5 transition-colors group"
                        >
                          <div className="col-span-6 md:col-span-6 flex items-center gap-3">
                            <div className="hidden sm:block relative w-12 h-8 rounded overflow-hidden bg-gray-900 flex-shrink-0 border border-gray-700">
                              <img src={juego.image || '/logo.png'} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="truncate w-full pr-2">
                              <p className="font-bold text-white text-xs md:text-base truncate">{juego.title}</p>
                              <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-black">{juego.genre || 'General'}</p>
                            </div>
                          </div>
                          
                          <motion.div 
                            key={currency} 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                            className="col-span-3 md:col-span-2 font-black text-[#FF6600] text-xs md:text-base truncate"
                          >
                            {formatPrice(juego.price)}
                          </motion.div>

                          <div className="hidden md:block md:col-span-2 font-bold text-gray-400 text-sm">{juego.stock || 0} u.</div>
                          
                          <div className="col-span-3 md:col-span-2 flex justify-center gap-1.5 md:gap-2">
                            <button onClick={() => openEditModal(juego)} className="p-1.5 md:p-2.5 bg-blue-500/10 text-blue-400 rounded-lg md:rounded-xl hover:bg-blue-500 hover:text-white transition-all" title="Editar">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button onClick={() => handleDelete(juego.id, juego.title)} className="p-1.5 md:p-2.5 bg-red-500/10 text-red-400 rounded-lg md:rounded-xl hover:bg-red-500 hover:text-white transition-all" title="Eliminar">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                            </button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 md:py-20 text-gray-500 italic px-4 text-center">
                        <p className="text-sm md:text-base">No se encontraron productos que coincidan con tu búsqueda.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* PAGINACIÓN */}
                {totalPages > 1 && (
                  <div className="p-3 md:p-4 bg-black/40 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">
                      Mostrando <span className="text-white">{currentGames.length}</span> de <span className="text-white">{filteredGames.length}</span>
                    </p>
                    
                    <div className="flex items-center gap-1">
                      <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-1.5 md:p-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 disabled:opacity-20 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                      </button>

                      <div className="flex items-center gap-1 px-2">
                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-7 h-7 md:w-8 md:h-8 rounded-lg text-[10px] md:text-xs font-black transition-all ${currentPage === pageNum ? 'bg-[#FF6600] text-white shadow-[0_0_10px_rgba(255,102,0,0.5)]' : 'bg-transparent text-gray-500 hover:text-white hover:bg-gray-800'}`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          if (pageNum === currentPage - 2 || pageNum === currentPage + 2) return <span key={pageNum} className="text-gray-700">.</span>;
                          return null;
                        })}
                      </div>

                      <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-1.5 md:p-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 disabled:opacity-20 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <GameFormModal 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={(m) => { fetchGames(); showToast(m); }} 
            gameToEdit={gameToEdit} 
          />
        )}
        
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
            className={`fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[100] bg-[#121212] border-l-4 px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-2xl flex items-center gap-3 ${toastMessage.type === 'success' ? 'border-green-500' : 'border-red-500'}`}
          >
            <p className="font-bold text-white text-xs md:text-sm tracking-wide">{toastMessage.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}