import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, User } from "lucide-react"
import { notFound } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const REPO_NAME = process.env.GITHUB_PAGES ? (process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? 'v0-fitness-exercise-website-3') : ''
const BASE = REPO_NAME ? `/${REPO_NAME}` : ''

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
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "torasik-rotasyon",
        title: "Torasik Rotasyon",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "boyun-izometrik",
        title: "Boyun İzometrik Güçlendirme",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "chin-tuck",
        title: "Chin Tuck",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "sirt-ust-germe",
        title: "Üst Sırt Germe",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "duvar-melek",
        title: "Duvar Meleği",
        difficulty: "Orta",
        equipment: "Duvar",
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "trapez-germe",
        title: "Trapez Kas Germe",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "omuz-cemberler",
        title: "Omuz Çemberleri",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "skapula-retraksiyon",
        title: "Skapula Retraksiyon",
        difficulty: "Başlangıç",
        equipment: "Direnç Bandı",
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "cobra-germe",
        title: "Cobra Germe",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "y-t-w",
        title: "Y-T-W Egzersizi",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "sirt-ext",
        title: "Sırt Ekstansiyon",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "torasik-kopru",
        title: "Torasik Köprü",
        difficulty: "Orta",
        equipment: "Foam Roller",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "superman",
        title: "Superman Egzersizi",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "boyun-yan-germe",
        title: "Boyun Yan Germe",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/neck-stretching-exercise-physiotherapy.jpg",
      },
      {
        id: "prone-row",
        title: "Prone Row",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Matı",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
      },
      {
        id: "skapula-push-up",
        title: "Skapular Push-Up",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/cat-cow-stretch-yoga-mat-physiotherapy.jpg",
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
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "duvara-oturma",
        title: "Duvara Oturma",
        difficulty: "Orta",
        equipment: "Duvar",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
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
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "tek-bacak-squat",
        title: "Tek Bacak Squat",
        difficulty: "İleri",
        equipment: "Ekipman Yok",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "terminal-knee-extension",
        title: "Terminal Knee Extension",
        difficulty: "Başlangıç",
        equipment: "Direnç Bandı",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "lateral-step-down",
        title: "Lateral Step Down",
        difficulty: "Orta",
        equipment: "Step",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "clamshell",
        title: "Clamshell",
        difficulty: "Başlangıç",
        equipment: "Direnç Bandı",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "monster-walk",
        title: "Monster Walk",
        difficulty: "Orta",
        equipment: "Direnç Bandı",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "leg-press-tek-bacak",
        title: "Tek Bacak Leg Press",
        difficulty: "Orta",
        equipment: "Leg Press",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "bulgarian-split-squat",
        title: "Bulgarian Split Squat",
        difficulty: "İleri",
        equipment: "Bench",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "seated-knee-flexion",
        title: "Oturarak Diz Fleksiyonu",
        difficulty: "Başlangıç",
        equipment: "Direnç Bandı",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "side-lying-leg-lift",
        title: "Yan Yatarak Bacak Kaldırma",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Matı",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "nordic-hamstring-curl",
        title: "Nordic Hamstring Curl",
        difficulty: "İleri",
        equipment: "Egzersiz Matı",
        image: "/hamstring-stretch-resistance-band-therapy.jpg",
      },
      {
        id: "reverse-lunge",
        title: "Reverse Lunge",
        difficulty: "Orta",
        equipment: "Ekipman Yok",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "glute-bridge-tek-bacak",
        title: "Tek Bacak Glute Bridge",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "lateral-band-walk",
        title: "Lateral Band Walk",
        difficulty: "Başlangıç",
        equipment: "Direnç Bandı",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "pistol-squat-assisted",
        title: "Destekli Pistol Squat",
        difficulty: "İleri",
        equipment: "TRX/İp",
        image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      },
      {
        id: "prone-hamstring-curl",
        title: "Yüzüstü Hamstring Curl",
        difficulty: "Başlangıç",
        equipment: "Ağırlık/Bant",
        image: "/hamstring-stretch-resistance-band-therapy.jpg",
      },
    ],
  },
  omuz: {
    title: "Omuz Egzersizleri",
    exercises: [
      { id: "sarkac", title: "Sarkaç Egzersizi", difficulty: "Başlangıç", equipment: "Ekipman Yok", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "duvar-tirmanisi", title: "Duvar Tırmanışı", difficulty: "Başlangıç", equipment: "Duvar", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "omuz-rotasyonu", title: "İç-Dış Rotasyon", difficulty: "Orta", equipment: "Direnç Bandı", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "skapular-sikma", title: "Skapular Sıkma", difficulty: "Başlangıç", equipment: "Ekipman Yok", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "face-pull", title: "Face Pull", difficulty: "Orta", equipment: "Kablo/Bant", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "band-pull-apart", title: "Band Pull Apart", difficulty: "Başlangıç", equipment: "Direnç Bandı", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "lateral-raise", title: "Lateral Raise", difficulty: "Orta", equipment: "Dumbbells", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "front-raise", title: "Front Raise", difficulty: "Orta", equipment: "Dumbbells", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "reverse-fly", title: "Reverse Fly", difficulty: "Orta", equipment: "Dumbbells", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "scaption", title: "Scaption", difficulty: "Orta", equipment: "Dumbbells", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "overhead-press", title: "Overhead Press", difficulty: "Orta", equipment: "Dumbbells", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "arnold-press", title: "Arnold Press", difficulty: "Orta", equipment: "Dumbbells", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "cuban-rotation", title: "Cuban Rotation", difficulty: "İleri", equipment: "Dumbbells", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "sleeper-stretch", title: "Sleeper Stretch", difficulty: "Başlangıç", equipment: "Egzersiz Matı", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "doorway-stretch", title: "Doorway Pec Stretch", difficulty: "Başlangıç", equipment: "Kapı", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "hanging-shrug", title: "Hanging Shrug", difficulty: "Orta", equipment: "Pull-up Bar", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "prone-t-raise", title: "Prone T-Raise", difficulty: "Başlangıç", equipment: "Egzersiz Matı", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "blackburn-y", title: "Blackburn Y", difficulty: "Başlangıç", equipment: "Egzersiz Matı", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
      { id: "plank-tap", title: "Plank Shoulder Tap", difficulty: "Orta", equipment: "Egzersiz Matı", image: "/pendulum-shoulder-exercise-physiotherapy.jpg" },
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
        image: "/lower-back-pain-exercises-physiotherapy.jpg",
      },
      {
        id: "kopru",
        title: "Köprü Egzersizi",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Matı",
        image: "/lower-back-pain-exercises-physiotherapy.jpg",
      },
      {
        id: "bird-dog",
        title: "Bird Dog",
        difficulty: "Orta",
        equipment: "Egzersiz Matı",
        image: "/lower-back-pain-exercises-physiotherapy.jpg",
      },
      {
        id: "diz-gogus",
        title: "Diz-Göğüs Germe",
        difficulty: "Başlangıç",
        equipment: "Egzersiz Matı",
        image: "/lower-back-pain-exercises-physiotherapy.jpg",
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
        image: "/hand-and-wrist-physiotherapy-exercises.jpg",
      },
      {
        id: "parmak-germe",
        title: "Parmak Germe",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/hand-and-wrist-physiotherapy-exercises.jpg",
      },
      {
        id: "bilek-rotasyonu",
        title: "Bilek Rotasyonu",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/hand-and-wrist-physiotherapy-exercises.jpg",
      },
      {
        id: "kavrama-gucendirme",
        title: "Kavrama Güçlendirme",
        difficulty: "Orta",
        equipment: "Stres Topu",
        image: "/hand-and-wrist-physiotherapy-exercises.jpg",
      },
    ],
  },
  ayak: {
    title: "Ayak ve Ayak Bileği",
    exercises: [
      {
        id: "ayak-bilegi-pumpa",
        title: "Ayak Bileği Pompa",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/ankle-and-foot-physiotherapy-rehabilitation.jpg",
      },
      {
        id: "havlu-toplama",
        title: "Havlu Toplama",
        difficulty: "Başlangıç",
        equipment: "Havlu",
        image: "/ankle-and-foot-physiotherapy-rehabilitation.jpg",
      },
      {
        id: "ayak-bilegi-rotasyonu",
        title: "Ayak Bileği Rotasyonu",
        difficulty: "Başlangıç",
        equipment: "Ekipman Yok",
        image: "/ankle-and-foot-physiotherapy-rehabilitation.jpg",
      },
      {
        id: "topuk-yukseltme",
        title: "Topuk Yükseltme",
        difficulty: "Orta",
        equipment: "Duvar/Sandalye",
        image: "/ankle-and-foot-physiotherapy-rehabilitation.jpg",
      },
    ],
  },
}

const difficultyColors: Record<string, string> = {
  Başlangıç: "bg-accent/20 text-accent",
  Orta: "bg-primary/20 text-primary",
  İleri: "bg-destructive/20 text-destructive",
}

export default async function CategoryPage({ params }: { params: { category: string } | Promise<{ category: string }> }) {
  const { category } = await params
  const categoryData = exerciseData[category]

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
            <Link key={exercise.id} href={`/egzersiz/${category}/${exercise.id}`}>
              <Card className="group hover:border-accent transition-all duration-300 overflow-hidden cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={`${BASE}${exercise.image || "/placeholder.svg"}`}
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
