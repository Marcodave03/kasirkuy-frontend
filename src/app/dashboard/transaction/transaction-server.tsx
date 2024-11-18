import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"
import AddTransactionBtn from "@/components/AddTransactionBtn"
import { ExportButtonPdf, ExportButtonExcel } from "@/components/ExportButton"

export default function TransactionServer({ data, companyId }: { data: Transaction[], companyId: string }) {
  const totalSales = data.reduce((acc, transaction) => acc + Number(transaction.totalPrice), 0)
  const formattedTotalSales = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(totalSales)

  return (
    <div>
      <div className="flex flex-row mb-2 justify-center"></div>
      <div className="border-2 rounded-lg p-2">
        <div className="flex flex-wrap justify-between items-center">
          <h1 className="mb-2 text-lg mt-2 ml-2">Total Sales: {formattedTotalSales}</h1>
          <div className="flex flex-wrap">
            <div className="mb-2 mr-2">
              <AddTransactionBtn />
            </div>
            <div className="space-x-2">
              <ExportButtonExcel companyId={companyId} />
              <ExportButtonPdf companyId={companyId} />
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}