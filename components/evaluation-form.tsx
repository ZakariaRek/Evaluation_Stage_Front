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

// Define the CompetencyLevel type
type CompetencyLevel = "NA" | "DEBUTANT" | "AUTONOME" | "AUTONOME_PLUS"

// Define the specific competency type
type SpecificCompetency = {
  name: string;
  level: CompetencyLevel | "";
}

export type FormData = {
  // Personal Info
  stagiaireCIN: string;
  studentName: string;  // Will store the full name when API returns it
  companyName: string;
  tuteurCIN: string;
  tutorName: string;  // Will store the full name when API returns it
  startDate: string;
  endDate: string;
  projectTheme: string;
  objectives: string;
  
  // Global Assessment
  globalAssessment: {
    involvement: number;
    openness: number;
    productionQuality: number;
    observations: string;
  };
  
  // Individual Competencies
  individualCompetencies: {
    analysis: CompetencyLevel;
    methods: CompetencyLevel;
    stakeholders: CompetencyLevel;
    international: CompetencyLevel;
    selfEvaluation: CompetencyLevel;
    complexProblems: CompetencyLevel;
    grade: string;
  };
  
  // Company Competencies
  companyCompetencies: {
    company?: {
      companyAnalysis: CompetencyLevel;
      projectApproach: CompetencyLevel;
      environmentalPolicy: CompetencyLevel;
      informationResearch: CompetencyLevel;
    };
    technical?: {
      preliminaryDesign: CompetencyLevel;
    };
    companyGrade: string;
    technicalGrade: string;
  };
  
  // Specific Competencies
  specificCompetencies: SpecificCompetency[];
  
  // General Assessment
  generalAssessment: {
    strengths: string;
    areasForImprovement: string;
    overallComment: string;
    overallRating: number;
  };
}

const initialFormData: FormData = {
  stagiaireCIN: "",
  studentName: "",
  companyName: "",
  tuteurCIN: "",
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
  companyCompetencies: {
    company: {
      companyAnalysis: "NA",
      projectApproach: "NA",
      environmentalPolicy: "NA",
      informationResearch: "NA",
    },
    technical: {
      preliminaryDesign: "NA",
    },
    companyGrade: "",
    technicalGrade: "",
  },
  specificCompetencies: Array(5).fill({ name: "", level: "DEBUTANT" }),
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
    <CompanyCompetenciesPage key="company" formData={formData} setFormData={setFormData} />,
    <SpecificCompetenciesPage key="specific" formData={formData} setFormData={setFormData} />,
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
              disabled={currentPage === 0}
              className="border-accent hover:bg-accent hover:text-accent-foreground"
            >
              Précédent
            </Button>

            {currentPage === pages.length - 1 ? (
              <Button 
                onClick={handleSubmit}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Soumettre
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