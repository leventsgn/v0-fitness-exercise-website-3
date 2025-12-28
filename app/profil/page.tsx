import { redirect } from "next/navigation"
import { auth } from "@/auth"
import ProfilClient from "./ProfilClient"

export default async function ProfilPage() {
  const session = await auth()

  if (!session) {
    redirect("/giris")
  }

  return <ProfilClient session={session} />
}
