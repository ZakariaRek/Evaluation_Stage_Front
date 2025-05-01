// lib/api-evaluation.ts

// Types that match the backend structure
export interface AppreciationId {
    periodeStagiaireId: number;
    periodeStageId: number;
    tuteurId: number;
  }
  
  export interface Tuteur {
    id: number;
    cin: string;
    nom: string;
    prenom: string;
    email: string;
    fonction: string;
    entreprise: string;
    technos?: string;
  }
  
  export interface Stagiaire {
    id: number;
    cin: string;
    nom: string;
    prenom: string;
    email: string;
    description: string;
    institution: string;
    niveau: string;
  }
  
  export interface Stage {
    id: number;
    description: string;
    objectif: string;
    entreprise: string;
  }
  
  export interface Periode {
    id: {
      stagiaireId: number;
      stageId: number;
    };
    date_debut: string;
    date_fin: string;
    stagiaire: Stagiaire;
    stage: Stage;
    stagiaireId: number;
    stageId: number;
  }
  
  export interface Category {
    id: number;
    intitule: string;
    valeur: string;
    competenceId: number;
  }
  
  export interface Competence {
    id: number;
    intitule: string;
    note: number;
    categories: Category[];
    appreciationId: any;
  }
  
  export interface Evaluation {
    id: number;
    categorie: string;
    valeur: string;
    appreciationId: any;
  }
  
  export interface Appreciation {
    id: AppreciationId;
    tuteur: Tuteur;
    periode: Periode;
    evaluations: Evaluation[];
    competences: Competence[];
  }
  
  // Simplified types for the UI
  export interface EvaluationSummary {
    id: AppreciationId;
    tuteurCIN: string;
    tuteurNom: string;
    tuteurPrenom: string;
    stagiaireCIN: string;
    stagiaireNom: string;
    stagiairePrenom: string;
    entreprise: string;
    dateDebut: string;
    dateFin: string;
  }
  
  // API Functions
  const API_BASE_URL = "http://localhost:8080";
  
  export async function getAllEvaluations(): Promise<EvaluationSummary[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/appreciations`);
      if (!response.ok) {
        throw new Error(`Error fetching evaluations: ${response.status} ${response.statusText}`);  }
      const appreciations: Appreciation[] = await response.json();
      console.log("appreciations:", appreciations);
      // Transform the data to match our EvaluationSummary type
      return appreciations.map((appreciation: Appreciation) => ({
        id: appreciation.id,
        tuteurCIN: appreciation.tuteur.cin,
        tuteurNom: appreciation.tuteur.nom,
        tuteurPrenom: appreciation.tuteur.prenom,
        stagiaireCIN: appreciation.periode.stagiaire.cin,
        stagiaireNom: appreciation.periode.stagiaire.nom,
        stagiairePrenom: appreciation.periode.stagiaire.prenom,
        entreprise: appreciation.periode.stage.entreprise,
        dateDebut: appreciation.periode.date_debut,
        dateFin: appreciation.periode.date_fin
      }));
      
    } catch (error) {
      console.error("Error getting evaluations:", error);
      throw error;
    }
  }
  
  export async function getEvaluationById(id: AppreciationId): Promise<Appreciation> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/appreciations/${id.periodeStagiaireId}/${id.periodeStageId}/${id.tuteurId}`
      );
      
      if (response.status === 404) {
        throw new Error("Evaluation not found");
      }
      
      if (!response.ok) {
        throw new Error(`Error fetching evaluation: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
      
    } catch (error) {
      console.error("Error getting evaluation details:", error);
      throw error;
    }
  }
  
  // Mock functions for development

