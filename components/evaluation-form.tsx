"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PersonalInfoPage } from "./personal-info"
import { GlobalAssessmentPage } from "./global-assessment"
import { ProfessionalSkillsPage } from "./professional-skills"
import { CommunicationSkillsPage } from "./communication-skills"
import { GeneralAssessmentPage } from "./general-assessment"
import { SubmissionPage } from "./submission"

// Define the CompetencyLevel type
type CompetencyLevel = "NA" | "DEBUTANT" | "AUTONOME" | "AUTONOME_PLUS"

export type FormData = {
  studentName: string
  companyName: string
  tutorName: string
  startDate: string
  endDate: string
  projectTheme: string
  objectives: string
  globalAssessment: {
    involvement: number
    openness: number
    productionQuality: number
    observations: string
  }
  individualCompetencies: {
    analysis: CompetencyLevel
    methods: CompetencyLevel
    stakeholders: CompetencyLevel
    international: CompetencyLevel
    selfEvaluation: CompetencyLevel
    complexProblems: CompetencyLevel
    grade: string
  }
  professionalSkills: {
    technicalKnowledge: number
    problemSolving: number
    adaptability: number
    initiative: number
    workQuality: number
  }
  communicationSkills: {
    teamwork: number
    communication: number
    punctuality: number
    professionalism: number
  }
  generalAssessment: {
    strengths: string
    areasForImprovement: string
    overallComment: string
    overallRating: number
  }
}

const initialFormData: FormData = {
  studentName: "",
  companyName: "",
  tutorName: "",
  startDate: "",
  endDate: "",
  projectTheme: "",
  objectives: "",
  globalAssessment: {
    involvement: 0,
    openness: 0,
    productionQuality: 0,
    observations: "",
  },
  individualCompetencies: {
    analysis: "NA",
    methods: "NA",
    stakeholders: "NA",
    international: "NA",
    selfEvaluation: "NA",
    complexProblems: "NA",
    grade: "",
  },
  professionalSkills: {
    technicalKnowledge: 0,
    problemSolving: 0,
    adaptability: 0,
    initiative: 0,
    workQuality: 0,
  },
  communicationSkills: {
    teamwork: 0,
    communication: 0,
    punctuality: 0,
    professionalism: 0,
  },
  generalAssessment: {
    strengths: "",
    areasForImprovement: "",
    overallComment: "",
    overallRating: 0,
  },
}

export function EvaluationForm() {
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const pages = [
    <PersonalInfoPage key="personal" formData={formData} setFormData={setFormData} />,
    <GlobalAssessmentPage key="global" formData={formData} setFormData={setFormData} />,
    <ProfessionalSkillsPage key="professional" formData={formData} setFormData={setFormData} />,
    <CommunicationSkillsPage key="communication" formData={formData} setFormData={setFormData} />,
    <GeneralAssessmentPage key="general" formData={formData} setFormData={setFormData} />,
    <SubmissionPage key="submission" formData={formData} />,
  ]

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Évaluation soumise avec succès!")
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {Array.from({ length: pages.length }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 mx-1 rounded-full ${index <= currentPage ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Étape {currentPage + 1} sur {pages.length}
            </p>
          </div>

          {pages[currentPage]}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevious} disabled={currentPage === 0}>
              Précédent
            </Button>

            {currentPage === pages.length - 1 ? (
              <Button onClick={handleSubmit}>Soumettre</Button>
            ) : (
              <Button onClick={handleNext}>Suivant</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
