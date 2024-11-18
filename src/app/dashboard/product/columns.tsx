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

export type Products = {
  id: string;
  name: string;
  categoryName: string;
  categoryId : number;
  price: BigInteger;
  stock: BigInteger;
  sales: BigInteger;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      //sorting
      return (
        <Button
          variant="ghost"
          size="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      //sorting
      return (
        <Button
          variant="ghost"
          size="sort"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => {
  //     //sorting
  //     return (
  //       <Button
  //         size="sort"
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "sales",
    header: "Total Sales",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex flex-row space-x-4">
          <EditProduct
            productId={product.id}
            productName={product.name}
            categoryName={product.categoryName}
            categoryId={product.categoryId}
            productPrice={product.price.toString()}
            productStock={product.stock.toString()}
          />
          <DeleteAlert
            icon={<Trash2 className="h-6 text-black dark:text-white" />}
            productId={product.id}
          />
        </div>

        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuItem>
        //       <div>
        //         <EditProduct
        //           productId={product.id}
        //           productName={product.name}
        //           productCategory={product.category}
        //           productPrice={product.price.toString()}
        //           productStock={product.stock.toString()}
        //         />
        //       </div>
        //     </DropdownMenuItem>
        //     <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
        //       <div
        //         onClick={(e) => {
        //           e.stopPropagation();
        //         }}
        //       >
        //         <DeleteAlert triggerText="Delete Product" />
        //       </div>
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
  },
];
