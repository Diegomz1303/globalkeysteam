import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  currency: 'PEN' | 'COP';
  symbol: string;
  rate: number; // Multiplicador desde Soles (PEN)
  hasManuallySelected: boolean; // Para saber si el usuario eligió a mano
  initCurrency: () => Promise<void>;
  setCurrencyManual: (curr: 'PEN' | 'COP') => void;
  formatPrice: (pricePEN: number) => string;
}

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'PEN',
      symbol: 'S/',
      rate: 1,
      hasManuallySelected: false,

      initCurrency: async () => {
        const { hasManuallySelected } = get();
        // Si el usuario ya eligió manualmente antes, no autodetectamos nada
        if (hasManuallySelected) return;

        try {
          // Detectamos el país del usuario por su IP
          const res = await fetch('https://ipapi.co/json/');
          const data = await res.json();
          
          if (data.country_code === 'CO') {
            // Si es de Colombia (1 PEN ≈ 1104.5 COP)
            set({ currency: 'COP', symbol: 'COP $', rate: 1104.5 });
          } else {
            // Resto del mundo
            set({ currency: 'PEN', symbol: 'S/', rate: 1 });
          }
        } catch (error) {
          console.error('Error detectando país:', error);
        }
      },

      setCurrencyManual: (curr: 'PEN' | 'COP') => {
        if (curr === 'COP') {
          set({ currency: 'COP', symbol: 'COP $', rate: 1104.5, hasManuallySelected: true });
        } else {
          set({ currency: 'PEN', symbol: 'S/', rate: 1, hasManuallySelected: true });
        }
      },

      formatPrice: (pricePEN: number) => {
        const { currency, symbol, rate } = get();
        const converted = pricePEN * rate;
        
        if (currency === 'COP') {
          // Formato colombiano sin decimales y con separador de miles
          return `${symbol} ${converted.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;
        }
        // Formato peruano con 2 decimales
        return `${symbol} ${converted.toFixed(2)}`;
      }
    }),
    {
      name: 'currency-storage',
      // Guardamos en caché su elección para que se mantenga al recargar la página
      partialize: (state) => ({ 
        currency: state.currency, 
        symbol: state.symbol, 
        rate: state.rate,
        hasManuallySelected: state.hasManuallySelected
      }),
    }
  )
);