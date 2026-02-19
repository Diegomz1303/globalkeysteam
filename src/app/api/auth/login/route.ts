import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db'; // Importamos tu nueva conexión SQL
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura_123';

export async function POST(req: Request) {
  try {
    if (!req.body) {
      return NextResponse.json({ error: "No se enviaron datos" }, { status: 400 });
    }

    const { usuario, clave } = await req.json();

    if (!usuario || !clave) {
        return NextResponse.json({ error: "Faltan datos de usuario o contraseña" }, { status: 400 });
    }

    // 1. Buscamos el admin usando SQL puro
    // IMPORTANTE: Ponemos "Admin" entre comillas porque Postgres es sensible a mayúsculas
    const query = 'SELECT * FROM "Admin" WHERE usuario = $1';
    const result = await pool.query(query, [usuario]);
    
    const admin = result.rows[0]; // Tomamos el primer resultado que coincida

    // 2. Comparamos la contraseña 
    if (!admin || admin.clave !== clave) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
    }

    // 3. Generamos el Token JWT si todo está correcto
    const token = jwt.sign(
      { id: admin.id, usuario: admin.usuario, role: 'admin' },
      SECRET_KEY,
      { expiresIn: '8h' }
    );

    return NextResponse.json({ token, message: "Inicio de sesión exitoso" });
    
  } catch (error) {
    console.error("🚨 ERROR DETALLADO EN EL LOGIN (SQL):", error); 
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}