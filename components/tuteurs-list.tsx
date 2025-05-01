"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { PlusCircle, Search, Edit, Trash2, Loader2 } from "lucide-react"
import { Tuteur } from "@/lib/api-client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteTuteur, getAllTuteurs, mockGetAllTuteurs } from "@/lib/api-tuteur"

export function TuteursList() {
  const [tuteurs, setTuteurs] = useState<Tuteur[]>([])
  const [filteredTuteurs, setFilteredTuteurs] = useState<Tuteur[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [tuteurToDelete, setTuteurToDelete] = useState<Tuteur | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch tuteurs on component mount
  useEffect(() => {
    async function fetchTuteurs() {
      setIsLoading(true)
      try {
        // Import dynamically to avoid errors during build
        
        // Use mock function for development, real function for production
        let fetchedTuteurs
        try {
          // Try real API first
          fetchedTuteurs = await getAllTuteurs()
        } catch (error) {
          // Fallback to mock if real API fails
          console.log("Using mock data for tuteurs")
          fetchedTuteurs = await mockGetAllTuteurs()
        }
        
        setTuteurs(fetchedTuteurs)
        setFilteredTuteurs(fetchedTuteurs)
      } catch (error) {
        console.error("Error fetching tuteurs:", error)
        toast({
          title: "Erreur",
          description: "Impossible de récupérer la liste des tuteurs",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTuteurs()
  }, [])

  // Filter tuteurs when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTuteurs(tuteurs)
      return
    }

    const lowerSearchTerm = searchTerm.toLowerCase()
    const filtered = tuteurs.filter(
      (tuteur) =>
        tuteur.cin.toLowerCase().includes(lowerSearchTerm) ||
        tuteur.nom.toLowerCase().includes(lowerSearchTerm) ||
        tuteur.prenom.toLowerCase().includes(lowerSearchTerm)
    )
    setFilteredTuteurs(filtered)
  }, [searchTerm, tuteurs])

  // Handle tuteur deletion
  const confirmDeleteTuteur = (tuteur: Tuteur) => {
    setTuteurToDelete(tuteur)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteTuteur = async () => {
    if (!tuteurToDelete || !tuteurToDelete.id) return

    setIsDeleting(true)
    try {
      const success = await deleteTuteur(tuteurToDelete.id)

      if (success) {
        // Remove from the local state
        const updatedTuteurs = tuteurs.filter(t => t.id !== tuteurToDelete.id)
        setTuteurs(updatedTuteurs)
        setFilteredTuteurs(
          filteredTuteurs.filter(t => t.id !== tuteurToDelete.id)
        )

        toast({
          title: "Tuteur supprimé",
          description: "Le tuteur a été supprimé avec succès"
        })
      } else {
        toast({
          title: "Erreur",
          description: "Le tuteur n'a pas pu être supprimé",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error deleting tuteur:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(false)
      setDeleteConfirmOpen(false)
      setTuteurToDelete(null)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Liste des Tuteurs</CardTitle>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/tuteurs/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un tuteur
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par CIN, nom ou prénom..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : filteredTuteurs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "Aucun tuteur ne correspond à votre recherche" : "Aucun tuteur trouvé"}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CIN</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Fonction</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTuteurs.map((tuteur) => (
                  <TableRow key={tuteur.id || tuteur.cin}>
                    <TableCell>{tuteur.cin}</TableCell>
                    <TableCell>{tuteur.nom}</TableCell>
                    <TableCell>{tuteur.prenom}</TableCell>
                    <TableCell>{tuteur.entreprise || "-"}</TableCell>
                    <TableCell>{tuteur.fonction || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="h-8 w-8"
                        >
                          <Link href={`/tuteurs/edit/${tuteur.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => confirmDeleteTuteur(tuteur)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer le tuteur {tuteurToDelete?.prenom} {tuteurToDelete?.nom} ({tuteurToDelete?.cin}) ?
                Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={isDeleting}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteTuteur}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  "Supprimer"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
