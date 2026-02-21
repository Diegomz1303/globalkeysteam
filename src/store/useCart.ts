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
  isCartOpen: boolean;
  toastMessage: string | null;
  addToCart: (game: Game) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Variable para controlar el tiempo de la notificación
let toastTimeout: NodeJS.Timeout;

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      isCartOpen: false,
      toastMessage: null,
      
      addToCart: (game) => {
        set((state) => {
          const yaExiste = state.cart.find((item) => item.id === game.id);
          return { 
            // Sumamos el juego al carrito en lugar de reemplazarlo
            cart: yaExiste ? state.cart : [...state.cart, game],
            toastMessage: yaExiste ? `¡${game.title} ya estaba en el carrito!` : `¡Agregado: ${game.title}!`
          };
        });

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          set({ toastMessage: null });
        }, 3000);
      },

      removeFromCart: (id) => set((state) => ({ 
        cart: state.cart.filter((item) => item.id !== id) 
      })),
      clearCart: () => set({ cart: [] }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: 'globalkeysteam-cart', 
      partialize: (state) => ({ cart: state.cart }), 
    }
  )
);