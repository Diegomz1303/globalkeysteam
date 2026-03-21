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
  genre: string;     
  platform: string;
  stripeLink?: string;
  isFeatured?: boolean;
}

interface GamesStore {
  games: Game[];
  isLoading: boolean; 
  fetchGames: () => Promise<void>;
}

export const useGames = create<GamesStore>((set) => ({
  games: [],
  isLoading: true, 
  
  fetchGames: async () => {
    set({ isLoading: true }); 
    try {
      const response = await fetch('/api/games');
      const data = await response.json();
      set({ games: data, isLoading: false }); 
    } catch (error) {
      console.error("Error cargando juegos desde la base de datos:", error);
      set({ isLoading: false });
    }
  }
}));