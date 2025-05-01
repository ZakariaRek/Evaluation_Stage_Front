// lib/api-stagiaire.ts
import { Stagiaire } from "./api-client";

const API_BASE_URL = "http://localhost:8080";

/**
 * Get all stagiaires from the API
 * @returns Promise containing an array of Stagiaire objects
 */
export async function getAllStagiaires(): Promise<Stagiaire[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stagiaires`);
    
    if (!response.ok) {
      throw new Error(`Error fetching stagiaires: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error getting stagiaires:", error);
    throw error;
  }
}

/**
 * Create a new stagiaire in the system
 * @param stagiaire The stagiaire object to create
 * @returns Promise containing the created Stagiaire with ID
 */
export async function createStagiaire(stagiaire: Omit<Stagiaire, "id">): Promise<Stagiaire> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stagiaires`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stagiaire)
    });
    
    if (!response.ok) {
      throw new Error(`Error creating stagiaire: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error creating stagiaire:", error);
    throw error;
  }
}

/**
 * Get a stagiaire by ID
 * @param id The ID of the stagiaire to retrieve
 * @returns Promise containing the Stagiaire object or null if not found
 */
export async function getStagiaireById(id: number): Promise<Stagiaire | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stagiaires/${id}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Error fetching stagiaire: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error getting stagiaire with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Update an existing stagiaire
 * @param id The ID of the stagiaire to update
 * @param stagiaire The updated stagiaire data
 * @returns Promise containing the updated Stagiaire
 */
export async function updateStagiaire(id: number, stagiaire: Omit<Stagiaire, "id">): Promise<Stagiaire | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stagiaires/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stagiaire)
    });
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Error updating stagiaire: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating stagiaire with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a stagiaire by ID
 * @param id The ID of the stagiaire to delete
 * @returns Promise resolving to true if successful, false if not found
 */
export async function deleteStagiaire(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stagiaires/${id}`, {
      method: "DELETE"
    });
    
    if (response.status === 404) {
      return false;
    }
    
    if (!response.ok) {
      throw new Error(`Error deleting stagiaire: ${response.status} ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting stagiaire with ID ${id}:`, error);
    throw error;
  }
}

// For mock/testing purposes
export async function mockGetAllStagiaires(): Promise<Stagiaire[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, cin: "A123456", nom: "Alaoui", prenom: "Ahmed" },
    { id: 2, cin: "B789012", nom: "Benani", prenom: "Bouchra" },
    { id: 3, cin: "C345678", nom: "Chaoui", prenom: "Chaimae" }
  ];
}

// For mock/testing purposes
export async function mockCreateStagiaire(stagiaire: Omit<Stagiaire, "id">): Promise<Stagiaire> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: Math.floor(Math.random() * 1000) + 10,
    ...stagiaire
  };
}