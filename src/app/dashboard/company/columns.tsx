"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";


import { ArrowUpDown } from "lucide-react";

export type Company = {
  id: string | number;
  name: string;
  duePayment: string;
};

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
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
    accessorKey: "duePayment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
