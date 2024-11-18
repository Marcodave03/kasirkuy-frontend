'use client'

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Upload } from 'lucide-react'
import { BASE_URL } from "@/app/config"

interface ViewDetailProps {
  id: string | number
  invoice: string
}

export default function ViewPayment({ id, invoice }: ViewDetailProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      fetchHeader()
    }
  }, [isDialogOpen])

  const fetchHeader = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/transactions/header/` + id);
  
      if (response.ok) {
        const result = await response.json();
        const {paymentProofUrl } = result;
        if (paymentProofUrl) {
          try {
            const imageResponse = await fetch(`${BASE_URL}/api/storage/` + paymentProofUrl);
            if (imageResponse.ok) {
              const imageBlob = await imageResponse.blob();
              setImage(URL.createObjectURL(imageBlob));
            } else {
              console.error("Failed to fetch image");
              setImage(null);
            }
          } catch (imageError) {
            console.error("Error fetching image:", imageError);
            setImage(null);
          }
        } else {
          setImage(null); // No image URL present
        }
      } else {
        console.error("Failed to fetch header");
        setImage(null);
      }
    } catch (error) {
      console.error("Error fetching header:", error);
      setImage(null);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const response = await fetch(`${BASE_URL}/api/storage/upload/${id}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const url = await response.text();
          const setProof = await fetch(`${BASE_URL}/api/transactions/setProof/${id}/${url}`, {
            method : 'POST'
          })
          if(setProof.ok)await fetchHeader();
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Please upload a valid image file");
    }
  };
  

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`View invoice ${invoice}`}>
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{invoice}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : image ? (
            <div className="text-right">
              <img src={image} alt={`Invoice ${invoice}`} className="w-full h-auto mb-4" />
              <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="font-semibold text-blue-300"> Edit Image </span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleUpload} accept="image/*" />
              </label>
            </div>
          ) : (
            <div >
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 mt-2 cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-blue-400">Upload an image</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleUpload} accept="image/*" />
              </label>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}