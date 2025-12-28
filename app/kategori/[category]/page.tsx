import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, User } from "lucide-react"
import { notFound } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

// Exercise data organized by categories
const exerciseData: Record<
  string,
  {
    title: string
    exercises: Array<{ id: string; title: string; difficulty: string; equipment: string; image: string }>
  }
> = {
  "boyun-sirt": {
    title: "Boyun ve Sırt Egzersizleri",
    exercises: [
      {
        id: "boyun-germe",
        title: "Boyun Germe",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "kedi-deve",
        title: "Kedi-Deve Hareketi",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Matı",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "skapula-sikma",
        title: "Skapula Sıkma",
        difficulty: "Başlangıç",
        equipment: "Direnç Bandı",
        image: "/scapular-squeeze-resistance-band-therapy.jpg",
      },
      {
        id: "torasik-rotasyon",
        title: "Torasik Rotasyon",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/thoracic-rotation-exercise-stretching.jpg",
      },
    ],
  },
  diz: {
    title: "Diz Rehabilitasyonu",
    exercises: [
      {
        id: "kuadriseps-gucendirme",
        title: "Kuadriseps Güçlendirme",
        difficulty: "Başlangıç",
        equipment: "Sandalye",
        image: "/quadriceps-strengthening-exercise-chair.jpg",
      },
      {
        id: "duvara-oturma",
        title: "Duvara Oturma",
        difficulty: "Orta",
        equipment: "Duvar",
        image: "/wall-sit-exercise-knee-rehabilitation.jpg",
      },
      {
        id: "hamstring-germe",
        title: "Hamstring Germe",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Bandı",
        image: "/hamstring-stretch-resistance-band-therapy.jpg",
      },
      {
        id: "step-up",
        title: "Step Up",
        difficulty: "Orta",
        equipment: "Step/Basamak",
        image: "/step-up-exercise-knee-rehabilitation.jpg",
      },
    ],
  },
  omuz: {
    title: "Omuz Egzersizleri",
    exercises: [
      {
        id: "sarkaç",
        title: "Sarkaç Egzersizi",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/pendulum-shoulder-exercise-physiotherapy.jpg",
      },
      {
        id: "duvar-tirmanisi",
        title: "Duvar Tırmanışı",
        difficulty: "Başlangıç",
        equipment: "Duvar",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "omuz-rotasyonu",
        title: "İç-Dış Rotasyon",
        difficulty: "Orta",
        equipment: "Direnç Bandı",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "skapular-sikma",
        title: "Skapular Sıkma",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  bel: {
    title: "Bel Ağrısı Egzersizleri",
    exercises: [
      {
        id: "pelvik-tilt",
        title: "Pelvik Tilt",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Matı",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "kopru",
        title: "Köprü Egzersizi",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Matı",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "bird-dog",
        title: "Bird Dog",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "diz-gogus",
        title: "Diz-Göğüs Germe",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Matı",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  "el-bilek": {
    title: "El ve Bilek Egzersizleri",
    exercises: [
      {
        id: "bilek-fleksiyonu",
        title: "Bilek Fleksiyonu",
        difficulty: "Başlangıç",
        equipment: "Hafif Ağırlık",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "parmak-germe",
        title: "Parmak Germe",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "bilek-rotasyonu",
        title: "Bilek Rotasyonu",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "kavrama-gucendirme",
        title: "Kavrama Güçlendirme",
        difficulty: "Orta",
        equipment: "Stres Topu",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  ayak: {
    title: "Ayak ve Ayak Bileği",
    exercises: [
      {
        id: "ayak-bileği-pumpa",
        title: "Ayak Bileği Pompa",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "havlu-toplama",
        title: "Havlu Toplama",
        difficulty: "Başlangıç",
        equipment: "Havlu",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "ayak-bileği-rotasyonu",
        title: "Ayak Bileği Rotasyonu",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "topuk-yukseltme",
        title: "Topuk Yükseltme",
        difficulty: "Orta",
        equipment: "Duvar/Sandalye",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
}

const difficultyColors: Record<string, string> = {
  Başlangıç: "bg-accent/20 text-accent",
  Orta: "bg-primary/20 text-primary",
  İleri: "bg-destructive/20 text-destructive",
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryData = exerciseData[params.category]

  if (!categoryData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Ana Sayfa
              </Button>
            </Link>
            <div className="flex items-center gap-2">
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

      {/* Category Title */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{categoryData.title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Bu kategorideki tedavi egzersizlerini seçin ve doğru hareket tekniklerini öğrenin
        </p>
      </section>

      {/* Exercises Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryData.exercises.map((exercise) => (
            <Link key={exercise.id} href={`/egzersiz/${params.category}/${exercise.id}`}>
              <Card className="group hover:border-accent transition-all duration-300 overflow-hidden cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={exercise.image || "/placeholder.svg"}
                    alt={exercise.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${difficultyColors[exercise.difficulty]}`}
                    >
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {exercise.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{exercise.equipment}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(exerciseData).map((category) => ({
    category,
  }))
}
