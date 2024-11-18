'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DataTable } from "./data-table"
import { BASE_URL } from "@/app/config"

interface Product {
  id: number | string
  name: string
  price: number
  stock: number
  sales: number
}

interface TransactionProduct {
  name: string
  qty: number
  price: number
  total: number
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/items/products?companyId=${localStorage.getItem("companyId")}`
    )
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    const data = await response.json()
    return data.map(({ id, name, price, stock, sales }: Product) => ({
      id,
      name,
      price: Number(price),
      stock: Number(stock),
      sales: Number(sales),
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export default function AddTransaction() {
  const [custname, setCustname] = useState<string>("")
  const [custphone, setCustphone] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])
  const [addedProducts, setAddedProducts] = useState<TransactionProduct[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const router = useRouter()

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

  const handleAddProduct = () => {
    if (selectedProduct) {
      const existingProductIndex = addedProducts.findIndex(
        (product) => product.name === selectedProduct.name
      )

      if (existingProductIndex >= 0) {
        const updatedProducts = [...addedProducts]
        updatedProducts[existingProductIndex].qty += quantity
        updatedProducts[existingProductIndex].total += quantity * selectedProduct.price

        setAddedProducts(updatedProducts)
      } else {
        const total = selectedProduct.price * quantity
        const newProduct: TransactionProduct = {
          name: selectedProduct.name,
          qty: quantity,
          price: selectedProduct.price,
          total: total,
        }

        setAddedProducts((prevAddedProducts) => [...prevAddedProducts, newProduct])
      }
    }
  }

  const handleRemoveProduct = (productName: string) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((product) => product.name !== productName)
    )
  }

  const deleteAll = () => {
    setAddedProducts([])
  }

  const handleSubmit = async () => {
    try {
      const headerResponse = await fetch(
        `${BASE_URL}/api/transactions/new_transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyId: localStorage.getItem("companyId"),
            name: custname,
            phone: custphone,
            totalPrice: addedProducts.reduce((sum, product) => sum + product.total, 0),
          }),
        }
      )

      if (!headerResponse.ok) {
        throw new Error("Failed to create transaction header")
      }

      const headerData = await headerResponse.json()
      const transactionId = headerData.id

      for (const product of addedProducts) {
        const detailResponse = await fetch(
          `${BASE_URL}/api/transactions/new_detail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tId: transactionId,
              name: product.name,
              price: product.price,
              quantity: product.qty,
            }),
          }
        )

        if (!detailResponse.ok) {
          throw new Error(`Failed to create transaction detail for product: ${product.name}`)
        }
      }

      deleteAll()
      alert("Transaction successfully created!")
      router.push("/dashboard/transaction")
    } catch (error) {
      console.error("Error during transaction submission:", error)
      alert("Failed to complete transaction")
    }
  }

  if (products.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>No Products Available</CardTitle>
          <CardDescription>You need to add products before creating a transaction.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push('/dashboard/product')}>Add Products</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  onValueChange={(value) => {
                    const product = products.find((prod) => prod.name === value)
                    setSelectedProduct(product || null)
                  }}
                >
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleAddProduct}>Add Product</Button>
            <Button variant="outline" onClick={deleteAll}>Reset</Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <DataTable data={addedProducts} onRemoveProduct={handleRemoveProduct} />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Name</Label>
              <Input
                id="customerName"
                value={custname}
                onChange={(e) => setCustname(e.target.value)}
                placeholder="Customer Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                value={custphone}
                onChange={(e) => setCustphone(e.target.value)}
                placeholder="Phone Number"
                onKeyDown={(event) => {
                  if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                    event.preventDefault()
                  }
                }}
              />
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleSubmit}>Complete Transaction</Button>
      </div>
    </div>
  )
}