import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  wishlist: any[];
  toggleWishlist: (juego: any) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      
      toggleWishlist: (juego) => {
        const { wishlist } = get();
        const exists = wishlist.some((item) => item.id === juego.id);
        
        if (exists) {
          // Si ya está, lo quitamos
          set({ wishlist: wishlist.filter((item) => item.id !== juego.id) });
        } else {
          // Si no está, lo agregamos
          set({ wishlist: [...wishlist, juego] });
        }
      },

      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id);
      }
    }),
    {
      name: 'wishlist-storage', // Nombre con el que se guarda en el LocalStorage
    }
  )
);