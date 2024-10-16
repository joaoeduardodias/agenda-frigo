import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  const { name, email, userRole } = await req.json()
  const userId = req.nextUrl.searchParams.get('userId')!

  if (!name || !email || !userRole) {
    return NextResponse.json(
      { message: 'name or email  or user role missing' },
      { status: 400 },
    )
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!existingUser) {
      return NextResponse.json({ message: 'User not exist' }, { status: 404 })
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        userRole,
      },
    })

    return NextResponse.json({ updateUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating user', details: error },
      { status: 500 },
    )
  }
}
