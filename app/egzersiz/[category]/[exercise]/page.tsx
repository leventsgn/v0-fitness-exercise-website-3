import ExerciseClient from "./ExerciseClient"
import { notFound } from "next/navigation"
import { exerciseDetails } from "../../data"

export default async function ExercisePage({ params }: { params: { category: string; exercise: string } | Promise<{ category: string; exercise: string }> }) {
  const { category, exercise } = await params
  const exerciseObj = exerciseDetails[category]?.[exercise]

  if (!exerciseObj) {
    notFound()
  }

  return <ExerciseClient category={category} exercise={exercise} exerciseData={exerciseObj} />
}

export async function generateStaticParams() {
  return Object.entries(exerciseDetails).flatMap(([category, exercises]) =>
    Object.keys(exercises).map((exercise) => ({ category, exercise }))
  )
}
