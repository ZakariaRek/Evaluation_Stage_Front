"use client"

import type React from "react"

import type { Dispatch, SetStateAction } from "react"
import type { FormData } from "../evaluation-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface GeneralAssessmentPageProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
}

export function GeneralAssessmentPage({ formData, setFormData }: GeneralAssessmentPageProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      generalAssessment: {
        ...prev.generalAssessment,
        [name]: value,
      },
    }))
  }

  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      generalAssessment: {
        ...prev.generalAssessment,
        overallRating: value,
      },
    }))
  }

  const ratingLabels = ["Insuffisant", "Passable", "Bien", "Très bien", "Excellent"]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Évaluation Générale</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="strengths">Points forts du stagiaire</Label>
          <Textarea
            id="strengths"
            name="strengths"
            value={formData.generalAssessment.strengths}
            onChange={handleTextChange}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="areasForImprovement">Points à améliorer</Label>
          <Textarea
            id="areasForImprovement"
            name="areasForImprovement"
            value={formData.generalAssessment.areasForImprovement}
            onChange={handleTextChange}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="overallComment">Commentaire général</Label>
          <Textarea
            id="overallComment"
            name="overallComment"
            value={formData.generalAssessment.overallComment}
            onChange={handleTextChange}
            rows={4}
          />
        </div>

        <div className="space-y-4">
          <Label>Évaluation globale du stage</Label>
          <div className="grid grid-cols-5 gap-4">
            {ratingLabels.map((label, index) => (
              <div key={index} className="text-center">
                <div className="text-sm mb-2">{label}</div>
                <RadioGroup
                  className="flex justify-center"
                  value={formData.generalAssessment.overallRating.toString()}
                  onValueChange={(value) => handleRatingChange(Number.parseInt(value))}
                >
                  <RadioGroupItem value={(index + 1).toString()} id={`overall-${index + 1}`} />
                </RadioGroup>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
