"use client"

import Link from "next/link"

const REPO_NAME = process.env.GITHUB_PAGES ? (process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? 'v0-fitness-exercise-website-3') : ''
const BASE = REPO_NAME ? `/${REPO_NAME}` : ''
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw, Plus, Minus, User, AlertCircle, Music } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ExerciseClient({ category, exercise, exerciseData }: { category: string; exercise: string; exerciseData: any }) {
  const ex = exerciseData

  const [currentSet, setCurrentSet] = useState(1)
  const [currentRep, setCurrentRep] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [restTimeLeft, setRestTimeLeft] = useState(ex.restTime)
  const [isRestTimerActive, setIsRestTimerActive] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [painLevel, setPainLevel] = useState(0)
  const [painHistory, setPainHistory] = useState<number[]>([])
  const [showMusic, setShowMusic] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRestTimerActive && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((time) => time - 1)
      }, 1000)
    } else if (restTimeLeft === 0) {
      setIsRestTimerActive(false)
      setIsResting(false)
      setRestTimeLeft(ex.restTime)
    }
    return () => clearInterval(interval)
  }, [isRestTimerActive, restTimeLeft, ex.restTime])

  const handleRepComplete = () => {
    const maxReps = Number.parseInt(ex.reps.split("-")[1])
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
    if (currentSet < ex.sets) {
      // Ağrı seviyesini kaydet
      if (painLevel > 0) {
        setPainHistory([...painHistory, painLevel])
      }
      setCurrentSet(currentSet + 1)
      setCurrentRep(0)
      setIsResting(true)
      setIsRestTimerActive(true)
      setRestTimeLeft(ex.restTime)
      setPainLevel(0) // Yeni set için sıfırla
    }
  }

  const handleReset = () => {
    setCurrentSet(1)
    setCurrentRep(0)
    setIsResting(false)
    setIsRestTimerActive(false)
    setRestTimeLeft(ex.restTime)
    setPainLevel(0)
    setPainHistory([])
  }

  const toggleRestTimer = () => {
    setIsRestTimerActive(!isRestTimerActive)
  }

  const getPainColor = (level: number) => {
    if (level === 0) return "bg-muted text-muted-foreground"
    if (level <= 3) return "bg-green-500/20 text-green-600 dark:text-green-400"
    if (level <= 5) return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
    if (level <= 7) return "bg-orange-500/20 text-orange-600 dark:text-orange-400"
    return "bg-red-500/20 text-red-600 dark:text-red-400"
  }

  const getPainDescription = (level: number) => {
    if (level === 0) return "Ağrı Yok"
    if (level <= 2) return "Hafif Rahatsızlık"
    if (level <= 4) return "Orta Rahatsızlık"
    if (level <= 6) return "Belirgin Ağrı"
    if (level <= 8) return "Şiddetli Ağrı"
    return "Dayanılmaz Ağrı"
  }

  const averagePain = painHistory.length > 0 
    ? (painHistory.reduce((a, b) => a + b, 0) / painHistory.length).toFixed(1)
    : "0"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/kategori/${category}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Geri Dön
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-lg bg-transparent"
                onClick={() => setShowMusic(!showMusic)}
              >
                <Music className="w-5 h-5" />
                <span className="sr-only">Müzik</span>
              </Button>
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
        {/* Spotify Music Player */}
        {showMusic && (
          <Card className="mb-6 border-green-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-green-500" />
                Egzersiz Müziği
              </CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/0LCzBfmaBiOh4K92e2BeJC?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </CardContent>
          </Card>
        )}

        {/* Exercise Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{ex.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{ex.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visual Section */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-muted">
                {showVideo && ex.video ? (
                  <img
                    src={ex.video ? ex.video : `${BASE}/placeholder.svg`}
                    alt={`${ex.title} - Hareket Gösterimi`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={ex.image ? ex.image : `${BASE}/placeholder.svg`} alt={ex.title} className="w-full h-full object-cover" />
                )}
                {ex.video && (
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
                  {ex.instructions.map((instruction: string, index: number) => (
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

            {ex.warnings && (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Önemli Uyarılar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {ex.warnings.map((warning: string, index: number) => (
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
            {/* Pain Level Assessment */}
            <Card className="border-orange-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Ağrı Değerlendirmesi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 px-4 py-2 rounded-lg ${getPainColor(painLevel)}`}>
                    {painLevel}/10
                  </div>
                  <p className="text-sm text-muted-foreground">{getPainDescription(painLevel)}</p>
                </div>
                
                <div className="grid grid-cols-11 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <Button
                      key={level}
                      size="sm"
                      variant={painLevel === level ? "default" : "outline"}
                      onClick={() => setPainLevel(level)}
                      disabled={isResting}
                      className={`p-0 h-10 text-xs ${painLevel === level ? getPainColor(level) : ""}`}
                    >
                      {level}
                    </Button>
                  ))}
                </div>

                {painHistory.length > 0 && (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Ortalama Ağrı:</span>
                      <span className="font-semibold">{averagePain}/10</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {painHistory.map((pain, idx) => (
                        <div
                          key={idx}
                          className={`h-2 flex-1 rounded ${getPainColor(pain)}`}
                          title={`Set ${idx + 1}: ${pain}/10`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

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
                    {currentSet} <span className="text-3xl text-muted-foreground">/ {ex.sets}</span>
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
                  <p className="text-sm text-muted-foreground mt-2">Hedef: {ex.reps} tekrar</p>
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
                    disabled={isResting || currentSet >= ex.sets}
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
                    <p className="font-semibold">{ex.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Ekipman</p>
                    <p className="font-semibold">{ex.equipment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Set Sayısı</p>
                    <p className="font-semibold">{ex.sets} set</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tekrar</p>
                    <p className="font-semibold">{ex.reps} tekrar</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Hedef Kaslar ve Bölgeler</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.targetMuscles.map((muscle: string, index: number) => (
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
