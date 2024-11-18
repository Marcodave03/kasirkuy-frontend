"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { DataTable } from "./data-table-detail";
import { BASE_URL } from "@/app/config";
// import { columns } from "../columns";

interface ViewDetailProps {
  transaction: string | number;
  invoice : string
}

const ViewDetail: React.FC<ViewDetailProps> = ({ transaction, invoice }) => {
  const [details, setDetails] = React.useState<unknown>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/transactions/details/${transaction}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transaction details");
      }

      const data = await response.json();  // Correcting the redundant fetch for json
      const formattedData = data.map(
        ({ id, name, price, quantity }: { id: string | number; name: string; price: number; quantity: number }) => ({
          id,
          name,
          price: Number(price),  // Ensure price is a number
          quantity,
          total: Number(price) * quantity,  // Calculate total
        })
      );

      setDetails(formattedData);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  React.useEffect(() => {
    fetchDetails();
  }, [transaction]);


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[40vh] w-[60vw]">
        <DialogHeader>
          <DialogTitle>Transaction Detail</DialogTitle>
          <DialogDescription>{invoice}</DialogDescription>
        </DialogHeader>
        {/* <DataTable columns={columns} data={details}/> */}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetail;
