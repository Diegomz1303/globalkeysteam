"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, clave })
      });

      const data = await res.json();

      if (res.ok) {
        // Guardamos el token en la memoria del navegador
        localStorage.setItem('adminToken', data.token);
        
        // Guardamos en Cookie para que el Middleware proteja la ruta
        document.cookie = `adminToken=${data.token}; path=/; max-age=${8 * 60 * 60}; SameSite=Strict`;
        
        // SOLUCIÓN: Usamos replace en lugar de push para que el login no quede en el historial
        router.replace('/admin');
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Fondo con brillo naranja */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF6600]/20 blur-[100px] rounded-full pointer-events-none opacity-50"></div>
      
      <div className="w-full max-w-md bg-[#121212] border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-black relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 relative mb-4">
            <Image src="/logo.png" alt="Logo" fill className="object-contain drop-shadow-[0_0_12px_rgba(255,102,0,0.6)]" priority />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            GLOBAL<span className="text-[#FF6600]">KeySTEAM</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Panel de Administración</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2 ml-1" htmlFor="usuario">Usuario</label>
            <input 
              id="usuario"
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full bg-black/50 border-2 border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#FF6600] focus:ring-2 focus:ring-[#FF6600]/20 focus:outline-none transition-all placeholder-gray-600"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2 ml-1" htmlFor="clave">Contraseña</label>
            <input 
              id="clave"
              type="password" 
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="w-full bg-black/50 border-2 border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#FF6600] focus:ring-2 focus:ring-[#FF6600]/20 focus:outline-none transition-all placeholder-gray-600"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#FF6600] hover:bg-orange-600 text-white font-black py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4 uppercase tracking-wider"
          >
            {isLoading ? 'Verificando...' : 'Ingresar al Panel'}
          </button>
        </form>
      </div>
    </main>
  );
}