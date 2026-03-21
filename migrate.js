const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Extract DATABASE_URL from .env manually to avoid needing dotenv library
const envPath = path.resolve(__dirname, '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const dbUrlMatch = envFile.match(/DATABASE_URL="([^"]+)"/);
const DATABASE_URL = dbUrlMatch ? dbUrlMatch[1] : null;

if (!DATABASE_URL) {
  console.error("No DATABASE_URL found in .env");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log("Conectado a la base de datos. Modificando tabla Game...");
    
    // Add stripeLink column
    console.log("Añadiendo columna stripeLink...");
    await client.query(`ALTER TABLE "Game" ADD COLUMN IF NOT EXISTS "stripeLink" TEXT;`);
    
    // Add isFeatured column
    console.log("Añadiendo columna isFeatured...");
    await client.query(`ALTER TABLE "Game" ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN DEFAULT false;`);
    
    console.log("Migración completada con éxito!");
  } catch (err) {
    console.error("Error durante la migración:", err);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
