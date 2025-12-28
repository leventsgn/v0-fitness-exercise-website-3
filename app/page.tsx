import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Heart, Footprints, Hand, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const exerciseCategories = [
  {
    id: "boyun-sirt",
    title: "Boyun ve Sırt Egzersizleri",
    description: "Boyun ve sırt ağrılarını azaltan, postür düzeltici hareketler",
    icon: Activity,
    image: "/person-doing-neck-and-back-physiotherapy-stretches.jpg",
    color: "from-accent/20 to-accent/5",
  },
  {
    id: "diz",
    title: "Diz Rehabilitasyonu",
    description: "Diz ağrıları ve yaralanma sonrası iyileşme egzersizleri",
    icon: Activity,
    image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
    color: "from-primary/20 to-primary/5",
  },
  {
    id: "omuz",
    title: "Omuz Egzersizleri",
    description: "Donuk omuz, rotator cuff ve omuz ağrıları için tedavi hareketleri",
    icon: Hand,
    image: "/shoulder-physiotherapy-exercises-stretching.jpg",
    color: "from-chart-3/20 to-chart-3/5",
  },
  {
    id: "bel",
    title: "Bel Ağrısı Egzersizleri",
    description: "Alt sırt ağrılarını gidermek ve core güçlendirme hareketleri",
    icon: Heart,
    image: "/lower-back-pain-exercises-physiotherapy.jpg",
    color: "from-chart-4/20 to-chart-4/5",
  },
  {
    id: "el-bilek",
    title: "El ve Bilek Egzersizleri",
    description: "Karpal tünel, tendinit ve el bilek ağrıları için tedavi",
    icon: Hand,
    image: "/hand-and-wrist-physiotherapy-exercises.jpg",
    color: "from-accent/20 to-accent/5",
  },
  {
    id: "ayak",
    title: "Ayak ve Ayak Bileği",
    description: "Plantar fasiit, burkulma sonrası iyileşme egzersizleri",
    icon: Footprints,
    image: "/ankle-and-foot-physiotherapy-rehabilitation.jpg",
    color: "from-primary/20 to-primary/5",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Activity className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-balance">FiziyoRehber</h1>
                <p className="text-sm text-muted-foreground">Profesyonel Fizyoterapi Egzersiz Rehberi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/fizyoterapist">
                <Button variant="outline" size="sm" className="rounded-lg gap-2 bg-transparent">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Fizyoterapist</span>
                </Button>
              </Link>
              <Link href="/profil">
                <Button variant="outline" size="icon" className="rounded-lg bg-transparent">
                  <User className="w-5 h-5" />
                  <span className="sr-only">Hasta Profili</span>
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance leading-tight">
            Doğru Hareketlerle Sağlığınıza Kavuşun
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fizyoterapi egzersizlerinizi doğru teknikle yapın. Her hareket için detaylı görseller, adım adım talimatlar
            ve set-tekrar önerileri ile iyileşme sürecinizi hızlandırın.
          </p>
        </div>
      </section>

      {/* Exercise Categories Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exerciseCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={`/kategori/${category.id}`}>
                <Card className="group hover:border-accent transition-all duration-300 overflow-hidden cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground text-sm">© 2025 FiziyoRehber. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
