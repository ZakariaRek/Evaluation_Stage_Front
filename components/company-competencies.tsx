"use client"

import type { Dispatch, SetStateAction } from "react"
// Define FormData type inline since we can't import it
type FormData = {
  companyCompetencies?: {
    company?: {
      companyAnalysis?: string
      projectApproach?: string
      environmentalPolicy?: string
      informationResearch?: string
    }
    technical?: {
      preliminaryDesign?: string
    }
    companyGrade?: string
    technicalGrade?: string
  }
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

interface CompanyCompetenciesPageProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
}

export function CompanyCompetenciesPage({ formData, setFormData }: CompanyCompetenciesPageProps) {
  const handleCompetencyChange = (section: string, name: string, value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      companyCompetencies: {
        ...prev.companyCompetencies,
        [section]: {
          ...(section === 'company' ? prev.companyCompetencies?.company : prev.companyCompetencies?.technical) || {},
          [name]: value,
        },
      },
    }))
  }

  const handleGradeChange = (section: string, value: string) => {
    // Ensure the grade is a number between 0 and 20
    const numValue = value === "" ? "" : Math.min(Math.max(0, Number(value)), 20).toString()

    setFormData((prev: FormData) => ({
      ...prev,
      companyCompetencies: {
        ...prev.companyCompetencies,
        [`${section}Grade`]: numValue,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Compétences Professionnelles</h2>

      <Card className="border-accent border-2">
        <CardHeader className="bg-accent/10">
          <CardTitle className="text-lg text-accent-foreground">Compétences liées à l'entreprise (cocher les cases)</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-accent/30">
                  <th className="text-left py-2 w-1/2"></th>
                  <th className="text-center py-2">N/A</th>
                  <th className="text-center py-2">DEBUTANT</th>
                  <th className="text-center py-2">AUTONOME</th>
                  <th className="text-center py-2">AUTONOME +</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-accent/30">
                  <td className="py-3 pr-4">Être capable d'analyser le fonctionnement de l'entreprise d'accueil</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.companyAnalysis || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "companyAnalysis", value)}
                    >
                      <RadioGroupItem value="NA" id="company-analysis-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.companyAnalysis || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "companyAnalysis", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="company-analysis-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.companyAnalysis || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "companyAnalysis", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="company-analysis-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.companyAnalysis || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "companyAnalysis", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="company-analysis-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>

                <tr className="border-b border-accent/30">
                  <td className="py-3 pr-4">Être capable d'analyser la démarche projet, et d'organiser et de structurer un projet</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.projectApproach || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "projectApproach", value)}
                    >
                      <RadioGroupItem value="NA" id="project-approach-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.projectApproach || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "projectApproach", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="project-approach-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.projectApproach || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "projectApproach", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="project-approach-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.projectApproach || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "projectApproach", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="project-approach-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>

                <tr className="border-b border-accent/30">
                  <td className="py-3 pr-4">Être capable d'apprendre à déceler et à comprendre la politique environnementale de l'entreprise</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.environmentalPolicy || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "environmentalPolicy", value)}
                    >
                      <RadioGroupItem value="NA" id="environmental-policy-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.environmentalPolicy || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "environmentalPolicy", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="environmental-policy-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.environmentalPolicy || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "environmentalPolicy", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="environmental-policy-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.environmentalPolicy || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "environmentalPolicy", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="environmental-policy-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>

                <tr className="border-b border-accent/30">
                  <td className="py-3 pr-4">Être capable de rechercher, de sélectionner l'information nécessaire à ses activités</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.informationResearch || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "informationResearch", value)}
                    >
                      <RadioGroupItem value="NA" id="information-research-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.informationResearch || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "informationResearch", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="information-research-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.informationResearch || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "informationResearch", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="information-research-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.company?.informationResearch || ""}
                      onValueChange={(value) => handleCompetencyChange("company", "informationResearch", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="information-research-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Label htmlFor="company-grade" className="whitespace-nowrap font-medium">
              Note pour évaluer les compétences liées à l'entreprise. Donnez une note sur 20:
            </Label>
            <Input
              id="company-grade"
              type="number"
              min="0"
              max="20"
              className="w-24 border-accent focus-visible:ring-accent"
              value={formData.companyCompetencies?.companyGrade || ""}
              onChange={(e) => handleGradeChange("company", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent border-2">
        <CardHeader className="bg-accent/10">
          <CardTitle className="text-lg text-accent-foreground">Compétences scientifiques et techniques (cocher les cases)</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-accent/30">
                  <th className="text-left py-2 w-1/2"></th>
                  <th className="text-center py-2">NA</th>
                  <th className="text-center py-2">DEBUTANT</th>
                  <th className="text-center py-2">AUTONOME</th>
                  <th className="text-center py-2">AUTONOME +</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-accent/30">
                  <td className="py-3 pr-4">Être capable d'assurer la conception préliminaire de produits/services/processus / usages</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.technical?.preliminaryDesign || ""}
                      onValueChange={(value) => handleCompetencyChange("technical", "preliminaryDesign", value)}
                    >
                      <RadioGroupItem value="NA" id="preliminary-design-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.technical?.preliminaryDesign || ""}
                      onValueChange={(value) => handleCompetencyChange("technical", "preliminaryDesign", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="preliminary-design-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.technical?.preliminaryDesign || ""}
                      onValueChange={(value) => handleCompetencyChange("technical", "preliminaryDesign", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="preliminary-design-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.companyCompetencies?.technical?.preliminaryDesign || ""}
                      onValueChange={(value) => handleCompetencyChange("technical", "preliminaryDesign", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="preliminary-design-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Label htmlFor="technical-grade" className="whitespace-nowrap font-medium">
              Note pour évaluer les Compétences scientifiques et techniques, dont métier. Donnez une note sur 20:
            </Label>
            <Input
              id="technical-grade"
              type="number"
              min="0"
              max="20"
              className="w-24 border-accent focus-visible:ring-accent"
              value={formData.companyCompetencies?.technicalGrade || ""}
              onChange={(e) => handleGradeChange("technical", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}