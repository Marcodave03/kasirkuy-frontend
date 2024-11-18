"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ProductTransaction = {
  name: string;
  qty: number;
  price: number;
  total: number;
};

export const columns: ColumnDef<ProductTransaction>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "total",
    header: "Total Item Price",
  },
];
