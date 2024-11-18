"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"


export function ActionButton() {
  const [position, setPosition] = React.useState("bottom")
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>+</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Quick Access</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem onClick={()=>{router.push("/dashboard/addtransaction")}} value="top">Add Transaction</DropdownMenuRadioItem>
          <DropdownMenuRadioItem onClick={()=>{ try {
          localStorage.removeItem('ownerId')
          localStorage.removeItem('companyId')
          router.push('/login')
          } catch (error) {
            console.error('Logout failed', error)
          }router.push("/login")}} value="top">Logout</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
