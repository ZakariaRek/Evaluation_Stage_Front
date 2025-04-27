// lib/api-client.ts

// Define types for the API responses
export interface Stagiaire {
    id?: number;
    cin: string;
    nom: string;
    prenom: string;
    // Add other fields as needed
  }
  
  export interface Tuteur {
    id?: number;
    cin: string;
    nom: string;
    prenom: string;
    // Add other fields as needed
  }
  
  /**
   * Check if a stagiaire exists in the database by CIN
   */
  export async function checkStagiaireExists(cin: string): Promise<Stagiaire | null> {
    try {
      // In a real application, this would be a fetch call to your backend API
      const response = await fetch(`http://localhost:8080/api/stagiaires/check/${encodeURIComponent(cin)}`);
      
      if (!response.ok) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error checking stagiaire:", error);
      return null;
    }
  }
  
  /**
   * Check if a tuteur exists in the database by CIN
   */
  export async function checkTuteurExists(cin: string): Promise<Tuteur | null> {
    try {
      // In a real application, this would be a fetch call to your backend API
      const response = await fetch(`http://localhost:8080/api/tuteurs/check/${encodeURIComponent(cin)}`);
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error("Error checking tuteur:", error);
      return null;
    }
  }
  
  // For demo/development purposes, you can use these mock functions
  export async function mockCheckStagiaireExists(cin: string): Promise<Stagiaire | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockData: Record<string, Stagiaire> = {
      "A123456": { cin: "A123456", nom: "Alaoui", prenom: "Ahmed" },
      "B789012": { cin: "B789012", nom: "Benani", prenom: "Bouchra" },
      "C345678": { cin: "C345678", nom: "Chaoui", prenom: "Chaimae" }
    };
    
    return mockData[cin] || null;
  }
  
  export async function mockCheckTuteurExists(cin: string): Promise<Tuteur | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockData: Record<string, Tuteur> = {
      "T123456": { cin: "T123456", nom: "Toufiq", prenom: "Tarik" },
      "T789012": { cin: "T789012", nom: "Tazi", prenom: "Talal" },
      "T345678": { cin: "T345678", nom: "Tahiri", prenom: "Taoufik" }
    };
    
    return mockData[cin] || null;
  }
