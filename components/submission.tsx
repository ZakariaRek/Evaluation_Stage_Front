import { Card, CardContent } from "@/components/ui/card"

import type { FormData as MainFormData } from "../evaluation-form";

// Use the same FormData type from the main form
type FormData = MainFormData;

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
      <h2 className="text-2xl font-bold text-center text-primary">Récapitulatif de l'Évaluation</h2>

      <div className="space-y-6">
        <Card className="border-accent">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-accent-foreground">Informations Personnelles</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom du stagiaire</p>
                  <p className="font-medium">{formData.studentName || "Non renseigné"}</p>
                  <p className="text-xs text-muted-foreground">CIN: {formData.stagiaireCIN || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entreprise</p>
                  <p className="font-medium">{formData.companyName || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tuteur</p>
                  <p className="font-medium">{formData.tutorName || "Non renseigné"}</p>
                  <p className="text-xs text-muted-foreground">CIN: {formData.tuteurCIN || "Non renseigné"}</p>
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
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-accent-foreground">Appréciations Globales</h3>
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
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-accent-foreground">Compétences liées à l'individu</h3>
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
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-accent-foreground">Compétences liées à l'entreprise</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Analyser le fonctionnement de l'entreprise</p>
                  <p>{getCompetencyLevelLabel(formData.companyCompetencies?.company?.companyAnalysis || "")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Analyser la démarche projet</p>
                  <p>{getCompetencyLevelLabel(formData.companyCompetencies?.company?.projectApproach || "")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Comprendre la politique environnementale</p>
                  <p>{getCompetencyLevelLabel(formData.companyCompetencies?.company?.environmentalPolicy || "")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rechercher l'information nécessaire</p>
                  <p>{getCompetencyLevelLabel(formData.companyCompetencies?.company?.informationResearch || "")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Note sur 20 (entreprise)</p>
                  <p>{formData.companyCompetencies?.companyGrade || "Non renseigné"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-accent-foreground">Compétences scientifiques et techniques</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Conception préliminaire de produits/services/processus</p>
                  <p>{getCompetencyLevelLabel(formData.companyCompetencies?.technical?.preliminaryDesign || "")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Note sur 20 (techniques)</p>
                  <p>{formData.companyCompetencies?.technicalGrade || "Non renseigné"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-accent-foreground">Compétences spécifiques métier</h3>
              {formData.specificCompetencies?.some(comp => comp.name.trim() !== "") ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-accent/30">
                        <th className="py-2 px-4 text-left">#</th>
                        <th className="py-2 px-4 text-left">Compétence</th>
                        <th className="py-2 px-4 text-left">Niveau</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.specificCompetencies
                        .filter(comp => comp.name.trim() !== "")
                        .map((comp, index) => (
                          <tr key={index} className="border-b border-accent/30">
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">{comp.name}</td>
                            <td className="py-2 px-4">{getCompetencyLevelLabel(comp.level)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground italic">Aucune compétence spécifique supplémentaire renseignée</p>
              )}
            </div>
          </CardContent>
        </Card>

       

        <div className="border-t pt-6 border-accent/30">
          <p className="text-center text-muted-foreground">
            Veuillez vérifier les informations ci-dessus avant de soumettre l'évaluation.
          </p>
        </div>
      </div>
    </div>
  )
}