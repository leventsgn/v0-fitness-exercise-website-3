"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Activity, ArrowLeft, User, Users, Plus, Search, Calendar, FileText, Trash2, ClipboardList } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Patient {
  id: string
  name: string
  age: string
  phone: string
  diagnosis: string
  sessionCount: number
  lastVisit: string
  assignedExercises: Array<{
    id: string
    category: string
    exercise: string
    sets: number
    reps: number
    frequency: string
    notes: string
  }>
}

const availableExercises = [
  { category: "Boyun ve Sırt", exercises: ["Boyun Germe", "Kedi-İnek Hareketi", "Omuz Sıkma"] },
  { category: "Diz", exercises: ["Quadriceps Güçlendirme", "Hamstring Germe", "Duvar Squat"] },
  { category: "Omuz", exercises: ["Sarkaç Hareketi", "Duvar Tırmanışı", "Omuz Rotasyonu"] },
  { category: "Bel", exercises: ["Pelvik Tilt", "Köprü Hareketi", "Kedi-İnek"] },
  { category: "El ve Bilek", exercises: ["Bilek Fleksiyonu", "Parmak Germe", "Kavrama Güçlendirme"] },
  { category: "Ayak", exercises: ["Ayak Pompası", "Ayak Bileği Rotasyonu", "Parmak Kaldırma"] },
]

