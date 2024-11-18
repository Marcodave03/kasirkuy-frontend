'use client'

import { useEffect, useState } from 'react'
import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import { BASE_URL } from '@/app/config'

async function fetchProducts(companyId: string): Promise<Products[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/items/products?companyId=${companyId}`
    )
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    const rawData = await response.json()
    console.log("Fetched Data:", rawData)

    return rawData.map(
      ({
        id,
        name,
        categoryId,
        categoryName,
        price,
        sales,
        stock,
      }: {
        id: string | number
        name: string
        categoryId: string | number
        categoryName: string
        price: BigInteger
        sales: BigInteger
        stock: BigInteger
      }) => ({
        id,
        name,
        categoryName,
        categoryId,
        price,
        sales,
        stock,
      })
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return []
  }
}

export function ProductClient() {
  const [data, setData] = useState<Products[]>([])

  useEffect(() => {
    const companyId = localStorage.getItem("companyId")
    if (companyId) {
      fetchProducts(companyId).then(setData)
    }
  }, [])

  return (
    <div>
      <div className="flex flex-row mb-2 space-x-2 justify-end"></div>
      <div className="border-2 rounded-lg p-2">
        <h2 className="mb-4"></h2>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}