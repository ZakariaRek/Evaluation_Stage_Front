import { EvaluationForm } from "@/components/evaluation-form"
import { StagiaireForm } from "@/components/form-pages/stagiaire-form"

export default function AddStagiairePage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Ajouter une Stagiaire</h1>
      
      <StagiaireForm />
    </main>
  )
}
