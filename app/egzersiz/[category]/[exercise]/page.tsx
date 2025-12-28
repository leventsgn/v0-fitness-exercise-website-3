"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw, Plus, Minus, User } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const exerciseDetails: Record<string, Record<string, any>> = {
  "boyun-sirt": {
    "boyun-germe": {
      title: "Boyun Germe Egzersizi",
      description:
        "Boyun kaslarını gevşetmek ve boyun ağrılarını azaltmak için yapılan temel germe egzersizi. Özellikle uzun süre bilgisayar başında çalışanlar için faydalıdır.",
      image: "/neck-stretching-exercise-physiotherapy.jpg",
      video: "/neck-stretching-exercise-demonstration-animation.jpg",
      instructions: [
        "Dik bir şekilde oturun veya ayakta durun",
        "Başınızı yavaşça sağa doğru eğin, kulağınızı omzunuza yaklaştırın",
        "15-30 saniye bu pozisyonda bekleyin",
        "Başınızı merkeze getirin ve sol tarafa tekrarlayın",
        "Hareket sırasında omuzlarınızı gevşek tutun",
      ],
      sets: 3,
      reps: "Her yöne 2",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Ekipman Yok",
      targetMuscles: ["Levator Scapulae", "Üst Trapezius", "Sternokleidomastoid"],
      warnings: ["Ani hareketlerden kaçının", "Ağrı hissederseniz durdurun", "Derin nefes almayı unutmayın"],
    },
    "kedi-deve": {
      title: "Kedi-Deve Hareketi",
      description: "Omurga esnekliğini artıran ve sırt kaslarını gevşeten yoga kökenli bir fizyoterapi egzersizi.",
      image: "/placeholder.svg?height=600&width=800",
      video: "/cat-cow-exercise-demonstration-animation.jpg",
      instructions: [
        "Dört ayak üzerinde pozisyon alın (el ve dizler yerde)",
        "Ellerinizi omuz hizasında, dizlerinizi kalça hizasında yerleştirin",
        "Nefes vererek sırtınızı yukarı doğru kambur yapın (Kedi)",
        "Nefes alarak göğsünüzü öne itip sırtınızı aşağı doğru çökertin (Deve)",
        "Hareketi yavaş ve kontrollü şekilde tekrarlayın",
      ],
      sets: 2,
      reps: "10-15",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Egzersiz Matı",
      targetMuscles: ["Erector Spinae", "Abdominal Kaslar", "Torasik Omurga"],
      warnings: ["Boyun ve bel bölgesini aşırı zorlamayın", "Hareket akıcı olmalı"],
    },
  },
  diz: {
    "kuadriseps-gucendirme": {
      title: "Kuadriseps Güçlendirme",
      description: "Diz stabilitesini artıran ve kuadriseps kasını güçlendiren temel rehabilitasyon egzersizi.",
      image: "/knee-rehabilitation-exercises-physical-therapy.jpg",
      video: "/quadriceps-strengthening-exercise-demonstration.jpg",
      instructions: [
        "Sandalyeye dik bir şekilde oturun",
        "Bir bacağınızı yavaşça düz bir şekilde kaldırın",
        "Ayak bileğinizi kendinize doğru çekin (dorsifleksiyon)",
        "Bacağınızı 5-10 saniye yukarıda tutun",
        "Yavaşça yere indirin ve diğer bacakla tekrarlayın",
      ],
      sets: 3,
      reps: "10-15",
      restTime: 45,
      difficulty: "Başlangıç",
      equipment: "Sandalye",
      targetMuscles: ["Kuadriseps (Rectus Femoris, Vastus Lateralis)", "Vastus Medialis"],
      warnings: ["Diz ağrısı hissedersinizse durdurun", "Hareket yavaş ve kontrollü olmalı"],
    },
  },
  omuz: {
    sarkaç: {
      title: "Sarkaç Egzersizi (Pendulum)",
      description:
        "Omuz ağrıları ve donuk omuz için yapılan pasif hareket egzersizi. Omuz eklemini gevşetir ve hareket açıklığını artırır.",
      image: "/pendulum-shoulder-exercise-physiotherapy.jpg",
      video: "/shoulder-pendulum-exercise-demonstration-animation.jpg",
      instructions: [
        "Bir masaya yaslanarak öne doğru eğilin",
        "Sağlıklı kolunuzla masaya destek olun",
        "Ağrılı kolunuzu sarkıtın ve gevşetin",
        "Kolunuzu küçük daireler çizerek sallamaya başlayın",
        "Önce saat yönünde, sonra ters yönde çevirin",
        "Kaslarınızı gevşek tutun, ağırlık sallanımı sağlasın",
      ],
      sets: 3,
      reps: "10 her yön",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Masa/Sandalye",
      targetMuscles: ["Rotator Cuff", "Deltoid", "Omuz Kapsülü"],
      warnings: ["Kas gücü kullanmayın, salınım pasif olmalı", "Ağrı artarsa durdurun"],
    },
  },
  bel: {
    "pelvik-tilt": {
      title: "Pelvik Tilt Egzersizi",
      description:
        "Bel ağrılarını azaltan ve core kaslarını aktive eden temel fizyoterapi hareketi. Lomber lordozis ve postür düzeltmede etkilidir.",
      image: "/lower-back-pain-exercises-physiotherapy.jpg",
      video: "/pelvic-tilt-exercise-demonstration-animation.jpg",
      instructions: [
        "Sırt üstü yatın, dizlerinizi bükerek ayaklarınızı yere koyun",
        "Kollarınızı yanlarınızda rahat bir pozisyonda tutun",
        "Alt karın kaslarınızı sıkarak bel bölgenizi yere bastırın",
        "5-10 saniye bu pozisyonda tutun",
        "Gevşetin ve tekrarlayın",
      ],
      sets: 3,
      reps: "10-15",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Egzersiz Matı",
      targetMuscles: ["Transversus Abdominis", "Multifidus", "Pelvik Taban Kasları"],
      warnings: ["Nefes tutmayın", "Hareket küçük ve kontrollü olmalı"],
    },
  },
  "el-bilek": {
    "bilek-fleksiyonu": {
      title: "Bilek Fleksiyonu Egzersizi",
      description: "El bileği kaslarını güçlendiren ve karpal tünel sendromu tedavisinde kullanılan egzersiz.",
      image: "/hand-and-wrist-physiotherapy-exercises.jpg",
      video: "/wrist-flexion-exercise-demonstration.jpg",
      instructions: [
        "Önkolunuzu bir yüzeye yerleştirin, eli dışarıda bırakın",
        "Avucunuz yukarı bakacak şekilde pozisyon alın",
        "Hafif bir ağırlık tutun (veya ağırlıksız başlayın)",
        "Bileğinizi yukarı doğru kaldırın",
        "Yavaşça başlangıç pozisyonuna dönün",
      ],
      sets: 3,
      reps: "10-15",
      restTime: 45,
      difficulty: "Başlangıç",
      equipment: "Hafif Ağırlık (0.5-1 kg)",
      targetMuscles: ["Fleksor Karpi Radialis", "Fleksor Karpi Ulnaris"],
      warnings: ["Çok ağır ağırlık kullanmayın", "Ağrı hissederseniz durdurun"],
    },
  },
  ayak: {
    "ayak-bileği-pumpa": {
      title: "Ayak Bileği Pompa Egzersizi",
      description:
        "Ayak bileği mobilitesini artıran ve şişliği azaltan temel egzersiz. Burkulma sonrası rehabilitasyonda kullanılır.",
      image: "/ankle-and-foot-physiotherapy-rehabilitation.jpg",
      video: "/ankle-pump-exercise-demonstration-animation.jpg",
      instructions: [
        "Sırt üstü veya oturarak pozisyon alın",
        "Bacağınızı uzatın",
        "Ayak parmaklarınızı kendinize doğru çekin",
        "Sonra ayak parmaklarınızı öne doğru uzatın",
        "Hareketi ritmik bir şekilde tekrarlayın",
      ],
      sets: 3,
      reps: "15-20",
      restTime: 30,
      difficulty: "Başlangıç",
      equipment: "Ekipman Yok",
      targetMuscles: ["Tibialis Anterior", "Gastroknemius", "Soleus"],
      warnings: ["Hareket yumuşak olmalı", "Kramp hissederseniz dinlenin"],
    },
  },
}

