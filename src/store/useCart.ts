import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Game {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartStore {
  cart: Game[];
  addToCart: (game: Game) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      
      // ESTA ES LA CLAVE: Usamos una función que borra lo viejo y pone solo el juego nuevo
      addToCart: (game) => set(() => ({ cart: [game] })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'globalkeysteam-cart', 
    }
  )
);