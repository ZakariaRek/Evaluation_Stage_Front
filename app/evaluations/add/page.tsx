import { EvaluationForm } from "@/components/evaluation-form"

export default function AddEvaluationPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Ajouter une Évaluation</h1>
      <EvaluationForm />
    </main>
  )
}
