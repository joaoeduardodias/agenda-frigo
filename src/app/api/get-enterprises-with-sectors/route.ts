import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


const prisma = new PrismaClient()

export async function GET() {
  try {
    const enterprises = await prisma.enterprise.findMany({

      select: {
        name: true,
        city: true,
        sectors: {
          select: {
            sectors: {
              select: {
                name: true,
              }
            }
          }
        }
      }
    })


    return NextResponse.json(enterprises, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Error get all enterprises", error }, { status: 500 })
  }

}