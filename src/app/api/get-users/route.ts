import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        id: true,
        contact: true,
        contact_secondary: true,
        email: true,
        enterprise: {
          select: {
            name: true,
            city: true,
            uf: true,
          },
        },
        sectors: {
          select: {
            name: true,
          },
        },
      },
    });
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      contact_secondary: user.contact_secondary,
      enterprise: `${user.enterprise.name} - ${user.enterprise.city} ${user.enterprise.uf}`,
      sector: user.sectors.name,
    }));
    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error get all users", error },
      { status: 500 }
    );
  }
}
