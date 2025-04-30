// Example usage of the submitEvaluation function
import { FormData } from "@/lib/form-types";
import { submitEvaluation } from "@/lib/app-service";
import { toast } from "@/hooks/use-toast";

// Form submission handler for the evaluation form
async function handleSubmitForm(formData: FormData) {
  // Validate required fields
  if (!formData.stagiaireCIN || !formData.tuteurCIN || !formData.companyName || 
      !formData.startDate || !formData.endDate || !formData.projectTheme) {
    toast({
      title: "Champs manquants",
      description: "Veuillez remplir tous les champs obligatoires.",
      variant: "destructive"
    });
    return false;
  }

  // Show loading state
  const loadingToast = toast({
    title: "Soumission en cours",
    description: "Veuillez patienter pendant le traitement...",
  });

  try {
    // Step 1: Execute the transaction
    console.log("Starting transaction...");

    
    await submitEvaluation(formData);
    
    // Step 2: Dismiss loading toast
    loadingToast.dismiss();
    
    // Step 3: Show success message
    toast({
      title: "Évaluation soumise avec succès",
      description: "L'évaluation a été enregistrée dans le système.",
    });
    
    // Step 4: Reset form or redirect
    return true;
    
  } catch (error) {
    // Handle errors
    console.error("Transaction failed:", error);
    
    // Dismiss loading toast
    loadingToast.dismiss();
    
    // Show error message with details
    toast({
      title: "Erreur lors de la soumission",
      description: error instanceof Error 
        ? error.message 
        : "Une erreur inattendue s'est produite. Veuillez réessayer.",
      variant: "destructive"
    });
    
    return false;
  }
}

// Updated handleSubmit function for evaluation-form.tsx


// Example of how the transaction works step by step:
/*
Transaction flow:

1. Stagiaire and Tuteur verification
   - API call: GET /api/stagiaires/check/{CIN}
   - API call: GET /api/tuteurs/check/{CIN}
   - Stores IDs for future use

2. Create Stage
   - API call: POST /api/stages
   - Request body: { description, objectif, entreprise }
   - Response includes the new stage ID

3. Create Periode
   - API call: POST /api/periodes
   - Request body: { stagiaireId, stageId, date_debut, date_fin }
   - Links the stagiaire to the stage

4. Create Appreciation
   - API call: POST /api/appreciations
   - Request body: { stagiaireId, stageId, tuteurId, evaluations, competences }
   - Contains all evaluation data structured for the backend
*/

// Example of mapping form data to competence DTOs:
function mapCompetenciesToDTO(formData: FormData) {
  const competences = [];
  
  // 1. Individual competencies
  competences.push({
    intitule: "COMPETENCE_INDIVIDUELLE",
    note: parseFloat(formData.individualCompetencies.grade) || 0,
    categories: [
      {
        intitule: "ANALYSE_SYNTHESE",
        valeur: formData.individualCompetencies.analysis
      },
      {
        intitule: "PROPOSER_METHODES",
        valeur: formData.individualCompetencies.methods
      },
      // Additional categories omitted for brevity
    ]
  });
  
  // 2. Company competencies
  if (formData.companyCompetencies.company) {
    competences.push({
      intitule: "COMPETENCE_ENTREPRISE",
      note: parseFloat(formData.companyCompetencies.companyGrade) || 0,
      categories: [
        {
          intitule: "ANALYSER_FONCTIONNEMENT",
          valeur: formData.companyCompetencies.company.companyAnalysis
        },
        // Additional categories omitted for brevity
      ]
    });
  }
  
  // 3. Technical competencies
  if (formData.companyCompetencies.technical) {
    competences.push({
      intitule: "COMPETENCE_TECHNIQUE",
      note: parseFloat(formData.companyCompetencies.technicalGrade) || 0,
      categories: [
        {
          intitule: "CONCEPTION_PRELIMINAIRE",
          valeur: formData.companyCompetencies.technical.preliminaryDesign
        }
      ]
    });
  }
  
  return competences;
}

export { handleSubmitForm, mapCompetenciesToDTO, submitEvaluation };