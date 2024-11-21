import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


interface EnterpriseRequest {
  name: string;
  city: string;
  contact: number;
  uf: string;
  sectors: string[];
}
const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, city, contact, uf, sectors }: EnterpriseRequest = await request.json();


    if (!name || !city || !uf || !contact || !sectors || !Array.isArray(sectors)) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }


    const enterprise = await prisma.enterprise.create({
      data: {
        name,
        city,
        contact,
        uf,
        sectors: {
          create: sectors.map((sectorName) => ({
            sectors: {
              connectOrCreate: {
                where: { name: sectorName },
                create: { name: sectorName }
              }
            }
          }))

        },
      },
    });

    return NextResponse.json({ message: 'Enterprise criado com sucesso', enterprise });
  } catch (error) {
    console.error('Erro ao criar enterprise:', error);
    return NextResponse.json({ error: 'Erro ao processar a requisição', details: (error as Error).message }, { status: 500 });
  }
}
