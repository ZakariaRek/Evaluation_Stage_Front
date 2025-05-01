// lib/api-tuteur.ts
import { Tuteur } from "./api-client";

const API_BASE_URL = "http://localhost:8080";

/**
 * Get all tuteurs from the API
 * @returns Promise containing an array of Tuteur objects
 */
export async function getAllTuteurs(): Promise<Tuteur[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tuteurs`);
    
    if (!response.ok) {
      throw new Error(`Error fetching tuteurs: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error getting tuteurs:", error);
    throw error;
  }
}

/**
 * Create a new tuteur in the system
 * @param tuteur The tuteur object to create
 * @returns Promise containing the created Tuteur with ID
 */
export async function createTuteur(tuteur: Omit<Tuteur, "id">): Promise<Tuteur> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tuteurs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tuteur)
    });
    
    if (!response.ok) {
      throw new Error(`Error creating tuteur: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error creating tuteur:", error);
    throw error;
  }
}

/**
 * Get a tuteur by ID
 * @param id The ID of the tuteur to retrieve
 * @returns Promise containing the Tuteur object or null if not found
 */
export async function getTuteurById(id: number): Promise<Tuteur | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tuteurs/${id}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Error fetching tuteur: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error getting tuteur with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Update an existing tuteur
 * @param id The ID of the tuteur to update
 * @param tuteur The updated tuteur data
 * @returns Promise containing the updated Tuteur
 */
export async function updateTuteur(id: number, tuteur: Omit<Tuteur, "id">): Promise<Tuteur | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tuteurs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tuteur)
    });
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Error updating tuteur: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating tuteur with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a tuteur by ID
 * @param id The ID of the tuteur to delete
 * @returns Promise resolving to true if successful, false if not found
 */
export async function deleteTuteur(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tuteurs/${id}`, {
      method: "DELETE"
    });
    
    if (response.status === 404) {
      return false;
    }
    
    if (!response.ok) {
      throw new Error(`Error deleting tuteur: ${response.status} ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting tuteur with ID ${id}:`, error);
    throw error;
  }
}

// For mock/testing purposes
export async function mockGetAllTuteurs(): Promise<Tuteur[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, cin: "T123456", nom: "Toufiq", prenom: "Tarik" },
    { id: 2, cin: "T789012", nom: "Tazi", prenom: "Talal" },
    { id: 3, cin: "T345678", nom: "Tahiri", prenom: "Taoufik" }
  ];
}

// For mock/testing purposes
export async function mockCreateTuteur(tuteur: Omit<Tuteur, "id">): Promise<Tuteur> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: Math.floor(Math.random() * 1000) + 10,
    ...tuteur
  };
}