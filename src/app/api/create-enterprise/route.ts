import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface EnterpriseRequest {
  name: string;
  city: string;
  contact: number;
  uf: string;
  sectors: string[];
  zipCode: number;
}
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, city, contact, uf, sectors, zipCode }: EnterpriseRequest =
      await request.json();

    if (
      !name ||
      !city ||
      !uf ||
      !contact ||
      !sectors ||
      !zipCode ||
      !Array.isArray(sectors)
    ) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const existingEnterpriseWithNumber = await prisma.enterprise.findUnique({
      where: {
        contact,
      },
    });
    if (existingEnterpriseWithNumber) {
      return NextResponse.json(
        { error: "Enterprise already existing with contact" },
        { status: 409 }
      );
    }

    const enterprise = await prisma.enterprise.create({
      data: {
        name,
        city,
        contact,
        uf,
        zipCode,
        sectors: {
          create: sectors.map((sectorName) => ({
            sectors: {
              connectOrCreate: {
                where: { name: sectorName },
                create: { name: sectorName },
              },
            },
          })),
        },
      },
    });

    return NextResponse.json({
      message: "create enterprise",
      enterprise,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "error ocurred",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
