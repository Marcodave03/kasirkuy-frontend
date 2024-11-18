// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
//   } from "@/components/ui/pagination"
  
//   export function PaginationButton() {
//     return (
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious href="#" />
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">1</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#" isActive>
//               2
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">3</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationEllipsis />
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationNext href="#" />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     )
//   }
  

//   <div>
//   <Button
//     variant="outline"
//     size="sm"
//     onClick={() => table.previousPage()}
//     disabled={!table.getCanPreviousPage()}
//   >
//     Previous
//   </Button>
//   <Button
//     variant="outline"
//     size="sm"
//     onClick={() => table.nextPage()}
//     disabled={!table.getCanNextPage()}
//   >
//     Next
//   </Button>
// </div>
// <div>
//   <span>
//     Page{" "}
//     <strong>
//       {table.getState().pagination.pageIndex + 1} of{" "}
//       {table.getPageCount()}
//     </strong>
//   </span>
// </div>

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
  } from "@/components/ui/pagination";
  
  interface PaginationButtonProps {
    pageIndex: number;
    pageCount: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
    previousPage: () => void;
    nextPage: () => void;
    setPageIndex: (index: number) => void;
  }
  
  export function PaginationButton({
    pageIndex,
    pageCount,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageIndex,
  }: PaginationButtonProps) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {canPreviousPage ? (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  previousPage();
                }}
              >
                Previous
              </PaginationLink>
            ) : (
              <span className="text-gray-400 cursor-not-allowed">Previous</span>
            )}
          </PaginationItem>
  
          {Array.from({ length: pageCount }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={pageIndex === index}
                onClick={(e) => {
                  e.preventDefault();
                  setPageIndex(index);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
  
          <PaginationItem>
            {canNextPage ? (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nextPage();
                }}
              >
                Next
              </PaginationLink>
            ) : (
              <span className="text-gray-400 cursor-not-allowed">Next</span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
  