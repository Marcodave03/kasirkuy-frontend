"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DarkTheme() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


// "use client"
// import { Moon, Sun } from "lucide-react";
// import { Switch } from "@/components/ui/switch";
// import { useEffect, useState } from "react";
// import {useTheme} from "next-themes";

// export default function DarkTheme(){
//     const [mounted, setMounted] = useState(false)
//     const { theme, setTheme } = useTheme()
  
//     useEffect(() => {
//       setMounted(true)
//     }, [])
  
//     if (!mounted) return null
//     return(
//         <>
//             <div className="flex items-center space-x-2">
//               <Sun className="h-4 w-4" />
//               <Switch
//                 onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
//               />
//               <Moon className="h-4 w-4" />
//             </div>
//         </>
//     );
// }