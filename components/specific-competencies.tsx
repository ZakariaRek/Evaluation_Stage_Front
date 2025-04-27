"use client"

import type { Dispatch, SetStateAction } from "react"
interface FormData {
  specificCompetencies?: Array<{
    name: string;
    level: "DEBUTANT" | "AUTONOME" | "AUTONOME_PLUS";
  }>;
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

interface SpecificCompetenciesPageProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
}

export function SpecificCompetenciesPage({ formData, setFormData }: SpecificCompetenciesPageProps) {
  const handleCompetencyNameChange = (index: number, value: string) => {
    setFormData((prev: FormData) => {
      const specificCompetencies = [...(prev.specificCompetencies || [])];
      
      if (!specificCompetencies[index]) {
        specificCompetencies[index] = { name: value, level: "DEBUTANT" };
      } else {
        specificCompetencies[index] = { ...specificCompetencies[index], name: value };
      }
      
      return {
        ...prev,
        specificCompetencies,
      };
    });
  };

  const handleCompetencyLevelChange = (index: number, value: string) => {
    setFormData((prev: FormData) => {
      const specificCompetencies = [...(prev.specificCompetencies || [])];
      
      if (!specificCompetencies[index]) {
        specificCompetencies[index] = { 
          name: "", 
          level: value as "DEBUTANT" | "AUTONOME" | "AUTONOME_PLUS" 
        };
      } else {
        specificCompetencies[index] = { 
          ...specificCompetencies[index], 
          level: value as "DEBUTANT" | "AUTONOME" | "AUTONOME_PLUS" 
        };
      }
      
      return {
        ...prev,
        specificCompetencies,
      };
    });
  };

  // Ensure we have 5 empty slots if the array doesn't exist or has fewer than 5 items
  const competencies = formData.specificCompetencies || [];
  while (competencies.length < 5) {
    competencies.push({ name: "", level: "DEBUTANT" });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Compétences spécifiques métier</h2>
      
      <Card className="border-accent border-2">
        <CardHeader className="bg-accent/10">
          <CardTitle className="text-lg text-accent-foreground">Compétences spécifiques métier (à ajouter selon besoin)</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Cette page vous permet d'ajouter jusqu'à 5 compétences spécifiques au métier qui n'ont pas été mentionnées dans les étapes précédentes.
          </p>
          <p className="text-sm font-medium mt-2">
            Evaluez chaque compétence avec un des trois niveaux suivants : <span className="font-bold">DEBUTANT</span>, <span className="font-bold">AUTONOME</span> ou <span className="font-bold">AUTONOME +</span>.
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-accent/30">
                  <th className="w-16 text-center py-2">#</th>
                  <th className="text-center py-2 w-1/2">Compétence</th>
                  <th className="text-center py-2 w-1/2">Evaluation</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((num, index) => (
                  <tr key={index} className="border-b border-accent/30">
                    <td className="py-3 text-center font-medium">{num}</td>
                    <td className="py-3 px-2">
                      <Input
                        placeholder="Saisir la compétence spécifique..."
                        value={competencies[index]?.name || ""}
                        onChange={(e) => handleCompetencyNameChange(index, e.target.value)}
                        className="w-full border-accent/50 focus-visible:ring-accent"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <RadioGroup
                        className="flex justify-center gap-4"
                        value={competencies[index]?.level || "DEBUTANT"}
                        onValueChange={(value) => handleCompetencyLevelChange(index, value)}
                      >
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="DEBUTANT" id={`competency-${index}-debutant`} />
                          <Label htmlFor={`competency-${index}-debutant`} className="text-sm font-medium cursor-pointer">
                            DEBUTANT
                          </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="AUTONOME" id={`competency-${index}-autonome`} />
                          <Label htmlFor={`competency-${index}-autonome`} className="text-sm font-medium cursor-pointer">
                            AUTONOME
                          </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RadioGroupItem value="AUTONOME_PLUS" id={`competency-${index}-autonome-plus`} />
                          <Label htmlFor={`competency-${index}-autonome-plus`} className="text-sm font-medium cursor-pointer">
                            AUTONOME +
                          </Label>
                        </div>
                      </RadioGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}