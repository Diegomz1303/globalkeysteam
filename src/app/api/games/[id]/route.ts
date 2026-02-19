import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura_123';

function verificarToken(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try { jwt.verify(authHeader.split(' ')[1], SECRET_KEY); return true; } catch { return false; }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!verificarToken(req)) return NextResponse.json({ error: "Acceso denegado" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Añadimos "genre = $11" a la actualización
    const query = `
      UPDATE "Game" 
      SET title = $1, price = $2, region = $3, stock = $4, image = $5, 
          description = $6, os = $7, cpu = $8, ram = $9, gpu = $10, genre = $11
      WHERE id = $12 RETURNING *
    `;
    const values = [
      body.title, body.price, body.region, body.stock, body.image, 
      body.description, body.os, body.cpu, body.ram, body.gpu, body.genre, parseInt(id)
    ];

    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!verificarToken(req)) return NextResponse.json({ error: "Acceso denegado" }, { status: 401 });
  try {
    const { id } = await params;
    await pool.query('DELETE FROM "Game" WHERE id = $1', [parseInt(id)]);
    return NextResponse.json({ message: "Eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}