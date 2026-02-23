import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyStore {
  currency: 'PEN' | 'COP';
  hasManualSelection: boolean;
  setCurrencyManual: (currency: 'PEN' | 'COP') => void;
  initCurrency: () => Promise<void>;
  formatPrice: (price: number) => string;
}

export const useCurrency = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: 'PEN', 
      hasManualSelection: false, 

      setCurrencyManual: (currency) => {
        set({ currency, hasManualSelection: true });
      },

      initCurrency: async () => {
        if (get().hasManualSelection) return;

        try {
          const response = await fetch('https://api.country.is/');
          if (!response.ok) throw new Error("Error en API de IP");
          
          const data = await response.json();
          if (data.country === 'CO') {
            set({ currency: 'COP' });
          } else {
            set({ currency: 'PEN' });
          }
        } catch (error) {
          console.warn('Usando moneda por defecto (PEN)');
          set({ currency: 'PEN' });
        }
      },

      formatPrice: (price: number) => {
        const { currency } = get();
        
        if (currency === 'PEN') {
          return `S/ ${price.toFixed(2)}`;
        } else {
          
          const priceCOP = price * 1104.515; 
          
          
          const roundedCOP = Math.round(priceCOP);
          
          
          const formattedCOP = roundedCOP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          
          
          return `$${formattedCOP} COP`;
        }
      },
    }),
    {
      name: 'globalkeysteam-currency',
    }
  )
);