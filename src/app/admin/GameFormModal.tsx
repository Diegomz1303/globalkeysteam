"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameFormModalProps {
  onClose: () => void;
  onSuccess: (mensaje: string) => void; 
  gameToEdit?: any; 
}

export default function GameFormModal({ onClose, onSuccess, gameToEdit }: GameFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  // NUEVO: Estado para la notificación bonita
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  
  // ELIMINADOS: os, cpu, ram, gpu (Requisitos del sistema)
  const [formData, setFormData] = useState({
    title: '', price: '', region: 'GLOBAL', stock: '10', image: '', description: '', 
    genre: 'Acción', 
    platform: 'Steam',
    stripeLink: '',
    isFeatured: false
  });

  useEffect(() => {
    if (gameToEdit) {
      setFormData({
        title: gameToEdit.title, 
        price: gameToEdit.price.toString(), 
        region: gameToEdit.region,
        stock: gameToEdit.stock.toString(), 
        image: gameToEdit.image, 
        description: gameToEdit.description,
        genre: gameToEdit.genre || 'Acción', 
        platform: gameToEdit.platform || 'Steam',
        stripeLink: gameToEdit.stripeLink || '',
        isFeatured: gameToEdit.isFeatured || false
      });
    }
  }, [gameToEdit]);

  // Función para mostrar la notificación bonita en lugar del "alert"
  const showToast = (text: string, type: 'success' | 'error') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000); // Se oculta sola después de 4 segundos
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1080;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Error al comprimir'));
            }
          }, 'image/jpeg', 0.8);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      const compressedFile = await compressImage(file);
      
      const imgData = new FormData();
      imgData.append('image', compressedFile);

      // ¡RECUERDA PONER TU API KEY AQUÍ!
      const response = await fetch('https://api.imgbb.com/1/upload?key=3f26d987f53b65fedab56934d696b37c', {
        method: 'POST',
        body: imgData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, image: data.data.url });
        // Usamos nuestra notificación bonita en vez del alert feo
        showToast('¡Imagen optimizada y subida con éxito!', 'success');
      } else {
        showToast('Error al subir la imagen a ImgBB', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Error de conexión al subir imagen', 'error');
    } finally {
      setIsUploadingImage(false);
    }
  };

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
        showToast(`Error: ${data.error}`, 'error');
      }
    } catch (error) {
      showToast('Error de conexión.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" />

      {/* NOTIFICACIÓN BONITA FLOTANTE */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }} 
            animate={{ opacity: 1, y: 20, x: '-50%' }} 
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`absolute top-0 left-1/2 z-[100] px-6 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] font-bold flex items-center gap-3 border ${
              toastMessage.type === 'success' 
                ? 'bg-[#121212] border-green-500/50 text-green-400' 
                : 'bg-[#121212] border-red-500/50 text-red-400'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            )}
            {toastMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

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

              <div className="md:col-span-2 mt-4">
                <h3 className="text-[#FF6600] font-bold uppercase tracking-wider text-sm mb-4 border-b border-gray-800 pb-2">Configuración Especial de Ventas</h3>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Plantilla Rápida de Precio y Link</label>
                <select 
                  onChange={(e) => {
                    if (e.target.value === '33') {
                      setFormData({...formData, price: '33', stripeLink: 'https://buy.stripe.com/eVq9ATfni8bA6StevmbV604'});
                    } else if (e.target.value === '50') {
                      setFormData({...formData, price: '50', stripeLink: 'https://buy.stripe.com/eVqfZhb72fE2gt372UbV605'});
                    }
                  }} 
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors"
                >
                  <option value="">-- Seleccionar o Personalizado --</option>
                  <option value="33">Estándar (33 Soles)</option>
                  <option value="50">Premium (50 Soles)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-1">Enlace de Stripe (Checkout)</label>
                <input type="text" value={formData.stripeLink} onChange={(e) => setFormData({...formData, stripeLink: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" placeholder="https://buy.stripe.com/..." />
              </div>

              <div className="md:col-span-2 flex items-center gap-3 bg-[#0a0a0a] border border-gray-700 p-4 rounded-xl mb-4">
                <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-6 h-6 accent-[#FF6600] cursor-pointer" />
                <label htmlFor="isFeatured" className="text-white font-bold cursor-pointer select-none">
                  ⭐ Destacar este juego en el Banner Principal
                </label>
                <p className="text-gray-500 text-xs ml-auto hidden md:block">Aparecerá en el slider inicial de la tienda.</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-bold mb-1">Imagen (Sube una foto o pega el Link)</label>
                
                {/* BOTÓN PARA SUBIR FOTO */}
                <div className="mb-3">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#FF6600] file:text-white hover:file:bg-orange-600 transition-all cursor-pointer bg-[#0a0a0a] border border-gray-700 rounded-xl py-2 px-2"
                  />
                  {isUploadingImage && <p className="text-[#FF6600] text-sm mt-2 font-bold animate-pulse">Optimizando y subiendo imagen...</p>}
                </div>

                {/* INPUT DE URL MANTENIDO EXACTAMENTE IGUAL QUE ANTES */}
                <div className="flex gap-4 items-center">
                  <input type="text" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors" placeholder="https://..." />
                  {formData.image && (
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-800 border border-gray-700 flex-shrink-0">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-bold mb-1">Descripción</label>
                <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#FF6600] outline-none transition-colors resize-none" placeholder="Sinopsis del juego..."></textarea>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 pt-4 pb-2 bg-[#121212] z-20">
            <button type="submit" disabled={isSubmitting || isUploadingImage} className="w-full bg-gradient-to-r from-[#FF6600] to-orange-500 hover:from-orange-500 hover:to-[#FF6600] text-white font-black text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:shadow-[0_0_30px_rgba(255,102,0,0.5)] active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2 uppercase">
              {isSubmitting ? 'GUARDANDO...' : (gameToEdit ? 'ACTUALIZAR JUEGO' : 'PUBLICAR EN LA TIENDA')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}