export default function TherapistPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isAssigningExercise, setIsAssigningExercise] = useState(false)

  // New patient form
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    phone: "",
    diagnosis: "",
  })

  // New exercise assignment form
  const [newExercise, setNewExercise] = useState({
    category: "",
    exercise: "",
    sets: 3,
    reps: 10,
    frequency: "Günde 2 kez",
    notes: "",
  })

  useEffect(() => {
    const savedPatients = localStorage.getItem("therapistPatients")
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients))
    }
  }, [])

  const savePatients = (updatedPatients: Patient[]) => {
    setPatients(updatedPatients)
    localStorage.setItem("therapistPatients", JSON.stringify(updatedPatients))
  }

  const addPatient = () => {
    if (!newPatient.name || !newPatient.age) return

    const patient: Patient = {
      id: Date.now().toString(),
      ...newPatient,
      sessionCount: 0,
      lastVisit: new Date().toLocaleDateString("tr-TR"),
      assignedExercises: [],
    }

    savePatients([...patients, patient])
    setNewPatient({ name: "", age: "", phone: "", diagnosis: "" })
    setIsAddingPatient(false)
  }

  const deletePatient = (id: string) => {
    savePatients(patients.filter((p) => p.id !== id))
  }

  const assignExercise = () => {
    if (!selectedPatient || !newExercise.category || !newExercise.exercise) return

    const exercise = {
      id: Date.now().toString(),
      ...newExercise,
    }

    const updatedPatients = patients.map((p) => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          assignedExercises: [...p.assignedExercises, exercise],
        }
      }
      return p
    })

    savePatients(updatedPatients)
    setNewExercise({
      category: "",
      exercise: "",
      sets: 3,
      reps: 10,
      frequency: "Günde 2 kez",
      notes: "",
    })
    setIsAssigningExercise(false)
    setSelectedPatient(updatedPatients.find((p) => p.id === selectedPatient.id) || null)
  }

  const removeExercise = (patientId: string, exerciseId: string) => {
    const updatedPatients = patients.map((p) => {
      if (p.id === patientId) {
        return {
          ...p,
          assignedExercises: p.assignedExercises.filter((e) => e.id !== exerciseId),
        }
      }
      return p
    })

    savePatients(updatedPatients)
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(updatedPatients.find((p) => p.id === patientId) || null)
    }
  }

  const filteredPatients = patients.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
                  <h1 className="text-2xl font-bold tracking-tight">Uzman Fizyoterapist</h1>
                  <p className="text-sm text-muted-foreground">Melike G.</p>
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
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Hasta</p>
                  <p className="text-2xl font-bold">{patients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Tedavi</p>
                  <p className="text-2xl font-bold">{patients.filter((p) => p.assignedExercises.length > 0).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bugün</p>
                  <p className="text-2xl font-bold">
                    {patients.filter((p) => p.lastVisit === new Date().toLocaleDateString("tr-TR")).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Egzersiz</p>
                  <p className="text-2xl font-bold">
                    {patients.reduce((acc, p) => acc + p.assignedExercises.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add Patient */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Hasta ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Yeni Hasta Ekle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Hasta Ekle</DialogTitle>
                <DialogDescription>Hasta bilgilerini girin</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad *</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Yaş *</Label>
                  <Input
                    id="age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    placeholder="Örn: 45"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    placeholder="Örn: 0555 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Tanı</Label>
                  <Textarea
                    id="diagnosis"
                    value={newPatient.diagnosis}
                    onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
                    placeholder="Örn: Lomber disk hernisi"
                    rows={3}
                  />
                </div>
                <Button onClick={addPatient} className="w-full">
                  Hasta Ekle
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Patient List */}
        {filteredPatients.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Hasta bulunamadı" : "Henüz hasta kaydı bulunmuyor"}
              </p>
              <Button onClick={() => setIsAddingPatient(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                İlk Hastayı Ekle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:border-accent transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{patient.age} yaş</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletePatient(patient.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Telefon</p>
                      <p className="font-medium">{patient.phone || "-"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Son Ziyaret</p>
                      <p className="font-medium">{patient.lastVisit}</p>
                    </div>
                  </div>

                  {patient.diagnosis && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tanı</p>
                      <Badge variant="secondary">{patient.diagnosis}</Badge>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Atanan Egzersizler ({patient.assignedExercises.length})</p>
                      <Dialog
                        open={isAssigningExercise && selectedPatient?.id === patient.id}
                        onOpenChange={(open) => {
                          setIsAssigningExercise(open)
                          if (open) setSelectedPatient(patient)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Plus className="w-4 h-4" />
                            Egzersiz Ata
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Egzersiz Ata - {patient.name}</DialogTitle>
                            <DialogDescription>Hastaya uygun egzersiz programı oluşturun</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label>Kategori *</Label>
                              <Select
                                value={newExercise.category}
                                onValueChange={(value) => {
                                  setNewExercise({ ...newExercise, category: value, exercise: "" })
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Kategori seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableExercises.map((cat) => (
                                    <SelectItem key={cat.category} value={cat.category}>
                                      {cat.category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {newExercise.category && (
                              <div className="space-y-2">
                                <Label>Egzersiz *</Label>
                                <Select
                                  value={newExercise.exercise}
                                  onValueChange={(value) => setNewExercise({ ...newExercise, exercise: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Egzersiz seçin" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableExercises
                                      .find((cat) => cat.category === newExercise.category)
                                      ?.exercises.map((ex) => (
                                        <SelectItem key={ex} value={ex}>
                                          {ex}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Set Sayısı</Label>
                                <Input
                                  type="number"
                                  value={newExercise.sets}
                                  onChange={(e) =>
                                    setNewExercise({ ...newExercise, sets: Number.parseInt(e.target.value) || 3 })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Tekrar Sayısı</Label>
                                <Input
                                  type="number"
                                  value={newExercise.reps}
                                  onChange={(e) =>
                                    setNewExercise({ ...newExercise, reps: Number.parseInt(e.target.value) || 10 })
                                  }
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Sıklık</Label>
                              <Select
                                value={newExercise.frequency}
                                onValueChange={(value) => setNewExercise({ ...newExercise, frequency: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Günde 1 kez">Günde 1 kez</SelectItem>
                                  <SelectItem value="Günde 2 kez">Günde 2 kez</SelectItem>
                                  <SelectItem value="Günde 3 kez">Günde 3 kez</SelectItem>
                                  <SelectItem value="Haftada 3 kez">Haftada 3 kez</SelectItem>
                                  <SelectItem value="Haftada 5 kez">Haftada 5 kez</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Notlar</Label>
                              <Textarea
                                value={newExercise.notes}
                                onChange={(e) => setNewExercise({ ...newExercise, notes: e.target.value })}
                                placeholder="Özel talimatlar, dikkat edilmesi gerekenler..."
                                rows={3}
                              />
                            </div>

                            <Button onClick={assignExercise} className="w-full">
                              Egzersizi Ata
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {patient.assignedExercises.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Henüz egzersiz atanmamış</p>
                    ) : (
                      <div className="space-y-2">
                        {patient.assignedExercises.map((exercise) => (
                          <div key={exercise.id} className="border rounded-lg p-3 space-y-2 bg-muted/30">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {exercise.category}
                                  </Badge>
                                  <p className="font-medium text-sm">{exercise.exercise}</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>
                                    {exercise.sets} set x {exercise.reps} tekrar
                                  </span>
                                  <span>•</span>
                                  <span>{exercise.frequency}</span>
                                </div>
                                {exercise.notes && (
                                  <p className="text-xs text-muted-foreground mt-1">{exercise.notes}</p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeExercise(patient.id, exercise.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                      <FileText className="w-4 h-4" />
                      Rapor Görüntüle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
