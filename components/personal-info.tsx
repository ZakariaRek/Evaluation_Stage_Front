"use client"

import type React from "react"

import type { Dispatch, SetStateAction } from "react"
import type { FormData } from "../evaluation-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalInfoPageProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
}

export function PersonalInfoPage({ formData, setFormData }: PersonalInfoPageProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">APPRECIATION DU TUTEUR DE STAGE</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studentName">NOM et Prénom du stagiaire</Label>
          <Input id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Nom de l'entreprise</Label>
          <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tutorName">NOM et Prénom du tuteur</Label>
          <Input id="tutorName" name="tutorName" value={formData.tutorName} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Période du stage du</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">au</Label>
            <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectTheme">THEME DU PROJET PRINCIPAL CONFIE A L'ETUDIANT(E)</Label>
          <Textarea
            id="projectTheme"
            name="projectTheme"
            value={formData.projectTheme}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="objectives">OBJECTIFS ASSIGNES A L'ETUDIANT(E)</Label>
          <Textarea id="objectives" name="objectives" value={formData.objectives} onChange={handleChange} rows={3} />
        </div>
      </div>
    </div>
  )
}
