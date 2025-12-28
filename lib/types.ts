// Prisma schema'dan türetilen enum ve tipler
export enum UserRole {
  HASTA = "HASTA",
  FIZYOTERAPIST = "FIZYOTERAPIST"
}

export type { User, Profile, Account, Session } from "@prisma/client"
