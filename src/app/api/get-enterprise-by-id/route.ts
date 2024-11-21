import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const enterpriseId = req.nextUrl.searchParams.get('id')!

    const enterprise = await prisma.enterprise.findUnique({
      where: {
        id: enterpriseId
      },
      include: {
        users: {
          select: {

            name: true,
            email: true,
            contact: true,
            contact_secondary: true,
            sectors: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    if (!enterprise) {
      return NextResponse.json({ message: "Enterprise not exists" }, { status: 404 })
    }


    const users = enterprise.users.map(user => {
      const { sectors, ...userData } = user
      return {
        ...userData,
        sector: user.sectors.name ?? ''
      }
    })
    const formattedData = {
      id: enterprise.id,
      name: enterprise.name,
      city: enterprise.city,
      uf: enterprise.uf,
      contact: enterprise.contact,
      users,
    }


    return NextResponse.json(formattedData, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Error get all enterprises", error }, { status: 500 })
  }

}