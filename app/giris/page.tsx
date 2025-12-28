"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import Link from "next/link"

export default function GirisPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Giriş formu state'leri
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  // Kayıt formu state'leri
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "HASTA"
  })

  // E-posta ve şifre ile giriş
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false
      })

      if (result?.error) {
        toast.error("Giriş başarısız. E-posta veya şifre hatalı.")
      } else {
        toast.success("Giriş başarılı!")
        router.push("/profil")
        router.refresh()
      }
    } catch (error) {
      console.error("Giriş hatası:", error)
      toast.error("Giriş sırasında bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  // Kayıt işlemi
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor")
      return
    }

    if (registerData.password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          role: registerData.role
        })
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || "Kayıt başarısız")
        return
      }

      toast.success("Kayıt başarılı! Şimdi giriş yapabilirsiniz.")
      
      // Otomatik giriş yap
      await signIn("credentials", {
        email: registerData.email,
        password: registerData.password,
        redirect: false
      })
      
      router.push("/profil")
      router.refresh()
    } catch (error) {
      console.error("Kayıt hatası:", error)
      toast.error("Kayıt sırasında bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Hoş Geldiniz</CardTitle>
          <CardDescription className="text-center">
            Hesabınıza giriş yapın veya yeni hesap oluşturun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-posta</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Şifre</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Ad Soyad</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">E-posta</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Şifre</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Şifre Tekrar</Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hesap Türü</Label>
                  <RadioGroup
                    value={registerData.role}
                    onValueChange={(value) => setRegisterData({ ...registerData, role: value })}
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="HASTA" id="hasta" />
                      <Label htmlFor="hasta" className="font-normal">Hasta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FIZYOTERAPIST" id="fizyoterapist" />
                      <Label htmlFor="fizyoterapist" className="font-normal">Fizyoterapist</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            Ana sayfaya dön
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
