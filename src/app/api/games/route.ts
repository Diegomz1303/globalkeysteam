import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Ruta relativa hacia la carpeta lib

// METODO GET: Para traer todos los juegos de DBeaver a tu tienda
export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: { id: 'desc' } // Los más nuevos primero
    });
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: "Error al cargar los juegos" }, { status: 500 });
  }
}

// METODO POST: Para guardar un juego nuevo desde tu Panel
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newGame = await prisma.game.create({
      data: body,
    });
    return NextResponse.json(newGame);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear el juego" }, { status: 500 });
  }
}