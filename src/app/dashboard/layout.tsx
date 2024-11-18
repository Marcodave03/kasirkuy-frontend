import Link from 'next/link'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb"
import { ActionButton } from "@/components/actionButton"
import { DarkTheme } from "@/components/darktheme"
import { Button } from "@/components/ui/button"
import { Package, CreditCard } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
      } as React.CSSProperties}
    >
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <header className="bg-background flex h-14 items-center justify-between border-b px-4 py-2">
          <div className="flex flex-row items-center w-full gap-2">
            <div className="md:hidden flex gap-2">
              <Button asChild variant="outline" size="icon">
                <Link href="/dashboard/product">
                  <Package className="h-4 w-4" />
                  <span className="sr-only">Product</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="/dashboard/transaction">
                  <CreditCard className="h-4 w-4" />
                  <span className="sr-only">Transaction</span>
                </Link>
              </Button>
            </div>
            <div className="hidden md:block">
              <BreadcrumbEllipsis />
            </div>
            <div className="flex flex-row ml-auto space-x-2">
              <DarkTheme />
              <ActionButton />
            </div>
          </div>
        </header>
        <SidebarInset className="flex-1 overflow-auto w-full">
          <main className="p-4 md:p-6 max-w-full">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}