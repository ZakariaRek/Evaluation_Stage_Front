"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { checkTuteurExists } from "@/lib/api-client"
import { createTuteur } from "@/lib/api-tuteur"

interface TuteurFormData {
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  entreprise: string;
  fonction: string;
  technos: string;
}

const initialFormData: TuteurFormData = {
  cin: "",
  nom: "",
  prenom: "",
  email: "",
  password: "",
  entreprise: "",
  fonction: "",
  technos: ""
}

export function TuteurForm() {
  const [formData, setFormData] = useState<TuteurFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<TuteurFormData>>({})
  const [checkingCin, setCheckingCin] = useState(false)
  const [cinExists, setCinExists] = useState<boolean | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear validation error when field is modified
    if (errors[name as keyof TuteurFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Check if CIN already exists
  const checkCinExists = async (cin: string) => {
    if (!cin || cin.length < 3) {
      setCinExists(null)
      return
    }

    setCheckingCin(true)
    try {
      // En production:
      const tuteurData = await checkTuteurExists(cin);
      setCinExists(!!tuteurData);
    } catch (error) {
      console.error("Error checking CIN:", error)
      setCinExists(null)
    } finally {
      setCheckingCin(false)
    }
  }

  // Debounced CIN check
  const handleCinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleChange(e)
    
    // Clear timeout if it exists
    if ((window as any).cinCheckTimeout) {
      clearTimeout((window as any).cinCheckTimeout)
    }
    
    // Set new timeout
    (window as any).cinCheckTimeout = setTimeout(() => {
      checkCinExists(value)
    }, 500) as unknown as number
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<TuteurFormData> = {}
    
    // Required field validation
    if (!formData.cin) newErrors.cin = "Le CIN est requis"
    if (!formData.nom) newErrors.nom = "Le nom est requis"
    if (!formData.prenom) newErrors.prenom = "Le prénom est requis"
    if (!formData.email) newErrors.email = "L'email est requis"
    if (!formData.password) newErrors.password = "Le mot de passe est requis"
    if (!formData.entreprise) newErrors.entreprise = "L'entreprise est requise"
    if (!formData.fonction) newErrors.fonction = "La fonction est requise"
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }
    
    // CIN validation
    if (cinExists) {
      newErrors.cin = "Ce CIN existe déjà dans la base de données"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Formulaire invalide",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      
      // Convertir formData en objet Tuteur sans ID
      const tuteurToCreate = {
        cin: formData.cin,
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        entreprise: formData.entreprise,
        fonction: formData.fonction,
        technos: formData.technos
      };
      
      // Appeler l'API pour créer le tuteur
      const response = await createTuteur(tuteurToCreate);
      
      // Reset form on success
      setFormData(initialFormData)
      setCinExists(null)
      
      toast({
        title: "Tuteur ajouté",
        description: "Le tuteur a été ajouté avec succès",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du tuteur",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="border-accent shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-primary">Informations personnelles</h2>
              
              {/* CIN with existence check */}
              <div className="space-y-2">
                <Label htmlFor="cin" className={errors.cin ? "text-destructive" : ""}>
                  CIN <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="cin"
                    name="cin"
                    value={formData.cin}
                    onChange={handleCinChange}
                    className={`${cinExists === true ? 'border-destructive' : cinExists === false ? 'border-green-500' : ''} pr-10`}
                    placeholder="Ex: T123456"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {checkingCin && <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />}
                    {!checkingCin && cinExists === false && formData.cin && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {!checkingCin && cinExists === true && <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                </div>
                {errors.cin && <p className="text-sm text-destructive">{errors.cin}</p>}
                {cinExists && <p className="text-sm text-destructive">Ce CIN existe déjà dans la base de données.</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom" className={errors.nom ? "text-destructive" : ""}>
                    Nom <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={errors.nom ? "border-destructive" : ""}
                  />
                  {errors.nom && <p className="text-sm text-destructive">{errors.nom}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenom" className={errors.prenom ? "text-destructive" : ""}>
                    Prénom <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className={errors.prenom ? "border-destructive" : ""}
                  />
                  {errors.prenom && <p className="text-sm text-destructive">{errors.prenom}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                    placeholder="exemple@email.com"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
                    Mot de passe <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-primary">Informations professionnelles</h2>
              
              <div className="space-y-2">
                <Label htmlFor="entreprise" className={errors.entreprise ? "text-destructive" : ""}>
                  Entreprise <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  className={errors.entreprise ? "border-destructive" : ""}
                  placeholder="Nom de l'entreprise"
                />
                {errors.entreprise && <p className="text-sm text-destructive">{errors.entreprise}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fonction" className={errors.fonction ? "text-destructive" : ""}>
                  Fonction <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fonction"
                  name="fonction"
                  value={formData.fonction}
                  onChange={handleChange}
                  className={errors.fonction ? "border-destructive" : ""}
                  placeholder="Ex: Développeur senior, Chef de projet, Architecte..."
                />
                {errors.fonction && <p className="text-sm text-destructive">{errors.fonction}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="technos" className={errors.technos ? "text-destructive" : ""}>
                  Technologies
                </Label>
                <Textarea
                  id="technos"
                  name="technos"
                  value={formData.technos}
                  onChange={handleChange}
                  className={errors.technos ? "border-destructive" : ""}
                  rows={3}
                  placeholder="Technologies maîtrisées, séparées par des virgules (ex: React, Java, Spring, AWS...)"
                />
                {errors.technos && <p className="text-sm text-destructive">{errors.technos}</p>}
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting || cinExists === true}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Ajouter Tuteur"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}