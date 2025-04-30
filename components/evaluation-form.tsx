// Full implementation of the EvaluationForm component with the updated handleSubmit function
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PersonalInfoPage } from "./personal-info"
import { GlobalAssessmentPage } from "./global-assessment"
import { ProfessionalSkillsPage } from "./professional-skills"
import { CompanyCompetenciesPage } from "./company-competencies"
import { SpecificCompetenciesPage } from "./specific-competencies"
import { SubmissionPage } from "./submission"
import { toast } from "@/hooks/use-toast"
// TODO: Import submitEvaluation from the correct path once api-service is created
import { submitEvaluation } from "@/hooks/handleSubmitForm"
import { FormData, initialFormData } from "@/lib/form-types"

export function EvaluationForm() {
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pages = [
    <PersonalInfoPage key="personal" formData={formData} setFormData={setFormData} />,
    <GlobalAssessmentPage key="global" formData={formData} setFormData={setFormData} />,
    <ProfessionalSkillsPage key="professional" formData={formData} setFormData={setFormData} />,
    <CompanyCompetenciesPage key="company" formData={formData} setFormData={setFormData} />,
    <SpecificCompetenciesPage key="specific" formData={formData} setFormData={setFormData} />,
    <SubmissionPage key="submission" formData={formData} />,
  ]

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      // Validate current page before moving to next
      let isValid = true;
      
      // Add validation logic for each page
      if (currentPage === 0) {
        // Personal info validation
        if (!formData.stagiaireCIN || !formData.tuteurCIN || !formData.companyName || 
            !formData.startDate || !formData.endDate) {
          toast({
            title: "Information manquante",
            description: "Veuillez remplir tous les champs obligatoires.",
            variant: "destructive"
          });
          isValid = false;
        }
      }
      
      // Only proceed if validation passes
      if (isValid) {
        setCurrentPage(currentPage + 1)
        window.scrollTo(0, 0)
      }
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    // Validate before submission
    if (!formData.stagiaireCIN || !formData.tuteurCIN) {
      toast({
        title: "Information manquante",
        description: "Les informations du stagiaire et du tuteur sont obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Start submission process
    setIsSubmitting(true);
    try {
      // Call the API transaction function
      await submitEvaluation(formData);
      
      // Show success message with toast
      toast({
        title: "Évaluation soumise",
        description: "L'évaluation a été soumise avec succès.",
      });
      
      // Reset form and redirect to first page
      setFormData(initialFormData);
      setCurrentPage(0);
      window.scrollTo(0, 0);
      
    } catch (error) {
      // Show error message
      console.error("Submission error:", error);
      toast({
        title: "Erreur de soumission",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la soumission.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="border-accent shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {Array.from({ length: pages.length }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 mx-1 rounded-full ${
                    index <= currentPage ? "bg-accent" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-accent-foreground font-medium">
              Étape {currentPage + 1} sur {pages.length}
            </p>
          </div>

          {pages[currentPage]}

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentPage === 0 || isSubmitting}
              className="border-accent hover:bg-accent hover:text-accent-foreground"
            >
              Précédent
            </Button>

            {currentPage === pages.length - 1 ? (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isSubmitting ? "Soumission en cours..." : "Soumettre"}
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Suivant
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}