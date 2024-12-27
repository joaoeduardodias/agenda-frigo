import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "email or password missing" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Email or password invalid" },
        { status: 405 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email or password invalid" },
        { status: 405 }
      );
    }
    const token = jwt.sign({ userId: user.id }, "termo-frigo-2024", {
      expiresIn: "10h",
    });

    return NextResponse.json(
      {
        token,
        role: user.userRole,
        email: user.email,
        name: user.name,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error in sign-in", details: error },
      { status: 500 }
    );
  }
}
