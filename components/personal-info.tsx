"use client"

import { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import type { FormData } from "@/lib/form-types"
import { 
  checkStagiaireExists, 
  checkTuteurExists, 
  mockCheckStagiaireExists, 
  mockCheckTuteurExists,
  Stagiaire,
  Tuteur 
} from "@/lib/api-client"

interface PersonalInfoPageProps {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
}

export function PersonalInfoPage({ formData, setFormData }: PersonalInfoPageProps) {
  const [stagiaireData, setStagiaireData] = useState<Stagiaire | null>(null)
  const [tuteurData, setTuteurData] = useState<Tuteur | null>(null)
  const [checkingStagiaire, setCheckingStagiaire] = useState(false)
  const [checkingTuteur, setCheckingTuteur] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Check if stagiaire exists when CIN changes
  useEffect(() => {
    const checkStagiaire = async () => {
      if (!formData.stagiaireCIN || formData.stagiaireCIN.length < 3) {
        setStagiaireData(null)
        return
      }

      setCheckingStagiaire(true)
      try {
        // Using the API client function to check if stagiaire exists
        // For production, use:
         const data = await checkStagiaireExists(formData.stagiaireCIN)
        // For development/demo, use:
        // const data = await mockCheckStagiaireExists(formData.stagiaireCIN)
        setStagiaireData(data)
        
        // If exists, update the form data with the stagiaire name
        if (data) {
          setFormData((prev: FormData) => ({
            ...prev,
            studentName: `${data.prenom} ${data.nom}`
          }))
        } else {
          // Clear the student name if no match is found
          setFormData((prev: FormData) => ({
            ...prev,
            studentName: ""
          }))
        }
      } catch (error) {
        console.error("Error checking stagiaire:", error)
        setStagiaireData(null)
      } finally {
        setCheckingStagiaire(false)
      }
    }

    // Debounce the check to avoid too many requests
    const timeoutId = setTimeout(checkStagiaire, 500)
    return () => clearTimeout(timeoutId)
  }, [formData.stagiaireCIN, setFormData])

  // Check if tuteur exists when CIN changes
  useEffect(() => {
    const checkTuteur = async () => {
      if (!formData.tuteurCIN || formData.tuteurCIN.length < 3) {
        setTuteurData(null)
        return
      }

      setCheckingTuteur(true)
      try {
        // Using the API client function to check if tuteur exists
        // For production,  use: 
        const data = await checkTuteurExists(formData.tuteurCIN)
        // For development/demo, use:
        // const data = await mockCheckTuteurExists(formData.tuteurCIN)
        setTuteurData(data)
        
        // If exists, update the form data with the tuteur name
        if (data) {
          setFormData((prev: FormData) => ({
            ...prev,
            tutorName: `${data.prenom} ${data.nom}`
          }))
        } else {
          // Clear the tutor name if no match is found
          setFormData((prev: FormData) => ({
            ...prev,
            tutorName: ""
          }))
        }
      } catch (error) {
        console.error("Error checking tuteur:", error)
        setTuteurData(null)
      } finally {
        setCheckingTuteur(false)
      }
    }

    // Debounce the check to avoid too many requests
    const timeoutId = setTimeout(checkTuteur, 500)
    return () => clearTimeout(timeoutId)
  }, [formData.tuteurCIN, setFormData])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">APPRECIATION DU TUTEUR DE STAGE</h2>

      <div className="space-y-4">
        <Card className="border-accent">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stagiaireCIN">CIN du stagiaire</Label>
              <div className="relative">
                <Input 
                  id="stagiaireCIN" 
                  name="stagiaireCIN" 
                  value={formData.stagiaireCIN || ''} 
                  onChange={handleChange} 
                  required 
                  className={`${stagiaireData ? 'border-green-500 pr-10' : stagiaireData === null && formData.stagiaireCIN ? 'border-red-500 pr-10' : ''}`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {checkingStagiaire && <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />}
                  {!checkingStagiaire && stagiaireData && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {!checkingStagiaire && !stagiaireData && formData.stagiaireCIN && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
              </div>
              {!stagiaireData && formData.stagiaireCIN && !checkingStagiaire && (
                <p className="text-sm text-red-500 mt-1">Stagiaire non trouvé dans la base de données.</p>
              )}
              {stagiaireData && (
                <p className="text-sm text-green-500 mt-1">
                  Stagiaire trouvé: <strong>{stagiaireData.prenom} {stagiaireData.nom}</strong>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'entreprise</Label>
              <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tuteurCIN">CIN du tuteur</Label>
              <div className="relative">
                <Input 
                  id="tuteurCIN" 
                  name="tuteurCIN" 
                  value={formData.tuteurCIN || ''} 
                  onChange={handleChange} 
                  required 
                  className={`${tuteurData ? 'border-green-500 pr-10' : tuteurData === null && formData.tuteurCIN ? 'border-red-500 pr-10' : ''}`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {checkingTuteur && <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />}
                  {!checkingTuteur && tuteurData && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {!checkingTuteur && !tuteurData && formData.tuteurCIN && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
              </div>
              {!tuteurData && formData.tuteurCIN && !checkingTuteur && (
                <p className="text-sm text-red-500 mt-1">Tuteur non trouvé dans la base de données.</p>
              )}
              {tuteurData && (
                <p className="text-sm text-green-500 mt-1">
                  Tuteur trouvé: <strong>{tuteurData.prenom} {tuteurData.nom}</strong>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent">
          <CardContent className="pt-6 space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}