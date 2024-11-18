"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   // DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";

import { ArrowUpDown } from "lucide-react";

import DeleteAlert from "@/components/deleteProduct";
import EditProduct from "@/components/editProduct";

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
