// DeleteAlert.tsx

import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';

interface DeleteAlertProps {
  icon?: React.ReactNode;
  productId: string | number;
}



const DeleteProduct: React.FC<DeleteAlertProps> = ({ icon, productId }) => {
  const router = useRouter()
  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/items/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Product with ID ${productId} has been deleted.`);
      } else {
        console.error("Failed to delete the product.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the product:", error);
    }
    router.push("/dashboard/product");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{icon && <span className="icon">{icon}</span>}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className='flex justify-between w-full'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className='font-semibold text-red-500'>Delete</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
