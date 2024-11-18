'use client'

import React, { useEffect } from 'react'
import CreateCompany from './create-company'
import { useRouter } from 'next/navigation'

function CompanyPage() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('companyId')) {
      router.push("/dashboard")
    }
  }, [router])

  return <CreateCompany />
}

export default CompanyPage