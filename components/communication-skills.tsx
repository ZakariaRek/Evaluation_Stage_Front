"use client"

import type { Dispatch, SetStateAction } from "react"
import type { FormData } from "../evaluation-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CommunicationSkillsPageProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
}

export function CommunicationSkillsPage({ formData, setFormData }: CommunicationSkillsPageProps) {
  const handleChange = (name: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      communicationSkills: {
        ...prev.communicationSkills,
        [name]: value,
      },
    }))
  }

  const ratingLabels = ["Insuffisant", "Passable", "Bien", "Très bien", "Excellent"]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Compétences de Communication</h2>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-4 items-center">
            <div className="col-span-2"></div>
            {ratingLabels.map((label, index) => (
              <div key={index} className="text-center text-sm">
                {label}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-6 gap-4 items-center">
              <Label className="col-span-2">Travail d'équipe</Label>
              <RadioGroup
                className="col-span-4 grid grid-cols-5 gap-4"
                value={formData.communicationSkills.teamwork.toString()}
                onValueChange={(value) => handleChange("teamwork", Number.parseInt(value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex justify-center">
                    <RadioGroupItem value={value.toString()} id={`teamwork-${value}`} />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-6 gap-4 items-center">
              <Label className="col-span-2">Communication</Label>
              <RadioGroup
                className="col-span-4 grid grid-cols-5 gap-4"
                value={formData.communicationSkills.communication.toString()}
                onValueChange={(value) => handleChange("communication", Number.parseInt(value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex justify-center">
                    <RadioGroupItem value={value.toString()} id={`communication-${value}`} />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-6 gap-4 items-center">
              <Label className="col-span-2">Ponctualité</Label>
              <RadioGroup
                className="col-span-4 grid grid-cols-5 gap-4"
                value={formData.communicationSkills.punctuality.toString()}
                onValueChange={(value) => handleChange("punctuality", Number.parseInt(value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex justify-center">
                    <RadioGroupItem value={value.toString()} id={`punctuality-${value}`} />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-6 gap-4 items-center">
              <Label className="col-span-2">Professionnalisme</Label>
              <RadioGroup
                className="col-span-4 grid grid-cols-5 gap-4"
                value={formData.communicationSkills.professionalism.toString()}
                onValueChange={(value) => handleChange("professionalism", Number.parseInt(value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex justify-center">
                    <RadioGroupItem value={value.toString()} id={`professionalism-${value}`} />
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
