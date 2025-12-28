import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Profil getirme hatası:", error)
    return NextResponse.json(
      { error: "Profil getirilemedi" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        bio: data.bio,
        phone: data.phone,
        address: data.address,
        specialization: data.specialization,
        licenseNumber: data.licenseNumber,
        experience: data.experience,
        medicalHistory: data.medicalHistory
      },
      create: {
        userId: session.user.id,
        bio: data.bio,
        phone: data.phone,
        address: data.address,
        specialization: data.specialization,
        licenseNumber: data.licenseNumber,
        experience: data.experience,
        medicalHistory: data.medicalHistory
      }
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Profil güncelleme hatası:", error)
    return NextResponse.json(
      { error: "Profil güncellenemedi" },
      { status: 500 }
    )
  }
}
