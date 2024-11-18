"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ArrowUpDown, ListCollapse } from "lucide-react";
import ViewDetail from "./viewdetail/viewdetail";
import ViewPayment from "./viewdetail/viewpayment";

export type TimeRanges = {
  start: string;
  end: string;
};

export type Transaction = {
  id: string;
  invoice: string;
  date: string;
  custName: string;
  custPhone: string;
  totalPrice: BigInteger;
  paymentProofUrl: string;
};

export const columns: ColumnDef<Transaction>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     //sorting
  //     return (
  //       <Button
  //         variant="ghost"
  //         size="sort"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ID
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
        variant="ghost"
        size="sort"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "invoice",
    header: ({ }) => {
      return (
        <>
          Invoice
        </>
        
      );
    },
  },
  {
    accessorKey: "custName",
    header: ({ }) => {
      return (
        <>Customer Name</>
      );
    },
  },
  {
    accessorKey: "custPhone",
    header: ({ }) => {
      return (
        <>
        Customer Phone
        </>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ }) => {
      return (
        <>
          Total Price
        </>
      );
    },
  },
  
  {
    id: "actions",
    header :() => {
      return (
        <ListCollapse></ListCollapse>
      )
    },
    cell: ({ row }) => {
      const transaction = row.original;
      
      return (
        <div className="flex flex-row space-x-4">
          <ViewDetail transaction={transaction.id} invoice = {transaction.invoice} />
        </div>
      );
    },
  },
  {
    header:"PaymentProof",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="flex flex-row space-x-4">
          <ViewPayment id = {transaction.id} invoice = {transaction.invoice}/>
        </div>
      );  
    },
  },
];
