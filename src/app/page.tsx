import { pool } from '../lib/db'; 
import HomeClient from '../components/HomeClient';


export const revalidate = 60; 

export default async function Page() {
  try {
    
    const result = await pool.query('SELECT * FROM "Game" ORDER BY id DESC');
    const initialGames = result.rows;

    
    return <HomeClient initialGames={initialGames} />;
    
  } catch (error) {
    console.error("Error al cargar juegos en el Server Component:", error);
    
    return <HomeClient initialGames={[]} />;
  }
}