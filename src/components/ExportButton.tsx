'use client'

import { BASE_URL } from "@/app/config"
import { Button } from "@/components/ui/button"
import { FileIcon,FileText } from "lucide-react"
import { useState } from "react"
export function ExportButtonExcel(props:{companyId : string | number}) {
  const [isExporting, setIsExporting] = useState(false)
  const handleExport = async () => {
    try {
      setIsExporting(true)
      const response = await fetch(`${BASE_URL}/api/transactions/export/excel/${props.companyId}`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'transactions.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting file:', error)
    } finally{
      setIsExporting(false)
    }
  }

  return (
    <Button className="mb-2" variant="outline" onClick={handleExport} disabled={isExporting}>
      {isExporting ? "Exporting..." : "Excel"} <FileText className="ml-2 h-4 w-4" />
    </Button>
  )
}

export function ExportButtonPdf(props:{companyId : string | number}) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch(`${BASE_URL}/api/transactions/export/pdf/` + props.companyId, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'transactions.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting file:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button className="mb-2" variant="outline" onClick={handleExport} disabled={isExporting}>
      {isExporting ? "Exporting..." : "PDF"} <FileIcon className="h-4 w-4" />
    </Button>
  )
}