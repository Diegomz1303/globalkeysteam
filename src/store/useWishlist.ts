import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Game {
  id: number;
  title: string;
  price: number;
  image: string;
  genre?: string;
}

interface WishlistStore {
  wishlist: Game[];
  toggleWishlist: (game: Game) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (game) => {
        const { wishlist } = get();
        const exists = wishlist.find((item) => item.id === game.id);
        
        if (exists) {
          set({ wishlist: wishlist.filter((item) => item.id !== game.id) });
        } else {
          set({ wishlist: [...wishlist, game] });
        }
      },
      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },
    }),
    {
      name: 'globalkey-wishlist', // Clave en localStorage
    }
  )
);