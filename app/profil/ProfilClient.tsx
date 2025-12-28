"use client"

import { useState, useEffect } from "react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Heart, 
  LogOut,
  Save,
  Edit,
  Award,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface ProfilClientProps {
  session: Session
}

interface ProfileData {
  bio: string
  phone: string
  address: string
  specialization?: string
  licenseNumber?: string
  experience?: number
  medicalHistory?: string
}

export default function ProfilClient({ session }: ProfilClientProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    bio: "",
    phone: "",
    address: "",
    specialization: "",
    licenseNumber: "",
    experience: 0,
    medicalHistory: ""
  })

  const isFizyoterapist = session.user.role === "FIZYOTERAPIST"

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          setProfileData(data.profile)
        }
      }
    } catch (error) {
      console.error("Profil yüklenirken hata:", error)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
      })

      if (response.ok) {
        toast.success("Profil başarıyla güncellendi")
        setIsEditing(false)
      } else {
        toast.error("Profil güncellenirken bir hata oluştu")
      }
    } catch (error) {
      console.error("Profil kaydetme hatası:", error)
      toast.error("Profil kaydedilemedi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const getUserInitials = () => {
    if (!session.user.name) return "U"
    const names = session.user.name.split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return session.user.name[0].toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline">← Ana Sayfa</Button>
            </Link>
            <h1 className="text-3xl font-bold">Profilim</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış Yap
            </Button>
          </div>
        </div>

        {/* Profil Kartı */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={session.user.image || undefined} />
                <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{session.user.name}</CardTitle>
                <CardDescription className="text-lg">
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {session.user.email}
                  </div>
                </CardDescription>
                <div className="mt-2">
                  <Badge variant={isFizyoterapist ? "default" : "secondary"}>
                    {isFizyoterapist ? "Fizyoterapist" : "Hasta"}
                  </Badge>
                </div>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "İptal" : <><Edit className="mr-2 h-4 w-4" /> Düzenle</>}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Profil Detayları */}
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Bilgilerim</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isFizyoterapist ? "Profesyonel Bilgiler" : "Kişisel Bilgiler"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Ortak Alanlar */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Biyografi</Label>
                  <Textarea
                    id="bio"
                    placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="inline mr-2 h-4 w-4" />
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+90 555 123 45 67"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      <MapPin className="inline mr-2 h-4 w-4" />
                      Adres
                    </Label>
                    <Input
                      id="address"
                      placeholder="Şehir, İlçe"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <Separator />

                {/* Fizyoterapist için özel alanlar */}
                {isFizyoterapist && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialization">
                          <Briefcase className="inline mr-2 h-4 w-4" />
                          Uzmanlık Alanı
                        </Label>
                        <Input
                          id="specialization"
                          placeholder="Örn: Ortopedi, Spor Fizyoterapisi"
                          value={profileData.specialization}
                          onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber">
                          <Award className="inline mr-2 h-4 w-4" />
                          Lisans Numarası
                        </Label>
                        <Input
                          id="licenseNumber"
                          placeholder="Lisans numaranız"
                          value={profileData.licenseNumber}
                          onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        Deneyim (Yıl)
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="0"
                        value={profileData.experience}
                        onChange={(e) => setProfileData({ ...profileData, experience: parseInt(e.target.value) || 0 })}
                        disabled={!isEditing}
                      />
                    </div>
                  </>
                )}

                {/* Hasta için özel alanlar */}
                {!isFizyoterapist && (
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">
                      <Heart className="inline mr-2 h-4 w-4" />
                      Tıbbi Geçmiş
                    </Label>
                    <Textarea
                      id="medicalHistory"
                      placeholder="Kronik hastalıklar, geçirilmiş ameliyatlar, alerjiler vb..."
                      value={profileData.medicalHistory}
                      onChange={(e) => setProfileData({ ...profileData, medicalHistory: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        fetchProfile()
                      }}
                    >
                      İptal
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Hesap Ayarları</CardTitle>
                <CardDescription>
                  Hesabınızla ilgili ayarları buradan yönetebilirsiniz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Hesap Bilgileri</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>E-posta: {session.user.email}</p>
                    <p>Hesap Türü: {isFizyoterapist ? "Fizyoterapist" : "Hasta"}</p>
                    <p>Üyelik Tarihi: {new Date().toLocaleDateString("tr-TR")}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium text-destructive">Tehlikeli Bölge</h3>
                  <p className="text-sm text-muted-foreground">
                    Hesabınızı silmek kalıcı bir işlemdir ve geri alınamaz.
                  </p>
                  <Button variant="destructive" disabled>
                    Hesabı Sil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Fizyoterapist için ek kartlar */}
        {isFizyoterapist && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Toplam Hasta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Aktif Tedavi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tamamlanan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
