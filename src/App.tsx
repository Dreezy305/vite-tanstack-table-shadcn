import {
  compareItems,
  FilterFn,
  RankingInfo,
  rankItem,
} from "@tanstack/match-sorter-utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { generatePeople, Person } from "./data/data";

interface FilterFns {
  fuzzy: FilterFn<unknown>;
}
interface FilterMeta {
  itemRank: RankingInfo;
}

function App() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>First Name </span>,
        sortUndefined: "last",
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        sortUndefined: "last",
      },
      {
        accessorKey: "age",
        header: () => "Age",
        sortUndefined: "last",
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        sortUndefined: "last",
      },
      {
        accessorKey: "status",
        header: "Status",
        sortUndefined: "last",
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        sortUndefined: "last",
      },
    ],
    []
  );

  const table = useReactTable({
    data: generatePeople(200),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    // globalFilterFn: "fuzzy",
    state: { sorting, pagination, globalFilter, columnFilters },
    autoResetPageIndex: false,
    enableSorting: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    debugRows: true,
  });

  return (
    <div className="">
      <h1 className="text-red-400 text-3xl text-center">TANSATCK TABLE</h1>
      {/* TABLE UI GOES HERE */}
      <div className="max-w-2xl mx-auto mt-5 flex flex-col space-y-2">
        <div className="">
          <input
            type="text"
            className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out border border-solid font-medium placeholder:font-medium"
            placeholder="search..."
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
          />
        </div>
        <table className="w-full leading-normal shadow-md rounded-lg overflow-hidden">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    key={header.id}
                    // scope="col"
                    className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer`}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>

        <div className="container mx-auto px-4">
          <nav
            className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
            aria-label="Pagination"
          >
            <button
              className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              title="First Page"
              onClick={() => table.firstPage()}
              disabled={!table.getCanNextPage()}
            >
              {"<<"}
            </button>
            <button
              className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              title="Previous Page"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Previous Page</span>
              <svg
                className="block w-4 h-4 fill-current"
                viewBox="0 0 256 512"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
              </svg>
            </button>

            <span className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300">
              {pagination.pageIndex + 1}
            </span>
            <button
              className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              title="Next Page"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Next Page</span>
              <svg
                className="block w-4 h-4 fill-current"
                viewBox="0 0 256 512"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
              </svg>
            </button>
            <button
              className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              title="Last Page"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;

//  https://tanstack.com/table/latest/docs/framework/react/examples/pagination
//  https://tanstack.com/table/latest/docs/framework/react/examples/basic
