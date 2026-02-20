import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

// OBTENER RESEÑAS DE UN JUEGO (GET)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get('gameId');

  if (!gameId) {
    return NextResponse.json({ error: "Se requiere el ID del juego" }, { status: 400 });
  }

  try {
    // Obtenemos las reseñas ordenadas de la más nueva a la más antigua
    const query = `SELECT * FROM "Review" WHERE "gameId" = $1 ORDER BY "createdAt" DESC`;
    const result = await pool.query(query, [parseInt(gameId)]);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

// CREAR UNA NUEVA RESEÑA (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gameId, user, stars, text } = body;

    // Validación básica
    if (!gameId || !user || !stars || !text) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const query = `
      INSERT INTO "Review" ("gameId", "user", stars, text)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [parseInt(gameId), user, parseInt(stars), text];
    
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
    
  } catch (error) {
    console.error("Error al crear reseña:", error);
    return NextResponse.json({ error: "Error del servidor al guardar" }, { status: 500 });
  }
}