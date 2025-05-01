import { TuteurForm } from "@/components/form-pages/tuteur-form"

export default function AddTuteurPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Ajouter une Tuteur</h1>
      <TuteurForm />
    </main>
  )
}
