import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

  try {
    const { name, email, password, userRole, contact, enterprise, sector } = await req.json()

    if (!name || !email || !password || !userRole || !enterprise || !contact || !sector) {
      return NextResponse.json(
        { message: 'Missing data' },
        { status: 400 },
      )
    }

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
        enterprise: {
          connect: {
            id: enterprise
          }
        },
        contact,
        sectors: {
          connect: { name: sector }
        }
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
