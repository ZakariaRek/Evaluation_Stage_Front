import { EvaluationForm } from "@/components/evaluation-form"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Evaluation Stage Etudiants</h1>
      <p className="text-center text-muted-foreground mb-8">
        Bienvenue dans le système d'évaluation des stages. Utilisez la navigation pour accéder aux différentes
        fonctionnalités.
      </p>
      <EvaluationForm />
    </main>
  )
}
