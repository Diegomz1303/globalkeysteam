import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db'; 
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura_123';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "Game" ORDER BY id DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Error al cargar los juegos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return NextResponse.json({ error: "Denegado" }, { status: 401 });
    jwt.verify(authHeader.split(' ')[1], SECRET_KEY);

    const body = await req.json();
    
    // Añadimos "genre" a la consulta SQL
    const query = `
      INSERT INTO "Game" 
      (title, price, "oldPrice", region, stock, image, description, screenshots, os, cpu, ram, gpu, genre)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    const values = [
      body.title, body.price, body.oldPrice || null, body.region || "GLOBAL", body.stock || 0, 
      body.image, body.description, body.screenshots, body.os || null, body.cpu || null, 
      body.ram || null, body.gpu || null, body.genre || 'Acción'
    ];

    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear" }, { status: 500 });
  }
}