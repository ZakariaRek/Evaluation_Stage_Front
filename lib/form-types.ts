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
  studentName: string;
  stagiaireId: number | null;  // Added for API reference
  companyName: string;
  tuteurCIN: string;
  tutorName: string;
  tuteurId: number | null;  // Added for API reference
  startDate: string;
  endDate: string;
  projectTheme: string;  // Maps to Stage description
  objectives: string;    // Maps to Stage objectif
  
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

export const initialFormData: FormData = {
  stagiaireCIN: "",
  studentName: "",
  stagiaireId: null,
  companyName: "",
  tuteurCIN: "",
  tutorName: "",
  tuteurId: null,
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