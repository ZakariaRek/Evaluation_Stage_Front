"use client"

import type { Dispatch, SetStateAction } from "react"
import type { FormData } from "../evaluation-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ProfessionalSkillsPageProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
}

export function ProfessionalSkillsPage({ formData, setFormData }: ProfessionalSkillsPageProps) {
  const handleCompetencyChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      individualCompetencies: {
        ...prev.individualCompetencies,
        [name]: value,
      },
    }))
  }

  const handleGradeChange = (value: string) => {
    // Ensure the grade is a number between 0 and 20
    const numValue = value === "" ? "" : Math.min(Math.max(0, Number(value)), 20).toString()

    setFormData((prev) => ({
      ...prev,
      individualCompetencies: {
        ...prev.individualCompetencies,
        grade: numValue,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Compétences Professionnelles</h2>

      <Card className="border-2">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">EVALUATIONS DES COMPETENCES DE L'ETUDIANT(E)</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="mb-2">Pour chaque compétence, les niveaux possibles sont :</p>
          <div className="space-y-1">
            <p>
              <strong>NA :</strong> Non applicable - Compétence non appliquée, ou trop peu
            </p>
            <p>
              <strong>DEBUTANT :</strong> Applique, avec aide, les savoirs
            </p>
            <p>
              <strong>AUTONOME :</strong> Applique les pratiques de façon autonome
            </p>
            <p>
              <strong>AUTONOME + :</strong> Résout des problèmes selon la situation de travail - A un jugement critique
              pour anticiper ou s'adapter
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Compétences liées à l'individu (cocher les cases)</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 w-1/2"></th>
                  <th className="text-center py-2">NA</th>
                  <th className="text-center py-2">DEBUTANT</th>
                  <th className="text-center py-2">AUTONOME</th>
                  <th className="text-center py-2">AUTONOME +</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 pr-4">Être capable d'analyse et de synthèse</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.analysis || ""}
                      onValueChange={(value) => handleCompetencyChange("analysis", value)}
                    >
                      <RadioGroupItem value="NA" id="analysis-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.analysis || ""}
                      onValueChange={(value) => handleCompetencyChange("analysis", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="analysis-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.analysis || ""}
                      onValueChange={(value) => handleCompetencyChange("analysis", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="analysis-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.analysis || ""}
                      onValueChange={(value) => handleCompetencyChange("analysis", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="analysis-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Être capable de proposer des méthodes et des axes de travail</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.methods || ""}
                      onValueChange={(value) => handleCompetencyChange("methods", value)}
                    >
                      <RadioGroupItem value="NA" id="methods-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.methods || ""}
                      onValueChange={(value) => handleCompetencyChange("methods", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="methods-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.methods || ""}
                      onValueChange={(value) => handleCompetencyChange("methods", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="methods-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.methods || ""}
                      onValueChange={(value) => handleCompetencyChange("methods", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="methods-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Être capable de faire adhérer les acteurs</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.stakeholders || ""}
                      onValueChange={(value) => handleCompetencyChange("stakeholders", value)}
                    >
                      <RadioGroupItem value="NA" id="stakeholders-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.stakeholders || ""}
                      onValueChange={(value) => handleCompetencyChange("stakeholders", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="stakeholders-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.stakeholders || ""}
                      onValueChange={(value) => handleCompetencyChange("stakeholders", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="stakeholders-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.stakeholders || ""}
                      onValueChange={(value) => handleCompetencyChange("stakeholders", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="stakeholders-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Être capable de s'autoévaluer</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.selfEvaluation || ""}
                      onValueChange={(value) => handleCompetencyChange("selfEvaluation", value)}
                    >
                      <RadioGroupItem value="NA" id="selfEvaluation-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.selfEvaluation || ""}
                      onValueChange={(value) => handleCompetencyChange("selfEvaluation", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="selfEvaluation-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.selfEvaluation || ""}
                      onValueChange={(value) => handleCompetencyChange("selfEvaluation", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="selfEvaluation-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.selfEvaluation || ""}
                      onValueChange={(value) => handleCompetencyChange("selfEvaluation", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="selfEvaluation-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Être capable d'identifier des problèmes complexes</td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.complexProblems || ""}
                      onValueChange={(value) => handleCompetencyChange("complexProblems", value)}
                    >
                      <RadioGroupItem value="NA" id="complexProblems-na" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.complexProblems || ""}
                      onValueChange={(value) => handleCompetencyChange("complexProblems", value)}
                    >
                      <RadioGroupItem value="DEBUTANT" id="complexProblems-debutant" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.complexProblems || ""}
                      onValueChange={(value) => handleCompetencyChange("complexProblems", value)}
                    >
                      <RadioGroupItem value="AUTONOME" id="complexProblems-autonome" />
                    </RadioGroup>
                  </td>
                  <td className="text-center">
                    <RadioGroup
                      className="flex justify-center"
                      value={formData.individualCompetencies?.complexProblems || ""}
                      onValueChange={(value) => handleCompetencyChange("complexProblems", value)}
                    >
                      <RadioGroupItem value="AUTONOME_PLUS" id="complexProblems-autonome-plus" />
                    </RadioGroup>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Note pour évaluer les Compétences liées à l'individu</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="mb-4">Cette note complète les évaluations qualitatives sans en être la conversion directe.</p>
          <div className="flex items-center gap-4">
            <Label htmlFor="competency-grade" className="whitespace-nowrap">
              Donnez une note sur 20:
            </Label>
            <Input
              id="competency-grade"
              type="number"
              min="0"
              max="20"
              className="w-24"
              value={formData.individualCompetencies?.grade || ""}
              onChange={(e) => handleGradeChange(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