export default function ExercisePage({ params }: { params: { category: string; exercise: string } }) {
  const exercise = exerciseDetails[params.category]?.[params.exercise] || exerciseDetails["boyun-sirt"]["boyun-germe"]

  const [currentSet, setCurrentSet] = useState(1)
  const [currentRep, setCurrentRep] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [restTimeLeft, setRestTimeLeft] = useState(exercise.restTime)
  const [isRestTimerActive, setIsRestTimerActive] = useState(false)
  const [showVideo, setShowVideo] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRestTimerActive && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((time) => time - 1)
      }, 1000)
    } else if (restTimeLeft === 0) {
      setIsRestTimerActive(false)
      setIsResting(false)
      setRestTimeLeft(exercise.restTime)
    }
    return () => clearInterval(interval)
  }, [isRestTimerActive, restTimeLeft, exercise.restTime])

  const handleRepComplete = () => {
    const maxReps = Number.parseInt(exercise.reps.split("-")[1])
    if (currentRep < maxReps) {
      setCurrentRep(currentRep + 1)
    }
  }

  const handleRepDecrease = () => {
    if (currentRep > 0) {
      setCurrentRep(currentRep - 1)
    }
  }

  const handleSetComplete = () => {
    if (currentSet < exercise.sets) {
      setCurrentSet(currentSet + 1)
      setCurrentRep(0)
      setIsResting(true)
      setIsRestTimerActive(true)
      setRestTimeLeft(exercise.restTime)
    }
  }

  const handleReset = () => {
    setCurrentSet(1)
    setCurrentRep(0)
    setIsResting(false)
    setIsRestTimerActive(false)
    setRestTimeLeft(exercise.restTime)
  }

  const toggleRestTimer = () => {
    setIsRestTimerActive(!isRestTimerActive)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/kategori/${params.category}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Geri Dön
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Exercise Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{exercise.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{exercise.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visual Section */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-muted">
                {showVideo && exercise.video ? (
                  <img
                    src={exercise.video || "/placeholder.svg"}
                    alt={`${exercise.title} - Hareket Gösterimi`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={exercise.image || "/placeholder.svg"}
                    alt={exercise.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {exercise.video && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant={showVideo ? "default" : "secondary"}
                      onClick={() => setShowVideo(true)}
                      className="gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Animasyon
                    </Button>
                    <Button
                      size="sm"
                      variant={!showVideo ? "default" : "secondary"}
                      onClick={() => setShowVideo(false)}
                    >
                      Resim
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Nasıl Yapılır?</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {exercise.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed pt-0.5">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {exercise.warnings && (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Önemli Uyarılar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exercise.warnings.map((warning: string, index: number) => (
                      <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-destructive">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Workout Tracker Section */}
          <div className="space-y-6">
            {/* Set & Rep Counter */}
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-center">Egzersiz Takibi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Set */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Mevcut Set</p>
                  <div className="text-6xl font-bold text-accent">
                    {currentSet} <span className="text-3xl text-muted-foreground">/ {exercise.sets}</span>
                  </div>
                </div>

                {/* Current Rep */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Tekrar Sayısı</p>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleRepDecrease}
                      disabled={isResting}
                      className="h-12 w-12 bg-transparent"
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                    <div className="text-5xl font-bold min-w-[100px] text-center">{currentRep}</div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleRepComplete}
                      disabled={isResting}
                      className="h-12 w-12 bg-transparent"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Hedef: {exercise.reps} tekrar</p>
                </div>

                {/* Rest Timer */}
                {isResting && (
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Dinlenme Süresi</p>
                    <div className="text-5xl font-bold text-primary mb-4">
                      {Math.floor(restTimeLeft / 60)}:{(restTimeLeft % 60).toString().padStart(2, "0")}
                    </div>
                    <Button onClick={toggleRestTimer} variant="outline" size="sm" className="gap-2 bg-transparent">
                      {isRestTimerActive ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Durdur
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Devam Et
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleSetComplete}
                    disabled={isResting || currentSet >= exercise.sets}
                    className="flex-1"
                    size="lg"
                  >
                    Set Tamamla
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="lg" className="gap-2 bg-transparent">
                    <RotateCcw className="w-4 h-4" />
                    Sıfırla
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Exercise Info */}
            <Card>
              <CardHeader>
                <CardTitle>Egzersiz Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Zorluk</p>
                    <p className="font-semibold">{exercise.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Ekipman</p>
                    <p className="font-semibold">{exercise.equipment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Set Sayısı</p>
                    <p className="font-semibold">{exercise.sets} set</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tekrar</p>
                    <p className="font-semibold">{exercise.reps} tekrar</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Hedef Kaslar ve Bölgeler</p>
                  <div className="flex flex-wrap gap-2">
                    {exercise.targetMuscles.map((muscle: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
