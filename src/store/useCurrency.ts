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

      // AQUÍ ESTÁ LA CORRECCIÓN
      formatPrice: (price: number) => {
        const { currency } = get();
        
        if (currency === 'PEN') {
          // El precio ya está en soles en tu base de datos, así que NO lo multiplicamos.
          // Solo lo devolvemos tal cual con el símbolo S/
          return `S/ ${price.toFixed(2)}`;
        } else {
          // Si el cliente elige COP (Colombia), convertimos tus Soles a Pesos
          // 1 Sol equivale a aprox 1050 Pesos Colombianos (Puedes ajustar este 1050 si deseas)
          const priceCOP = price * 1050; 
          return `$ ${priceCOP.toLocaleString('es-CO')}`;
        }
      },
    }),
    {
      name: 'globalkeysteam-currency',
    }
  )
);