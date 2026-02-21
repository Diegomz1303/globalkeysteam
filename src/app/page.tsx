import { pool } from '../lib/db'; 
import HomeClient from '../components/HomeClient';

// Esta configuración asegura que la página revalide sus datos en segundo plano
// sin necesidad de hacer SSR lento en cada visita individual.
export const revalidate = 60; // Revalida la cache cada 60 segundos

export default async function Page() {
  try {
    // 1. Obtenemos los juegos desde la Base de Datos DE INMEDIATO en el Servidor
    const result = await pool.query('SELECT * FROM "Game" ORDER BY id DESC');
    const initialGames = result.rows;

    // 2. Renderizamos el componente cliente pasándole los datos ya cargados
    return <HomeClient initialGames={initialGames} />;
    
  } catch (error) {
    console.error("Error al cargar juegos en el Server Component:", error);
    // Si falla la DB por alguna razón, se envía un array vacío para no romper la app
    return <HomeClient initialGames={[]} />;
  }
}