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
}

interface GamesStore {
  games: Game[];
  fetchGames: () => Promise<void>;
  // Las demás funciones se conectarán a la BD en el siguiente paso si lo deseas
}

export const useGames = create<GamesStore>((set) => ({
  games: [],
  
  // ¡ESTA ES LA MAGIA! Llama a tu Backend real
  fetchGames: async () => {
    try {
      const response = await fetch('/api/games');
      const data = await response.json();
      set({ games: data });
    } catch (error) {
      console.error("Error cargando juegos desde la base de datos:", error);
    }
  }
}));