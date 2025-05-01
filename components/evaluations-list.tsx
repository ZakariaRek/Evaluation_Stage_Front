"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { PlusCircle, Search, Info, Loader2, Calendar, Building, User, UserPlus, FileText } from "lucide-react"
import { 
  Appreciation, 
  EvaluationSummary, 
  AppreciationId,
  getAllEvaluations,
  getEvaluationById,

} from "@/lib/api-evaluation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function EvaluationsList() {
  const [evaluations, setEvaluations] = useState<EvaluationSummary[]>([])
  const [filteredEvaluations, setFilteredEvaluations] = useState<EvaluationSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvaluation, setSelectedEvaluation] = useState<Appreciation | null>(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Format date from ISO to DD/MM/YYYY
  const formatDate = (isoDate: string) => {
    try {
      const date = new Date(isoDate)
      return date.toLocaleDateString('fr-FR')
    } catch (error) {
      return isoDate
    }
  }

  // Fetch evaluations on component mount
  useEffect(() => {
    async function fetchEvaluations() {
      setIsLoading(true)
      try {
let fetchedEvaluations: EvaluationSummary[] = []
        
        try {
          // Try to get evaluations from real API
          fetchedEvaluations = await getAllEvaluations()
        } catch (error) {
          console.log("Using mock data for evaluations")
          // Fallback to mock if real API fails
        }
        
        // Initialize fetchedEvaluations with empty array to avoid undefined
// Remove duplicate declaration since fetchedEvaluations is already declared above
        setEvaluations(fetchedEvaluations);
        setFilteredEvaluations(fetchedEvaluations)
      } catch (error) {
        console.error("Error fetching evaluations:", error)
        toast({
          title: "Erreur",
          description: "Impossible de récupérer la liste des évaluations",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvaluations()
  }, [])

  // Filter evaluations when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEvaluations(evaluations)
      return
    }

    const lowerSearchTerm = searchTerm.toLowerCase()
    const filtered = evaluations.filter(
      (evaluation) =>
        evaluation.tuteurCIN.toLowerCase().includes(lowerSearchTerm) ||
        evaluation.stagiaireCIN.toLowerCase().includes(lowerSearchTerm) ||
        evaluation.entreprise.toLowerCase().includes(lowerSearchTerm) ||
        `${evaluation.tuteurNom} ${evaluation.tuteurPrenom}`.toLowerCase().includes(lowerSearchTerm) ||
        `${evaluation.stagiaireNom} ${evaluation.stagiairePrenom}`.toLowerCase().includes(lowerSearchTerm)
    )
    setFilteredEvaluations(filtered)
  }, [searchTerm, evaluations])

  // Load evaluation details
  const loadEvaluationDetails = async (evaluation: EvaluationSummary) => {
    if (!evaluation.id) return

    setIsLoadingDetails(true)
    try {
      let details: Appreciation
      
      try {
        // Try to get details from real API
        details = await getEvaluationById(evaluation.id)
      } catch (error) {
        // Fallback to mock if real API fails
        console.log("Using mock data for evaluation details")
      }
      
      // Only set selected evaluation if details were successfully fetched
      if (typeof details !== 'undefined') {
        setSelectedEvaluation(details)
      }
      setDetailsOpen(true)
    } catch (error) {
      console.error("Error loading evaluation details:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails de l'évaluation",
        variant: "destructive",
      })
    } finally {
      setIsLoadingDetails(false)
    }
  }

  // Get user-friendly evaluation label
  const getEvaluationLabel = (category: string, value: string) => {
    const categories: Record<string, string> = {
      "IMPLICATION_ACTIVITE": "Implication dans ses activités",
      "OUVERTURE_AUX_AUTRES": "Ouverture aux autres",
      "QUALITE_DE_SES_PRODUCTIONS": "Qualité de ses productions"
    }

    const values: Record<string, string> = {
      "BONNE": "Bonne",
      "TRES_BONNE": "Très bonne",
      "EXCELLENTE": "Excellente",
      "TRES_PROFESSIONNELLE": "Très professionnelle",
      "PARESSEUX": "Paresseux",
      "JUSTE_NECESSAIRE": "Le juste nécessaire",
      "TRES_FORTE": "Très forte",
      "DEPASSE_OBJECTIFS": "Dépasse ses objectifs",
      "ISOLE": "Isolé(e) ou en opposition",
      "RENFERME": "Renfermé(e) ou obtus",
      "MEDIOCRE": "Médiocre",
      "ACCEPTABLE": "Acceptable"
    }

    return {
      category: categories[category] || category,
      value: values[value] || value
    }
  }

  // Get user-friendly competence label
  const getCompetenceLabel = (competence: string, category: string, value: string) => {
    const competences: Record<string, string> = {
      "COMPETENCE_INDIVIDUELLE": "Compétences liées à l'individu",
      "COMPETENCE_ENTREPRISE": "Compétences liées à l'entreprise",
      "COMPETENCE_TECHNIQUE": "Compétences scientifiques et techniques",
      "COMPETENCE_SPECIFIQUE": "Compétences spécifiques métier"
    }

    const categories: Record<string, string> = {
      "ANALYSE_SYNTHESE": "Capacité d'analyse et de synthèse",
      "PROPOSER_METHODES": "Proposer des méthodes et axes de travail",
      "ANALYSER_FONCTIONNEMENT": "Analyser le fonctionnement de l'entreprise",
      "ANALYSER_DEMARCHE_PROJET": "Analyser la démarche projet",
      "POLITIQUE_ENVIRONNEMENTALE": "Comprendre la politique environnementale",
      "RECHERCHER_INFORMATION": "Rechercher l'information nécessaire",
      "IDENTIFIER_REGLEMENTATION": "Identifier la réglementation"
    }

    const values: Record<string, string> = {
      "NA": "Non applicable",
      "DEBUTANT": "Débutant",
      "AUTONOME": "Autonome",
      "AUTONOME_PLUS": "Autonome +"
    }

    return {
      competence: competences[competence] || competence,
      category: categories[category] || category,
      value: values[value] || value
    }
  }

  // Get color for competence level
  const getCompetenceLevelColor = (value: string) => {
    switch (value) {
      case "NA":
        return "bg-gray-200 text-gray-800";
      case "DEBUTANT":
        return "bg-blue-100 text-blue-800";
      case "AUTONOME":
        return "bg-green-100 text-green-800";
      case "AUTONOME_PLUS":
        return "bg-green-200 text-green-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  // Generate unique evaluation key
  const getEvaluationKey = (id: AppreciationId) => {
    return `${id.periodeStagiaireId}-${id.periodeStageId}-${id.tuteurId}`;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Liste des Évaluations</CardTitle>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/evaluations/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle évaluation
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par CIN, nom ou entreprise..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : filteredEvaluations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "Aucune évaluation ne correspond à votre recherche" : "Aucune évaluation trouvée"}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tuteur CIN</TableHead>
                  <TableHead>Stagiaire CIN</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Date Début</TableHead>
                  <TableHead>Date Fin</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.map((evaluation) => (
                  <TableRow key={getEvaluationKey(evaluation.id)}>
                    <TableCell className="font-medium">{evaluation.tuteurCIN}</TableCell>
                    <TableCell>{evaluation.stagiaireCIN}</TableCell>
                    <TableCell>{evaluation.entreprise}</TableCell>
                    <TableCell>{formatDate(evaluation.dateDebut)}</TableCell>
                    <TableCell>{formatDate(evaluation.dateFin)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto flex items-center gap-1"
                        onClick={() => loadEvaluationDetails(evaluation)}
                        disabled={isLoadingDetails}
                      >
                        {isLoadingDetails ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Info className="h-4 w-4" />
                        )}
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Evaluation Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedEvaluation ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    Détails de l'évaluation
                  </DialogTitle>
                  <DialogDescription>
                    Stage de {selectedEvaluation.periode.stagiaire.prenom} {selectedEvaluation.periode.stagiaire.nom} 
                    chez {selectedEvaluation.periode.stage.entreprise}
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="summary" className="mt-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="summary" className="flex-1">Résumé</TabsTrigger>
                    <TabsTrigger value="evaluations" className="flex-1">Évaluations</TabsTrigger>
                    <TabsTrigger value="competencies" className="flex-1">Compétences</TabsTrigger>
                  </TabsList>
                  
                  {/* Résumé Tab */}
                  <TabsContent value="summary" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="bg-muted/30 pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <User className="h-5 w-5" /> 
                            Informations Stagiaire
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm text-muted-foreground">CIN</dt>
                              <dd className="font-medium">{selectedEvaluation.periode.stagiaire.cin}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Nom Complet</dt>
                              <dd className="font-medium">{selectedEvaluation.periode.stagiaire.prenom} {selectedEvaluation.periode.stagiaire.nom}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Institution</dt>
                              <dd>{selectedEvaluation.periode.stagiaire.institution}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Niveau</dt>
                              <dd>{selectedEvaluation.periode.stagiaire.niveau}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Description</dt>
                              <dd className="text-sm">{selectedEvaluation.periode.stagiaire.description}</dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="bg-muted/30 pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <UserPlus className="h-5 w-5" /> 
                            Informations Tuteur
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm text-muted-foreground">CIN</dt>
                              <dd className="font-medium">{selectedEvaluation.tuteur.cin}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Nom Complet</dt>
                              <dd className="font-medium">{selectedEvaluation.tuteur.prenom} {selectedEvaluation.tuteur.nom}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Fonction</dt>
                              <dd>{selectedEvaluation.tuteur.fonction}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Technologies</dt>
                              <dd>{selectedEvaluation.tuteur.technos || "-"}</dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                      
                      <Card className="md:col-span-2">
                        <CardHeader className="bg-muted/30 pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Building className="h-5 w-5" /> 
                            Informations Stage
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <dl className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm text-muted-foreground">Entreprise</dt>
                              <dd className="font-medium">{selectedEvaluation.periode.stage.entreprise}</dd>
                            </div>
                            <div>
                              <dt className="text-sm text-muted-foreground">Période</dt>
                              <dd className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(selectedEvaluation.periode.date_debut)} - {formatDate(selectedEvaluation.periode.date_fin)}
                              </dd>
                            </div>
                            <div className="md:col-span-2">
                              <dt className="text-sm text-muted-foreground">Description</dt>
                              <dd>{selectedEvaluation.periode.stage.description}</dd>
                            </div>
                            <div className="md:col-span-2">
                              <dt className="text-sm text-muted-foreground">Objectif</dt>
                              <dd>{selectedEvaluation.periode.stage.objectif}</dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Évaluations Tab */}
                  <TabsContent value="evaluations" className="pt-4">
                    <Card>
                      <CardHeader className="bg-muted/30 pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Évaluations Générales
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <dl className="space-y-4">
                          {selectedEvaluation.evaluations.map(evaluation => {
                            const { category, value } = getEvaluationLabel(evaluation.categorie, evaluation.valeur);
                            return (
                              <div key={evaluation.id} className="border-b pb-3 last:border-0 last:pb-0">
                                <dt className="text-sm font-medium">{category}</dt>
                                <dd className="mt-1 flex items-center">
                                  <span className="font-semibold text-primary">{value}</span>
                                </dd>
                              </div>
                            );
                          })}
                        </dl>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Compétences Tab */}
                  <TabsContent value="competencies" className="pt-4">
                    <Accordion type="single" collapsible className="space-y-4">
                      {selectedEvaluation.competences.map(competence => (
                        <AccordionItem 
                          key={competence.id} 
                          value={`item-${competence.id}`}
                          className="border rounded-md overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
                            <div className="flex items-center justify-between w-full pr-4">
                              <span>{getCompetenceLabel(competence.intitule, "", "").competence}</span>
                              <span className="text-sm font-normal text-muted-foreground">
                                Note: <span className="font-semibold text-primary">{competence.note}/5</span>
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pt-2 pb-4">
                            <div className="space-y-3">
                              {competence.categories.map(category => {
                                const { category: categoryLabel, value: valueLabel } = getCompetenceLabel("", category.intitule, category.valeur);
                                return (
                                  <div key={category.id} className="flex justify-between items-center border-b pb-2">
                                    <span className="text-sm">{categoryLabel}</span>
                                    <Badge className={getCompetenceLevelColor(category.valeur)}>
                                      {valueLabel}
                                    </Badge>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
