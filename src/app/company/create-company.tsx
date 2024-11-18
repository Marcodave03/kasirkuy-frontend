'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BASE_URL } from '../config'

export default function CreateCompany() {
  const [companyName, setCompanyName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!companyName.trim()) {
      setError('Company name cannot be empty')
      setIsLoading(false)
      return
    }

    const ownerId = localStorage.getItem('ownerId')
    if (!ownerId) {
      setError('Owner ID not found. Please log in again.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${BASE_URL}/api/companies/new_company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ownerId, name: companyName }),
      })
      if (!response.ok) {
        throw new Error('Failed to create company')
      }else{
        const res = await response.json();
        localStorage.setItem('companyId', res.id);
        localStorage.setItem('companyName', res.name);
      }
      router.push('/dashboard')
    } catch (err) {
      setError('An error occurred while creating the company. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create New Company</CardTitle>
          <CardDescription>Enter your company name to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Company'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div> 
  )
}