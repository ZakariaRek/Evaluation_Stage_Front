import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function ColorPalettePage() {
  const colors = [
    { 
      name: "Primary (#222831)", 
      className: "bg-primary",
      textClassName: "text-primary-foreground" 
    },
    { 
      name: "Secondary (#393E46)", 
      className: "bg-secondary",
      textClassName: "text-secondary-foreground" 
    },
    { 
      name: "Accent (#948979)", 
      className: "bg-accent",
      textClassName: "text-accent-foreground" 
    },
    { 
      name: "Card/Background (#DFD0B8)", 
      className: "bg-card",
      textClassName: "text-card-foreground" 
    },
    { 
      name: "Background", 
      className: "bg-background",
      textClassName: "text-foreground" 
    },
    { 
      name: "Muted", 
      className: "bg-muted",
      textClassName: "text-muted-foreground" 
    },
    { 
      name: "Border", 
      className: "bg-border",
      textClassName: "text-foreground" 
    }
  ]

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Color Palette</h1>
        <ThemeToggle />
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Color Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Color Palette</h3>
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: "#222831" }}></div>
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: "#393E46" }}></div>
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: "#948979" }}></div>
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: "#DFD0B8" }}></div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#222831" }}></div>
                  <span>#222831 - Dark Charcoal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#393E46" }}></div>
                  <span>#393E46 - Dark Slate Gray</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#948979" }}></div>
                  <span>#948979 - Taupe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#DFD0B8" }}></div>
                  <span>#DFD0B8 - Cream</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Theme Usage</h3>
              <p className="mb-2">Toggle the theme to see how the colors adapt to dark and light modes.</p>
              <p className="text-sm text-muted-foreground">
                This color palette provides an elegant, professional look with warm neutral tones 
                balanced by dark, sophisticated accents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color) => (
          <Card key={color.name} className="overflow-hidden">
            <div className={`h-24 ${color.className}`}></div>
            <CardContent className="pt-4">
              <h3 className="font-medium">{color.name}</h3>
              <div className={`mt-2 px-3 py-2 rounded ${color.className} ${color.textClassName}`}>
                Sample Text
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Text and UI Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Text Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-foreground">Text Foreground</p>
                  <p className="text-muted-foreground">Muted Foreground</p>
                  <p className="text-primary">Primary Text</p>
                  <p className="text-secondary">Secondary Text</p>
                  <p className="text-accent">Accent Text</p>
                </div>
                <div className="space-y-2">
                  <p className="text-primary-foreground bg-primary p-1 rounded">Primary Foreground</p>
                  <p className="text-secondary-foreground bg-secondary p-1 rounded">Secondary Foreground</p>
                  <p className="text-accent-foreground bg-accent p-1 rounded">Accent Foreground</p>
                  <p className="text-card-foreground bg-card p-1 rounded">Card Foreground</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Borders & Accents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-4 rounded-md">Standard Border</div>
                <div className="border-accent border-2 p-4 rounded-md">Accent Border</div>
                <div className="border-primary border-2 p-4 rounded-md">Primary Border</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}