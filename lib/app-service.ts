// lib/api-service.ts
import { FormData } from "@/lib/form-types";
import { 
  Stagiaire, 
  Tuteur, 
  checkStagiaireExists, 
  checkTuteurExists 
} from "./api-client";

// Stage creation interface
interface Stage {
  description: string;
  objectif: string;
  entreprise: string;
}

// Period creation interface
interface CreatePeriodeRequest {
  stagiaireId: number;
  stageId: number;
  date_debut: string;
  date_fin: string;
}

// Evaluation interface for API
interface EvaluationDTO {
  categorie: string;
  valeur: string;
}

// Category interface for API
interface CategoryDTO {
  intitule: string;
  valeur: string;
}

// Competence interface for API
interface CompetenceDTO {
  intitule: string; // Must be one of the valid Competence_Type enum values
  note: number;
  categories: CategoryDTO[];
}

// Appreciation interface for API
interface AppreciationDTO {
  stagiaireId: number;
  stageId: number;
  tuteurId: number;
  evaluations: EvaluationDTO[];
  competences: CompetenceDTO[];
}

// Valid competence types - must match backend enum
enum CompetenceType {
  COMPETENCE_INDIVIDUELLE = "COMPETENCE_INDIVIDUELLE",
  COMPETENCE_ENTREPRISE = "COMPETENCE_ENTREPRISE",
  COMPETENCE_TECHNIQUE = "COMPETENCE_TECHNIQUE",
  COMPETENCE_SPECIFIQUE = "COMPETENCE_SPECIFIQUE"
}

// Handles the creation of a Stage
async function createStage(stage: Stage): Promise<number> {
  try {
    const response = await fetch('http://localhost:8080/api/stages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stage),
    });

    if (!response.ok) {
      throw new Error(`Error creating stage: ${response.statusText}`);
    }

    const data = await response.json();
    return data.id; // Return the ID of the created stage
  } catch (error) {
    console.error('Failed to create stage:', error);
    throw error;
  }
}

// Handles the creation of a Periode
async function createPeriode(periodeRequest: CreatePeriodeRequest): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:8080/api/periodes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(periodeRequest),
    });

    if (!response.ok) {
      throw new Error(`Error creating periode: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to create periode:', error);
    throw error;
  }
}

// Handles the creation of an Appreciation
async function createAppreciation(appreciationDTO: AppreciationDTO): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:8080/api/appreciations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appreciationDTO),
    });

    if (!response.ok) {
      throw new Error(`Error creating appreciation: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to create appreciation:', error);
    throw error;
  }
}

