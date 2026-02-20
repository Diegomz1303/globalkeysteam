"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GameFormModalProps {
  onClose: () => void;
  onSuccess: (mensaje: string) => void; 
  gameToEdit?: any; // Si viene vacío, crea. Si trae datos, edita.
}

export default function GameFormModal({ onClose, onSuccess, gameToEdit }: GameFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '', price: '', region: 'GLOBAL', stock: '10', image: '', description: '', os: '', cpu: '', ram: '', gpu: '', 
    genre: 'Acción', // Añadimos el género por defecto
    platform: 'Steam' // <--- AÑADIDO: Plataforma por defecto para evitar undefined
  });

  // Si nos pasan un juego para editar, llenamos el formulario
  useEffect(() => {
    if (gameToEdit) {
      setFormData({
        title: gameToEdit.title, 
        price: gameToEdit.price.toString(), 
        region: gameToEdit.region,
        stock: gameToEdit.stock.toString(), 
        image: gameToEdit.image, 
        description: gameToEdit.description,
        os: gameToEdit.os || '', 
        cpu: gameToEdit.cpu || '', 
        ram: gameToEdit.ram || '', 
        gpu: gameToEdit.gpu || '',
        genre: gameToEdit.genre || 'Acción', // Cargamos el género si existe
        platform: gameToEdit.platform || 'Steam' // <--- AÑADIDO: Cargamos la plataforma si existe
      });
    }
  }, [gameToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('adminToken');

    const url = gameToEdit ? `/api/games/${gameToEdit.id}` : '/api/games';
    const method = gameToEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          ...formData, 
          price: parseFloat(formData.price), 
          stock: parseInt(formData.stock), 
          screenshots: ''
        })
      });

      if (res.ok) {
        onSuccess(gameToEdit ? '¡Juego actualizado correctamente!' : '¡Juego publicado exitosamente!');
        onClose();
      } else {
        const data = await res.json();
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert('Error de conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" />

      <motion.div initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }} transition={{ type: "spring", bounce: 0.4, duration: 0.6 }} className="relative bg-[#121212] border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col z-10">
        <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 p-6 flex justify-between items-center z-20">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="text-[#FF6600]">{gameToEdit ? '✏️' : '🚀'}</span> {gameToEdit ? 'Editar Juego' : 'Crear Nuevo Juego'}
          </h2>
          <button onClick={onClose} type="button" className="text-gray-400 hover:text-white bg-gray-900 p-2 rounded-full transition-colors hover:bg-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div>
            <h3 className="text-[#FF6600] font-bold uppercase tracking-wider text-sm mb-4 border-b border-gray-800 pb-2">Datos Principales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-bold mb-1">Título del Juego</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" placeholder="Ej: Cyberpunk 2077" />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Precio (S/)</label>
                <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Stock Disponible</label>
                <input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Región</label>
                <select value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors">
                  <option value="GLOBAL">GLOBAL</option>
                  <option value="LATAM">LATAM</option>
                  <option value="US">US</option>
                  <option value="EU">EU</option>
                </select>
              </div>

              {/* NUEVO: SELECTOR DE GÉNERO */}
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Género</label>
                <select value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors">
                  <option value="Acción">Acción</option>
                  <option value="Aventura">Aventura</option>
                  <option value="RPG">RPG</option>
                  <option value="Estrategia">Estrategia</option>
                  <option value="Shooter">Shooter</option>
                  <option value="Deportes">Deportes</option>
                  <option value="Terror">Terror</option>
                  <option value="Indie">Indie</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-bold mb-1">URL de la Imagen (Portada)</label>
                <div className="flex gap-4 items-center">
                  <input type="text" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" placeholder="https://..." />
                  {formData.image && (
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-800 border border-gray-700 flex-shrink-0">
                      {/* Usamos <img> normal para evitar errores en tiempo real con Next.js */}
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                </div>
              </div>
              

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-bold mb-1">Descripción</label>
                <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors resize-none" placeholder="Sinopsis del juego..."></textarea>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#FF6600] font-bold uppercase tracking-wider text-sm mb-4 border-b border-gray-800 pb-2">Requisitos del Sistema (PC)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Sistema Operativo (OS)</label>
                <input type="text" value={formData.os} onChange={(e) => setFormData({...formData, os: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Procesador (CPU)</label>
                <input type="text" value={formData.cpu} onChange={(e) => setFormData({...formData, cpu: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Memoria RAM</label>
                <input type="text" value={formData.ram} onChange={(e) => setFormData({...formData, ram: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Tarjeta Gráfica (GPU)</label>
                <input type="text" value={formData.gpu} onChange={(e) => setFormData({...formData, gpu: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 pt-4 pb-2 bg-[#121212] z-20">
            <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#FF6600] to-orange-500 hover:from-orange-500 hover:to-[#FF6600] text-white font-black text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:shadow-[0_0_30px_rgba(255,102,0,0.5)] active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2 uppercase">
              {isSubmitting ? 'GUARDANDO...' : (gameToEdit ? 'ACTUALIZAR JUEGO' : 'PUBLICAR EN LA TIENDA')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}