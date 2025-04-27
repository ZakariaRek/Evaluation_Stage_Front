"use client"

import type React from "react"
import type { Dispatch, SetStateAction } from "react"
interface FormData {
  globalAssessment: {
    involvement: number;
    openness: number;
    productionQuality: number;
    observations: string;
  };
}
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GlobalAssessmentPageProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
}

export function GlobalAssessmentPage({ formData, setFormData }: GlobalAssessmentPageProps) {
  const handleChange = (name: string, value: number) => {
    setFormData((prev: FormData) => ({
      ...prev,
      globalAssessment: {
        ...prev.globalAssessment,
        [name]: value,
      },
    }))
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: FormData) => ({
      ...prev,
      globalAssessment: {
        ...prev.globalAssessment,
        [name]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">APPRECIATIONS GLOBALES SUR L'ETUDIANT(E)</h2>

      <div className="space-y-6">
        <Card className="border-accent">
          <CardHeader className="bg-accent/10">
            <CardTitle className="text-lg text-accent-foreground">IMPLICATION DANS SES ACTIVITES</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              className="grid grid-cols-5 gap-2"
              value={formData.globalAssessment.involvement.toString()}
              onValueChange={(value) => handleChange("involvement", Number.parseInt(value))}
            >
              <div className="flex flex-col items-center">
                <RadioGroupItem value="1" id="involvement-1" />
                <Label htmlFor="involvement-1" className="text-xs text-center mt-1">
                  Paresseux
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="2" id="involvement-2" />
                <Label htmlFor="involvement-2" className="text-xs text-center mt-1">
                  Le juste nécessaire
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="3" id="involvement-3" />
                <Label htmlFor="involvement-3" className="text-xs text-center mt-1">
                  Bonne
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="4" id="involvement-4" />
                <Label htmlFor="involvement-4" className="text-xs text-center mt-1">
                  Très forte
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="5" id="involvement-5" />
                <Label htmlFor="involvement-5" className="text-xs text-center mt-1">
                  Dépasse ses objectifs
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardHeader className="bg-accent/10">
            <CardTitle className="text-lg text-accent-foreground">OUVERTURE AUX AUTRES</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              className="grid grid-cols-5 gap-2"
              value={formData.globalAssessment.openness.toString()}
              onValueChange={(value) => handleChange("openness", Number.parseInt(value))}
            >
              <div className="flex flex-col items-center">
                <RadioGroupItem value="1" id="openness-1" />
                <Label htmlFor="openness-1" className="text-xs text-center mt-1">
                  Isolé(e) ou en opposition
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="2" id="openness-2" />
                <Label htmlFor="openness-2" className="text-xs text-center mt-1">
                  Renfermé(e) ou obtus
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="3" id="openness-3" />
                <Label htmlFor="openness-3" className="text-xs text-center mt-1">
                  Bonne
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="4" id="openness-4" />
                <Label htmlFor="openness-4" className="text-xs text-center mt-1">
                  Très bonne
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="5" id="openness-5" />
                <Label htmlFor="openness-5" className="text-xs text-center mt-1">
                  Excellente
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardHeader className="bg-accent/10">
            <CardTitle className="text-lg text-accent-foreground">QUALITE DE SES "PRODUCTIONS"</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              className="grid grid-cols-5 gap-2"
              value={formData.globalAssessment.productionQuality.toString()}
              onValueChange={(value) => handleChange("productionQuality", Number.parseInt(value))}
            >
              <div className="flex flex-col items-center">
                <RadioGroupItem value="1" id="quality-1" />
                <Label htmlFor="quality-1" className="text-xs text-center mt-1">
                  Médiocre
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="2" id="quality-2" />
                <Label htmlFor="quality-2" className="text-xs text-center mt-1">
                  Acceptable
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="3" id="quality-3" />
                <Label htmlFor="quality-3" className="text-xs text-center mt-1">
                  Bonne
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="4" id="quality-4" />
                <Label htmlFor="quality-4" className="text-xs text-center mt-1">
                  Très bonne
                </Label>
              </div>
              <div className="flex flex-col items-center">
                <RadioGroupItem value="5" id="quality-5" />
                <Label htmlFor="quality-5" className="text-xs text-center mt-1">
                  Très professionnelle
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardHeader className="bg-accent/10">
            <CardTitle className="text-lg text-accent-foreground">OBSERVATIONS SUR L'ENSEMBLE DU TRAVAIL ACCOMPLI</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="observations"
              name="observations"
              value={formData.globalAssessment.observations}
              onChange={handleTextChange}
              rows={4}
              className="w-full border-accent/50 focus-visible:ring-accent"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}