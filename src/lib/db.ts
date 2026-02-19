import { Pool } from 'pg';

// Esto crea una "piscina" de conexiones directas a tu base de datos
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Verificamos si la conexión es exitosa (opcional, pero genial para saber que funciona)
pool.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL', err.stack);
  } else {
    console.log('✅ Conectado a PostgreSQL exitosamente con pg');
  }
});