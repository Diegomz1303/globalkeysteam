import { Pool } from 'pg';


export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL en la nube:', err.stack);
  } else {
    console.log('✅ Conexión exitosa a la base de datos en la nube:', res.rows[0].now);
  }
});