// Main function that orchestrates the full transaction
export async function submitEvaluation(formData: FormData): Promise<boolean> {
  try {
    // 1. Ensure we have the stagiaire and tuteur IDs
    if (!formData.stagiaireId) {
      // Fetch the stagiaire ID if we don't have it already
      const stagiaireData = await checkStagiaireExists(formData.stagiaireCIN);
      if (!stagiaireData) {
        throw new Error("Stagiaire not found. Please verify the CIN.");
      }
      formData.stagiaireId = stagiaireData.id ??0;
    }

    if (!formData.tuteurId) {
      // Fetch the tuteur ID if we don't have it already
      const tuteurData = await checkTuteurExists(formData.tuteurCIN);
      if (!tuteurData) {
        throw new Error("Tuteur not found. Please verify the CIN.");
      }
      formData.tuteurId = tuteurData.id ??0;
    }

    // 2. Create Stage
    const stage: Stage = {
      description: formData.projectTheme,
      objectif: formData.objectives,
      entreprise: formData.companyName
    };
    
    const stageId = await createStage(stage);

    // 3. Create Periode with the obtained IDs
    const periodeRequest: CreatePeriodeRequest = {
      stagiaireId: formData.stagiaireId,
      stageId: stageId,
      date_debut: formData.startDate,
      date_fin: formData.endDate
    };
    
    await createPeriode(periodeRequest);

    // 4. Create Appreciation
    // 4.1 Prepare global evaluations
    const evaluations: EvaluationDTO[] = [
      {
        categorie: "IMPLICATION_ACTIVITE",
        valeur: getEvaluationValue(formData.globalAssessment.involvement, "involvement")
      },
      {
        categorie: "OUVERTURE_AUX_AUTRES",
        valeur: getEvaluationValue(formData.globalAssessment.openness, "openness")
      },
      {
        categorie: "QUALITE_DE_SES_PRODUCTIONS",
        valeur: getEvaluationValue(formData.globalAssessment.productionQuality, "quality")
      }
    ];

    // Add observations if present
    if (formData.globalAssessment.observations) {
      evaluations.push({
        categorie: "OBSERVATION_SUR_ENSEMBLE_DU_TRAVAIL_ACCOMPLI",
        valeur: "BONNE" // Using a default value since this is a text field
      });
    }

    // 4.2 Prepare competences
    const competences: CompetenceDTO[] = [];

    // Individual competencies with predefined categories
    const individualCategories: CategoryDTO[] = [
      {
        intitule: "ANALYSE_SYNTHESE",
        valeur: formData.individualCompetencies.analysis
      },
      {
        intitule: "PROPOSER_METHODES",
        valeur: formData.individualCompetencies.methods
      },
      {
        intitule: "FAIRE_ADHERER",
        valeur: formData.individualCompetencies.stakeholders
      },
      {
        intitule: "CONTEXTE_INTERNATIONAL",
        valeur: formData.individualCompetencies.international
      },
      {
        intitule: "AUTOEVALUATION",
        valeur: formData.individualCompetencies.selfEvaluation
      },
      {
        intitule: "IDENTIFIER_PROBLEMES",
        valeur: formData.individualCompetencies.complexProblems
      }
    ];

    competences.push({
      intitule: CompetenceType.COMPETENCE_INDIVIDUELLE,
      note: parseFloat(formData.individualCompetencies.grade) || 0,
      categories: individualCategories
    });

    // Company competencies
    if (formData.companyCompetencies.company) {
      const companyCategories: CategoryDTO[] = [
        {
          intitule: "ANALYSER_FONCTIONNEMENT",
          valeur: formData.companyCompetencies.company.companyAnalysis
        },
        {
          intitule: "ANALYSER_DEMARCHE_PROJET",
          valeur: formData.companyCompetencies.company.projectApproach
        },
        {
          intitule: "POLITIQUE_ENVIRONNEMENTALE",
          valeur: formData.companyCompetencies.company.environmentalPolicy
        },
        {
          intitule: "RECHERCHER_INFORMATION",
          valeur: formData.companyCompetencies.company.informationResearch
        }
      ];

      competences.push({
        intitule: CompetenceType.COMPETENCE_ENTREPRISE,
        note: parseFloat(formData.companyCompetencies.companyGrade) || 0,
        categories: companyCategories
      });
    }

    // Technical competencies
    if (formData.companyCompetencies.technical) {
      const technicalCategories: CategoryDTO[] = [
        {
          intitule: "CONCEPTION_PRELIMINAIRE",
          valeur: formData.companyCompetencies.technical.preliminaryDesign
        }
      ];

      competences.push({
        intitule: CompetenceType.COMPETENCE_TECHNIQUE,
        note: parseFloat(formData.companyCompetencies.technicalGrade) || 0,
        categories: technicalCategories
      });
    }

    // Specific competencies - now using COMPETENCE_SPECIFIQUE type
    const validSpecificCompetencies = formData.specificCompetencies.filter(
      comp => comp.name && comp.name.trim() !== ""
    );
    
    if (validSpecificCompetencies.length > 0) {
      const specificCategories: CategoryDTO[] = [];
      
      validSpecificCompetencies.forEach(comp => {
        specificCategories.push({
          // Use the original name directly as a string
          intitule: comp.name,
          valeur: comp.level || "DEBUTANT"
        });
      });
      
      // Now use COMPETENCE_SPECIFIQUE type
      competences.push({
        intitule: CompetenceType.COMPETENCE_SPECIFIQUE,
        note: 0, // No specific grade for custom competencies
        categories: specificCategories
      });
    }

    // 4.3 Create the appreciation
    const appreciationDTO: AppreciationDTO = {
      stagiaireId: formData.stagiaireId,
      stageId: stageId,
      tuteurId: formData.tuteurId,
      evaluations: evaluations,
      competences: competences
    };

    console.log("Sending appreciation data:", JSON.stringify(appreciationDTO, null, 2));
    await createAppreciation(appreciationDTO);

    return true;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

// Helper function to map evaluation ratings to enum values
function getEvaluationValue(rating: number, type: 'involvement' | 'openness' | 'quality'): string {
  if (rating === 0) return "NA";
  
  // Different mappings based on the evaluation type
  if (type === 'involvement') {
    switch (rating) {
      case 1: return "PARESSEUX";
      case 2: return "JUSTE_NECESSAIRE";
      case 3: return "BONNE";
      case 4: return "TRES_FORTE";
      case 5: return "DEPASSE_OBJECTIFS";
      default: return "BONNE";
    }
  } else if (type === 'openness') {
    switch (rating) {
      case 1: return "ISOLE";
      case 2: return "RENFERME";
      case 3: return "BONNE";
      case 4: return "TRES_BONNE";
      case 5: return "EXCELLENTE";
      default: return "BONNE";
    }
  } else if (type === 'quality') {
    switch (rating) {
      case 1: return "MEDIOCRE";
      case 2: return "ACCEPTABLE";
      case 3: return "BONNE";
      case 4: return "TRES_BONNE";
      case 5: return "TRES_PROFESSIONNELLE";
      default: return "BONNE";
    }
  }
  
  return "BONNE"; // Default fallback
}