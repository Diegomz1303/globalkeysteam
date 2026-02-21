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
          // 🚀 AQUÍ ACTUALIZAMOS LA TASA AL VALOR REAL DE GOOGLE DE HOY: 1 PEN = 1101.34 COP
          const priceCOP = price * 1101.34; 
          
          // Redondeamos para quitar los decimales matemáticos
          const roundedCOP = Math.round(priceCOP);
          
          // Forzamos el punto como separador de miles
          const formattedCOP = roundedCOP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          
          // Devolvemos el formato exacto "$36.344 COP"
          return `$${formattedCOP} COP`;
        }
      },
    }),
    {
      name: 'globalkeysteam-currency',
    }
  )
);