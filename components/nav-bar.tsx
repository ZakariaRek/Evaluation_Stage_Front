"use client"

import * as React from "react"
import Link from "next/link"
import { Moon, Sun } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function NavBar() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center gap-2">
            <span className="text-lg font-bold text-primary">Evaluation Stage</span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Evaluation</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4 bg-popover">
                    <ListItem href="/evaluations" title="Liste de evaluation">
                      Voir toutes les évaluations
                    </ListItem>
                    <ListItem href="/evaluations/add" title="Add evaluation">
                      Ajouter une nouvelle évaluation
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/stagiaires" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>List Stagiaire</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/tuteurs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>List Tuteur</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Theme"
          className="mr-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-[1.5rem] w-[1.5rem]" /> : <Moon className="h-[1.5rem] w-[1.5rem]" />}
        </Button>
      </div>
    </div>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"