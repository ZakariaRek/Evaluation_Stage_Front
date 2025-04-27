import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Evaluation Stage Etudiants</h1>
        <ThemeToggle />
      </div>
      
      <Card className="bg-card border-accent mb-8">
        <CardHeader className="bg-accent/10">
          <CardTitle className="text-2xl text-accent-foreground">Bienvenue dans le système d'évaluation</CardTitle>
          <CardDescription className="text-muted-foreground">
            Utilisez la navigation pour accéder aux différentes fonctionnalités.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose pt-6">
          <p className="text-foreground">
            Ce système vous permet de gérer les évaluations de stages des étudiants.
            Vous pouvez ajouter de nouvelles évaluations, consulter la liste des stagiaires et tuteurs,
            et suivre les progrès des étudiants tout au long de leur stage.
          </p>
        </CardContent>
        <CardFooter className="flex gap-4 border-t border-accent/30 pt-4">
          <Button 
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/evaluations/add">Nouvelle Évaluation</Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="border-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Link href="/evaluations">Voir les Évaluations</Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-accent">
          <CardHeader className="bg-accent/10">
            <CardTitle className="text-xl text-accent-foreground">Évaluations</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-foreground">Gérez les évaluations de stage des étudiants.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full hover:bg-accent hover:text-accent-foreground">
              <Link href="/evaluations">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-card border-accent">
          <CardHeader className="bg-accent/10">
            <CardTitle className="text-xl text-accent-foreground">Stagiaires</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-foreground">Consultez la liste des stagiaires et leurs informations.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full hover:bg-accent hover:text-accent-foreground">
              <Link href="/stagiaires">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-card border-accent">
          <CardHeader className="bg-accent/10">
            <CardTitle className="text-xl text-accent-foreground">Tuteurs</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-foreground">Accédez à la liste des tuteurs de stage.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full hover:bg-accent hover:text-accent-foreground">
              <Link href="/tuteurs">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}