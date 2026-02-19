import { create } from 'zustand';

export interface Game {
  id: number;
  title: string;
  price: number;
  oldPrice?: number | null;
  region: string;
  stock: number;
  image: string;
  description: string;
  screenshots: string; 
  os?: string | null;
  cpu?: string | null;
  ram?: string | null;
  gpu?: string | null;
  genre: string;     // <-- Aseguramos que estén para los filtros
  platform: string;  // <-- Aseguramos que estén para los filtros
}

interface GamesStore {
  games: Game[];
  isLoading: boolean; // <-- NUEVO: Para controlar el Skeleton Loader
  fetchGames: () => Promise<void>;
}

export const useGames = create<GamesStore>((set) => ({
  games: [],
  isLoading: true, // Empieza cargando por defecto
  
  fetchGames: async () => {
    set({ isLoading: true }); // Activamos el loader al empezar a buscar
    try {
      const response = await fetch('/api/games');
      const data = await response.json();
      set({ games: data, isLoading: false }); // Desactivamos el loader al terminar
    } catch (error) {
      console.error("Error cargando juegos desde la base de datos:", error);
      set({ isLoading: false });
    }
  }
}));