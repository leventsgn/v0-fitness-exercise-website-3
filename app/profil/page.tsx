"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Activity, ArrowLeft, User, Heart, TrendingUp, FileText, Plus, Trash2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface PatientData {
  personalInfo: {
    name: string
    age: string
    phone: string
    email: string
  }
  medicalHistory: {
    diagnosis: string
    surgeries: string
    medications: string
    allergies: string
  }
  exerciseHistory: Array<{
    id: string
    date: string
    exercise: string
    category: string
    sets: number
    reps: number
    notes: string
  }>
  measurements: Array<{
    id: string
    date: string
    painLevel: number
    rangeOfMotion: string
    notes: string
  }>
  sessionCount: number
}

const defaultPatientData: PatientData = {
  personalInfo: {
    name: "",
    age: "",
    phone: "",
    email: "",
  },
  medicalHistory: {
    diagnosis: "",
    surgeries: "",
    medications: "",
    allergies: "",
  },
  exerciseHistory: [],
  measurements: [],
  sessionCount: 0,
}

export default function PatientProfilePage() {
  const [patientData, setPatientData] = useState<PatientData>(defaultPatientData)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<"personal" | "medical" | "exercise" | "measurements">("personal")

  useEffect(() => {
    const savedData = localStorage.getItem("patientData")
    if (savedData) {
      setPatientData(JSON.parse(savedData))
    }
  }, [])

  const saveData = () => {
    localStorage.setItem("patientData", JSON.stringify(patientData))
    setIsEditing(false)
  }

  const addExerciseRecord = () => {
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("tr-TR"),
      exercise: "",
      category: "",
      sets: 0,
      reps: 0,
      notes: "",
    }
    setPatientData({
      ...patientData,
      exerciseHistory: [...patientData.exerciseHistory, newRecord],
      sessionCount: patientData.sessionCount + 1,
    })
  }

  const addMeasurement = () => {
    const newMeasurement = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("tr-TR"),
      painLevel: 5,
      rangeOfMotion: "",
      notes: "",
    }
    setPatientData({
      ...patientData,
      measurements: [...patientData.measurements, newMeasurement],
    })
  }

  const deleteExerciseRecord = (id: string) => {
    setPatientData({
      ...patientData,
      exerciseHistory: patientData.exerciseHistory.filter((record) => record.id !== id),
    })
  }

  const deleteMeasurement = (id: string) => {
    setPatientData({
      ...patientData,
      measurements: patientData.measurements.filter((measurement) => measurement.id !== id),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <User className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Hasta Profili</h1>
                  <p className="text-sm text-muted-foreground">Kişisel sağlık bilgileriniz</p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Seans</p>
                  <p className="text-2xl font-bold">{patientData.sessionCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Egzersiz Kaydı</p>
                  <p className="text-2xl font-bold">{patientData.exerciseHistory.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ölçümler</p>
                  <p className="text-2xl font-bold">{patientData.measurements.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Son Ağrı Seviyesi</p>
                  <p className="text-2xl font-bold">
                    {patientData.measurements.length > 0
                      ? patientData.measurements[patientData.measurements.length - 1].painLevel
                      : "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            variant={activeTab === "personal" ? "default" : "outline"}
            onClick={() => setActiveTab("personal")}
            className="gap-2"
          >
            <User className="w-4 h-4" />
            Kişisel Bilgiler
          </Button>
          <Button
            variant={activeTab === "medical" ? "default" : "outline"}
            onClick={() => setActiveTab("medical")}
            className="gap-2"
          >
            <Heart className="w-4 h-4" />
            Tıbbi Geçmiş
          </Button>
          <Button
            variant={activeTab === "exercise" ? "default" : "outline"}
            onClick={() => setActiveTab("exercise")}
            className="gap-2"
          >
            <Activity className="w-4 h-4" />
            Egzersiz Geçmişi
          </Button>
          <Button
            variant={activeTab === "measurements" ? "default" : "outline"}
            onClick={() => setActiveTab("measurements")}
            className="gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Ölçümler ve Raporlar
          </Button>
        </div>

        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Kişisel Bilgiler</CardTitle>
              <Button onClick={() => (isEditing ? saveData() : setIsEditing(true))} size="sm">
                {isEditing ? "Kaydet" : "Düzenle"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input
                    id="name"
                    value={patientData.personalInfo.name}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        personalInfo: { ...patientData.personalInfo, name: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Yaş</Label>
                  <Input
                    id="age"
                    value={patientData.personalInfo.age}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        personalInfo: { ...patientData.personalInfo, age: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={patientData.personalInfo.phone}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        personalInfo: { ...patientData.personalInfo, phone: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={patientData.personalInfo.email}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        personalInfo: { ...patientData.personalInfo, email: e.target.value },
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Medical History Tab */}
        {activeTab === "medical" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tıbbi Geçmiş</CardTitle>
              <Button onClick={() => (isEditing ? saveData() : setIsEditing(true))} size="sm">
                {isEditing ? "Kaydet" : "Düzenle"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Tanı / Hastalık</Label>
                <Textarea
                  id="diagnosis"
                  value={patientData.medicalHistory.diagnosis}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      medicalHistory: { ...patientData.medicalHistory, diagnosis: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Örn: Lomber disk hernisi, L4-L5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surgeries">Ameliyat Geçmişi</Label>
                <Textarea
                  id="surgeries"
                  value={patientData.medicalHistory.surgeries}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      medicalHistory: { ...patientData.medicalHistory, surgeries: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                  rows={2}
                  placeholder="Geçirdiğiniz ameliyatları belirtin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">İlaç Kullanımı</Label>
                <Textarea
                  id="medications"
                  value={patientData.medicalHistory.medications}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      medicalHistory: { ...patientData.medicalHistory, medications: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                  rows={2}
                  placeholder="Düzenli kullandığınız ilaçlar"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Alerjiler</Label>
                <Textarea
                  id="allergies"
                  value={patientData.medicalHistory.allergies}
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      medicalHistory: { ...patientData.medicalHistory, allergies: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                  rows={2}
                  placeholder="Bilinen alerjileriniz"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exercise History Tab */}
        {activeTab === "exercise" && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Egzersiz Geçmişi</CardTitle>
                <Button onClick={addExerciseRecord} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Yeni Kayıt
                </Button>
              </CardHeader>
            </Card>

            {patientData.exerciseHistory.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Henüz egzersiz kaydı bulunmuyor</p>
                  <Button onClick={addExerciseRecord} className="mt-4 gap-2">
                    <Plus className="w-4 h-4" />
                    İlk Kaydı Ekle
                  </Button>
                </CardContent>
              </Card>
            ) : (
              patientData.exerciseHistory.map((record, index) => (
                <Card key={record.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary">{record.date}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteExerciseRecord(record.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Egzersiz Adı</Label>
                        <Input
                          value={record.exercise}
                          onChange={(e) => {
                            const updated = [...patientData.exerciseHistory]
                            updated[index].exercise = e.target.value
                            setPatientData({ ...patientData, exerciseHistory: updated })
                          }}
                          placeholder="Örn: Boyun Germe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Kategori</Label>
                        <Input
                          value={record.category}
                          onChange={(e) => {
                            const updated = [...patientData.exerciseHistory]
                            updated[index].category = e.target.value
                            setPatientData({ ...patientData, exerciseHistory: updated })
                          }}
                          placeholder="Örn: Boyun ve Sırt"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Set Sayısı</Label>
                        <Input
                          type="number"
                          value={record.sets}
                          onChange={(e) => {
                            const updated = [...patientData.exerciseHistory]
                            updated[index].sets = Number.parseInt(e.target.value) || 0
                            setPatientData({ ...patientData, exerciseHistory: updated })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tekrar Sayısı</Label>
                        <Input
                          type="number"
                          value={record.reps}
                          onChange={(e) => {
                            const updated = [...patientData.exerciseHistory]
                            updated[index].reps = Number.parseInt(e.target.value) || 0
                            setPatientData({ ...patientData, exerciseHistory: updated })
                          }}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Notlar</Label>
                        <Textarea
                          value={record.notes}
                          onChange={(e) => {
                            const updated = [...patientData.exerciseHistory]
                            updated[index].notes = e.target.value
                            setPatientData({ ...patientData, exerciseHistory: updated })
                          }}
                          placeholder="Egzersiz sırasında notlar, zorluk seviyesi vb."
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button onClick={saveData} className="mt-4 w-full">
                      Kaydet
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Measurements Tab */}
        {activeTab === "measurements" && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Ölçümler ve Raporlar</CardTitle>
                <Button onClick={addMeasurement} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Yeni Ölçüm
                </Button>
              </CardHeader>
            </Card>

            {patientData.measurements.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Henüz ölçüm kaydı bulunmuyor</p>
                  <Button onClick={addMeasurement} className="mt-4 gap-2">
                    <Plus className="w-4 h-4" />
                    İlk Ölçümü Ekle
                  </Button>
                </CardContent>
              </Card>
            ) : (
              patientData.measurements.map((measurement, index) => (
                <Card key={measurement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary">{measurement.date}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMeasurement(measurement.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Ağrı Seviyesi (0-10)</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            value={measurement.painLevel}
                            onChange={(e) => {
                              const updated = [...patientData.measurements]
                              updated[index].painLevel = Math.min(10, Math.max(0, Number.parseInt(e.target.value) || 0))
                              setPatientData({ ...patientData, measurements: updated })
                            }}
                            className="w-20"
                          />
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                              <div
                                key={level}
                                className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                                  measurement.painLevel >= level
                                    ? level <= 3
                                      ? "bg-green-500 text-white"
                                      : level <= 6
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                    : "bg-muted"
                                }`}
                                onClick={() => {
                                  const updated = [...patientData.measurements]
                                  updated[index].painLevel = level
                                  setPatientData({ ...patientData, measurements: updated })
                                }}
                              >
                                {level}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Hareket Açıklığı (ROM)</Label>
                        <Input
                          value={measurement.rangeOfMotion}
                          onChange={(e) => {
                            const updated = [...patientData.measurements]
                            updated[index].rangeOfMotion = e.target.value
                            setPatientData({ ...patientData, measurements: updated })
                          }}
                          placeholder="Örn: Boyun rotasyonu sağ 60°, sol 55°"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Genel Notlar</Label>
                        <Textarea
                          value={measurement.notes}
                          onChange={(e) => {
                            const updated = [...patientData.measurements]
                            updated[index].notes = e.target.value
                            setPatientData({ ...patientData, measurements: updated })
                          }}
                          placeholder="Günlük değerlendirme, ilerleme notları, gözlemler"
                          rows={3}
                        />
                      </div>
                    </div>
                    <Button onClick={saveData} className="mt-4 w-full">
                      Kaydet
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
