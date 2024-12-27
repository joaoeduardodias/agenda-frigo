import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


const prisma = new PrismaClient()

export async function GET() {
  try {

    const sectors = await prisma.sector.findMany({
      select: {
        name: true,
        id: true,
      }
    })
    return NextResponse.json({ sectors }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Error get all sectors", error }, { status: 500 })
  }

}