import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId")!;

    const { name, email, password, userRole, contact, enterprise, sector } =
      await req.json();

    if (
      !name ||
      !email ||
      !password ||
      !userRole ||
      !enterprise ||
      !contact ||
      !sector
    ) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not exist" }, { status: 404 });
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        contact,
        userRole,
        enterprise: {
          connect: {
            id: enterprise,
          },
        },
        sectors: {
          connect: { name: sector },
        },
      },
    });

    return NextResponse.json({ updateUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating user", details: error },
      { status: 500 }
    );
  }
}
