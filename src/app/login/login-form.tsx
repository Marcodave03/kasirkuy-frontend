'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from 'next/link'
import { BASE_URL } from '../config'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch(`${BASE_URL}/api/workers/login/${email}/${password}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.status === true) {
          localStorage.setItem('ownerId',data.id);
          const res = await fetch(`${BASE_URL}/api/companies/` + localStorage.getItem('ownerId'))
          const companies = await res.json();
          if (Array.isArray(companies) && companies.length > 0) {
            localStorage.setItem('companyId', companies[0].id.toString());
            localStorage.setItem('companyName', companies[0].name);
            router.push('/dashboard');
          } else {
            router.push('/company')
          }
        } else {
          setError(data.error || 'Login failed. Please check your credentials.');
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your details to login to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                required 
              />
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button className="w-full mt-4" type="submit">Login</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </CardFooter>
    </Card>
  )
}