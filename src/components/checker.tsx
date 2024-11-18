"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Checker() {
    const router = useRouter()
    useEffect(() => {
      if (!localStorage.getItem('companyId') || !localStorage.getItem('ownerId')) {
        router.push("/login")
      }
    }, [router])
    return(
      <></>
    )
}

export default Checker