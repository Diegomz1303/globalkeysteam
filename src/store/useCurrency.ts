import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyStore {
  currency: 'PEN' | 'COP';
  setCurrencyManual: (currency: 'PEN' | 'COP') => void;
  initCurrency: () => Promise<void>;
  formatPrice: (price: number) => string;
}

export const useCurrency = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: 'PEN', 

      setCurrencyManual: (currency) => {
        set({ currency });
      },

      initCurrency: async () => {
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
          const priceCOP = price * 1050; 
          // ¡AQUÍ ESTÁ EL CAMBIO! Agregamos "COP" para diferenciar del Dólar
          return `COP $ ${priceCOP.toLocaleString('es-CO')}`;
        }
      },
    }),
    {
      name: 'globalkeysteam-currency',
    }
  )
);