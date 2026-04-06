"use client";

import * as React from "react";
import { 
  ColumnDef, 
  ColumnFiltersState,
  flexRender, 
  getCoreRowModel, 
  getPaginationRowModel, 
  getFilteredRowModel,
  useReactTable 
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, RotateCw } from "lucide-react";
import api from "@/lib/axios";
import { CreateProductDialog } from "@/components/admin/CreateProductDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiResponse } from "@/types/auth";

// Product Type matching Backend Response
export type Product = {
  id: string; // UUID is string
  name: string;
  categoryName: string; // Backend returns categoryName
  basePrice: number;
  stock?: number; // Might be missing in list view
  image?: string; // Might be missing
};

// Fetch Function
type Page<T> = {
  content: T[];
};

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<ApiResponse<Page<Product>>>("/products");
  return data.data.content;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: () => {
      // Placeholder for now as backend doesn't return image yet
      return <div className="h-10 w-10 rounded-md bg-muted border" />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "categoryName", // Mapped from backend
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("categoryName") || "Uncategorized"}</div>,
  },
  {
    accessorKey: "basePrice",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("basePrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Product</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete Product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ProductsPage() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // React Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  if (isError) {
      return (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-red-500">
              <p>Failed to load products.</p>
              <Button variant="outline" onClick={() => refetch()} className="gap-2">
                  <RotateCw className="h-4 w-4"/> Retry
              </Button>
          </div>
      )
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Products {data && `(${data.length})`}</h1>
        <CreateProductDialog />
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
                // Skeleton Loading State
                Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell><Skeleton className="h-10 w-10 rounded-md" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                    </TableRow>
                ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
