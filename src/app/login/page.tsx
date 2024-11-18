"use client"
import { useEffect } from 'react'
import LoginForm from './login-form'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('companyId')) {
      router.push("/dashboard")
    }
  }, [router])
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm />
    </div>
  )
}