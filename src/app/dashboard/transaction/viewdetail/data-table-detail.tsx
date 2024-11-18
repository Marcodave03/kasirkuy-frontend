import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";

type ProductTransaction = {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

type DataTableProps<TData extends ProductTransaction> = {
  columns: ColumnDef<TData>[];
  data: TData[];
};

export function DataTable<TData extends ProductTransaction>({
  columns,
  data,
}: DataTableProps<TData>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
        {columns.map((column, index) => (
          <TableHead key={index} className="text-center">
            {column.header
              ? typeof column.header === "function" 
              : column.header
              } 
          </TableHead>
        ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{row.name}</TableCell>
            <TableCell className="text-center">{row.quantity}</TableCell>
            <TableCell className="text-center">{row.price}</TableCell>
            <TableCell className="text-center">{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-center">
            {data.reduce((acc, curr) => acc + Number(curr.total), 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
