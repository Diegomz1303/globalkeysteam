import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db'; // <--- Ruta relativa restaurada (4 niveles)
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura_123';

function verificarToken(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try { 
    jwt.verify(authHeader.split(' ')[1], SECRET_KEY); 
    return true; 
  } catch { 
    return false; 
  }
}

// Actualizar un juego existente
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verificarToken(req)) return NextResponse.json({ error: "Acceso denegado" }, { status: 401 });
  
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await req.json();
    
    const query = `
      UPDATE "Game" 
      SET title = $1, price = $2, region = $3, stock = $4, image = $5, 
          description = $6, genre = $7, platform = $8
      WHERE id = $9 RETURNING *
    `;
    
    const values = [
      body.title, 
      body.price, 
      body.region, 
      body.stock, 
      body.image, 
      body.description, 
      body.genre || 'Acción', 
      body.platform || 'Steam', 
      parseInt(id)
    ];

    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0]);
    
  } catch (error) {
    console.error("🚨 Error detallado al actualizar juego:", error); 
    return NextResponse.json({ error: "Error interno al actualizar" }, { status: 500 });
  }
}

// Eliminar un juego
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verificarToken(req)) return NextResponse.json({ error: "Acceso denegado" }, { status: 401 });
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    await pool.query('DELETE FROM "Game" WHERE id = $1', [parseInt(id)]);
    return NextResponse.json({ message: "Eliminado" });
  } catch (error) {
    console.error("🚨 Error detallado al eliminar juego:", error); 
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}