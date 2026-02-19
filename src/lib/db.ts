import { Pool } from 'pg';

// Esta configuración es compatible tanto con Local como con Vercel/Neon
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Esto permite que se conecte a Neon sin problemas de certificados
  }
});

// Prueba de conexión rápida en consola
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL en la nube:', err.stack);
  } else {
    console.log('✅ Conexión exitosa a la base de datos en la nube:', res.rows[0].now);
  }
});