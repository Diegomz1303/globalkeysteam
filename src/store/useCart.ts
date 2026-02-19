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

// Variable fuera del estado para controlar el tiempo de la notificación sin errores
let toastTimeout: NodeJS.Timeout;

export const useCart = create<CartStore>()(
  // Envolvemos todo en persist()
  persist(
    (set) => ({
      cart: [],
      isCartOpen: false,
      toastMessage: null,
      
      addToCart: (game) => {
        set((state) => {
          const yaExiste = state.cart.find((item) => item.id === game.id);
          return { 
            cart: yaExiste ? state.cart : [...state.cart, game],
            // Mensaje dinámico de la animación
            toastMessage: yaExiste ? `¡${game.title} ya estaba en el carrito!` : `¡Agregado: ${game.title}!`
          };
        });

        // Desaparecer la animación después de 3 segundos
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
      name: 'globalkeysteam-cart', // Nombre bajo el que se guardará en localStorage
      partialize: (state) => ({ cart: state.cart }), // Solo guardamos los items del carrito, no el estado del modal o toast
    }
  )
);