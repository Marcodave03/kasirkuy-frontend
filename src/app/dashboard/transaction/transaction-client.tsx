'use client'

import { useEffect, useState } from 'react'
import dayjs from "dayjs"
import { Transaction } from "./columns"
import TransactionServer from './transaction-server'
import { BASE_URL } from '@/app/config'

async function fetchTransactions(companyId: string): Promise<Transaction[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/transactions/${companyId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    
    const rawData = await response.json()
    return rawData.map(({ id, invoice, date, custName, custPhone, totalPrice, paymentProofUrl}: { id: string | number; invoice: string; date : string; custName:string ; custPhone:string ; totalPrice : BigInteger; paymentProofUrl:string }) => ({
      id,
      invoice,
      date : dayjs(date).format("MMM D, YYYY | HH:mm"),
      custName,
      custPhone,
      totalPrice,
      paymentProofUrl
    }))
  } catch (error) {
    console.error("Error fetching data:", error)
    return []
  }
}

export default function TransactionClient() {
  const [data, setData] = useState<Transaction[]>([])
  const [companyId, setCompanyId] = useState<string | null>(null)

  useEffect(() => {
    const id = localStorage.getItem("companyId")
    if (id) {
      setCompanyId(id)
      fetchTransactions(id).then(setData)
    }
  }, [])

  if (!companyId) {
    return <div>Loading...</div>
  }

  return <TransactionServer data={data} companyId={companyId} />
}