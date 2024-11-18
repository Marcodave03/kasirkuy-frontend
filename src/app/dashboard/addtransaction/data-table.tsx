import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProductTransaction } from "./columns";
import { X } from "lucide-react"; // Import X icon

type DataTableProps = {
  data: ProductTransaction[];
  onRemoveProduct: (productName: string) => void;
};

export function DataTable({ data, onRemoveProduct }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Product Name</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Total</TableHead>
          <TableHead className="w-[5vw]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{row.name}</TableCell>
            <TableCell className="text-center">{row.qty}</TableCell>
            <TableCell className="text-center">{row.price}</TableCell>
            <TableCell className="text-center">{row.total}</TableCell>
            <TableCell className="text-left">
              <button onClick={() => onRemoveProduct(row.name)}>
                <X size={16} /> {/* X icon for the remove button */}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-center">
            {data.reduce((acc, curr) => acc + Number(curr.total), 0)}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
