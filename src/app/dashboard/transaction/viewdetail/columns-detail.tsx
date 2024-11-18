"use client";

import { ColumnDef } from "@tanstack/react-table";
export type ProductTransaction = {
  name: string;
  qty: number;
  price: BigInteger;
  total: BigInteger;
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
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total Price",
  },
];
