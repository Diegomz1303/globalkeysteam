"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GameCard from '../../components/GameCard';
import GameModal from '../../components/GameModal';
import { useWishlist } from '../../store/useWishlist';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  // Evitar error de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] font-sans selection:bg-[#FF6600] selection:text-white pt-24 pb-12 flex flex-col">
      <Navbar />

      {selectedGame && (
        <GameModal juego={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

      <div className="container mx-auto px-4 flex-1 max-w-6xl mt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-gray-800 pb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FF6600] transition-colors font-bold mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a la Tienda
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Lista de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Deseos</span>
            </h1>
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-black px-4 py-1.5 rounded-lg text-lg">
              {wishlist.length}
            </span>
          </div>
          <p className="text-gray-400 mt-4 text-lg">Juegos que has guardado para comprar más tarde.</p>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121212] border border-gray-800 rounded-3xl p-12 text-center shadow-2xl mt-10">
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500 w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h2 className="text-2xl font-black text-white mb-4">No tienes favoritos aún</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Explora nuestro catálogo y dale clic al corazón en los juegos que te interesen para guardarlos aquí.</p>
            <Link href="/" className="bg-[#FF6600] text-white font-black px-8 py-4 rounded-xl inline-block hover:bg-orange-600 transition-colors shadow-lg">
              Explorar Catálogo
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {wishlist.map((juego) => (
                <motion.div
                  key={juego.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.2 }}
                >
                  <GameCard juego={juego} onClick={() => setSelectedGame(juego)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mt-auto pt-16">
         <Footer />
      </div>
    </main>
  );
}