import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const enterpriseId = req.nextUrl.searchParams.get('id')!
    const sectors = await prisma.sector.findMany({
      where: {
        enterprises: {
          some: {
            enterprise_id: enterpriseId
          }
        },
      },
      select: {
        name: true,
        id: true,
      }
    })

    if (!sectors) {
      return NextResponse.json({ message: "Enterprise not exists" }, { status: 404 })
    }
    return NextResponse.json({ sectors }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Error get all enterprises", error }, { status: 500 })
  }

}