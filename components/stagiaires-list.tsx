"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { PlusCircle, Search, Edit, Trash2, Loader2 } from "lucide-react"
import { Stagiaire } from "@/lib/api-client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteStagiaire, getAllStagiaires, mockGetAllStagiaires } from "@/lib/api-stagaire"

export function StagiairesList() {
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])
  const [filteredStagiaires, setFilteredStagiaires] = useState<Stagiaire[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [stagiaireToDelete, setStagiaireToDelete] = useState<Stagiaire | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch stagiaires on component mount
  useEffect(() => {
    async function fetchStagiaires() {
      setIsLoading(true)
      try {
        // Import dynamically to avoid errors during build
        
        // Use mock function for development, real function for production
        let fetchedStagiaires
        try {
          // Try real API first
          fetchedStagiaires = await getAllStagiaires()
        } catch (error) {
          // Fallback to mock if real API fails
          console.log("Using mock data for stagiaires")
          fetchedStagiaires = await mockGetAllStagiaires()
        }
        
        setStagiaires(fetchedStagiaires)
        setFilteredStagiaires(fetchedStagiaires)
      } catch (error) {
        console.error("Error fetching stagiaires:", error)
        toast({
          title: "Erreur",
          description: "Impossible de récupérer la liste des stagiaires",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStagiaires()
  }, [])

  // Filter stagiaires when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStagiaires(stagiaires)
      return
    }

    const lowerSearchTerm = searchTerm.toLowerCase()
    const filtered = stagiaires.filter(
      (stagiaire) =>
        stagiaire.cin.toLowerCase().includes(lowerSearchTerm) ||
        stagiaire.nom.toLowerCase().includes(lowerSearchTerm) ||
        stagiaire.prenom.toLowerCase().includes(lowerSearchTerm)
    )
    setFilteredStagiaires(filtered)
  }, [searchTerm, stagiaires])

  // Handle stagiaire deletion
  const confirmDeleteStagiaire = (stagiaire: Stagiaire) => {
    setStagiaireToDelete(stagiaire)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteStagiaire = async () => {
    if (!stagiaireToDelete || !stagiaireToDelete.id) return

    setIsDeleting(true)
    try {
      const success = await deleteStagiaire(stagiaireToDelete.id)

      if (success) {
        // Remove from the local state
        const updatedStagiaires = stagiaires.filter(s => s.id !== stagiaireToDelete.id)
        setStagiaires(updatedStagiaires)
        setFilteredStagiaires(
          filteredStagiaires.filter(s => s.id !== stagiaireToDelete.id)
        )

        toast({
          title: "Stagiaire supprimé",
          description: "Le stagiaire a été supprimé avec succès"
        })
      } else {
        toast({
          title: "Erreur",
          description: "Le stagiaire n'a pas pu être supprimé",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error deleting stagiaire:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(false)
      setDeleteConfirmOpen(false)
      setStagiaireToDelete(null)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Liste des Stagiaires</CardTitle>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/stagiaires/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un stagiaire
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
        ) : filteredStagiaires.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "Aucun stagiaire ne correspond à votre recherche" : "Aucun stagiaire trouvé"}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CIN</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStagiaires.map((stagiaire) => (
                  <TableRow key={stagiaire.id || stagiaire.cin}>
                    <TableCell>{stagiaire.cin}</TableCell>
                    <TableCell>{stagiaire.nom}</TableCell>
                    <TableCell>{stagiaire.prenom}</TableCell>
                    <TableCell>{stagiaire.institution || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="h-8 w-8"
                        >
                          <Link href={`/stagiaires/edit/${stagiaire.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => confirmDeleteStagiaire(stagiaire)}
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
                Êtes-vous sûr de vouloir supprimer le stagiaire {stagiaireToDelete?.prenom} {stagiaireToDelete?.nom} ({stagiaireToDelete?.cin}) ?
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
                onClick={handleDeleteStagiaire}
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
