import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { name, email, password, userRole } = await req.json()

  if (!name || !email || !password || !userRole) {
    return NextResponse.json(
      { message: 'name or email or password or user role missing' },
      { status: 400 },
    )
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userRole,
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating user', details: error },
      { status: 500 },
    )
  }
}
