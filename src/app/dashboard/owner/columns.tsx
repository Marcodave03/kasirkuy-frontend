"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";


import { ArrowUpDown } from "lucide-react";

export type Founder = {
  id: string;
  owner: string;
  company: string;
  plans: string;
  status: "paid" | "unpaid"
  total_paid: number;
};

export const columns: ColumnDef<Founder>[] = [
  {
    accessorKey: "owner",
    header: ({ column }) => {
      //sorting
      return (
        <Button
          variant="ghost"
          size="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      //sorting
      return (
        <Button
          variant="ghost"
          size="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "plans",
    header: ({ column }) => {
      //sorting
      return (
        <Button
          variant="ghost"
          size="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plans
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      //sorting
      return (
        <Button
          size="sort"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "total_paid",
    header: ({ column }) => {
      //sorting
      return (
        <Button
          size="sort"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Paid
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
