import type { FormData } from "../evaluation-form"

interface SubmissionPageProps {
  formData: FormData
}

export function SubmissionPage({ formData }: SubmissionPageProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR")
  }

  const getRatingLabel = (rating: number) => {
    const labels = ["", "Insuffisant", "Passable", "Bien", "Très bien", "Excellent"]
    return labels[rating] || ""
  }

  const getInvolvementLabel = (rating: number) => {
    const labels = ["", "Paresseux", "Le juste nécessaire", "Bonne", "Très forte", "Dépasse ses objectifs"]
    return labels[rating] || ""
  }

  const getOpennessLabel = (rating: number) => {
    const labels = ["", "Isolé(e) ou en opposition", "Renfermé(e) ou obtus", "Bonne", "Très bonne", "Excellente"]
    return labels[rating] || ""
  }

  const getQualityLabel = (rating: number) => {
    const labels = ["", "Médiocre", "Acceptable", "Bonne", "Très bonne", "Très professionnelle"]
    return labels[rating] || ""
  }

  const getCompetencyLevelLabel = (level: string) => {
    switch (level) {
      case "NA":
        return "Non applicable"
      case "DEBUTANT":
        return "Débutant"
      case "AUTONOME":
        return "Autonome"
      case "AUTONOME_PLUS":
        return "Autonome +"
      default:
        return "Non évalué"
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center">Récapitulatif de l'Évaluation</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Informations Personnelles</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom du stagiaire</p>
              <p>{formData.studentName || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Entreprise</p>
              <p>{formData.companyName || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tuteur</p>
              <p>{formData.tutorName || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Période de stage</p>
              <p>
                {formatDate(formData.startDate) || "Non renseigné"} au {formatDate(formData.endDate) || "Non renseigné"}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Thème du projet principal</p>
            <p className="whitespace-pre-line">{formData.projectTheme || "Non renseigné"}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Objectifs assignés</p>
            <p className="whitespace-pre-line">{formData.objectives || "Non renseigné"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Appréciations Globales</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Implication dans ses activités</p>
              <p>{getInvolvementLabel(formData.globalAssessment.involvement)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ouverture aux autres</p>
              <p>{getOpennessLabel(formData.globalAssessment.openness)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Qualité de ses "productions"</p>
              <p>{getQualityLabel(formData.globalAssessment.productionQuality)}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Observations sur l'ensemble du travail</p>
            <p className="whitespace-pre-line">{formData.globalAssessment.observations || "Non renseigné"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Compétences liées à l'individu</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Analyse et synthèse</p>
              <p>{getCompetencyLevelLabel(formData.individualCompetencies.analysis)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Proposer des méthodes et axes de travail</p>
              <p>{getCompetencyLevelLabel(formData.individualCompetencies.methods)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faire adhérer les acteurs</p>
              <p>{getCompetencyLevelLabel(formData.individualCompetencies.stakeholders)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">S'autoévaluer</p>
              <p>{getCompetencyLevelLabel(formData.individualCompetencies.selfEvaluation)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Identifier des problèmes complexes</p>
              <p>{getCompetencyLevelLabel(formData.individualCompetencies.complexProblems)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Note sur 20</p>
              <p>{formData.individualCompetencies.grade || "Non renseigné"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Compétences Professionnelles</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Connaissances techniques</p>
              <p>{getRatingLabel(formData.professionalSkills.technicalKnowledge)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Résolution de problèmes</p>
              <p>{getRatingLabel(formData.professionalSkills.problemSolving)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adaptabilité</p>
              <p>{getRatingLabel(formData.professionalSkills.adaptability)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Initiative</p>
              <p>{getRatingLabel(formData.professionalSkills.initiative)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Qualité du travail</p>
              <p>{getRatingLabel(formData.professionalSkills.workQuality)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Compétences de Communication</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Travail d'équipe</p>
              <p>{getRatingLabel(formData.communicationSkills.teamwork)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Communication</p>
              <p>{getRatingLabel(formData.communicationSkills.communication)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ponctualité</p>
              <p>{getRatingLabel(formData.communicationSkills.punctuality)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Professionnalisme</p>
              <p>{getRatingLabel(formData.communicationSkills.professionalism)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Évaluation Générale</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Points forts</p>
              <p className="whitespace-pre-line">{formData.generalAssessment.strengths || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Points à améliorer</p>
              <p className="whitespace-pre-line">{formData.generalAssessment.areasForImprovement || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Commentaire général</p>
              <p className="whitespace-pre-line">{formData.generalAssessment.overallComment || "Non renseigné"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Évaluation globale</p>
              <p>{getRatingLabel(formData.generalAssessment.overallRating)}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-center text-muted-foreground">
            Veuillez vérifier les informations ci-dessus avant de soumettre l'évaluation.
          </p>
        </div>
      </div>
    </div>
  )
}
