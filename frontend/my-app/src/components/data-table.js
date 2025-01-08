import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { viewTransactions, approveTransaction } from "@/actions"; // Adjust the import path

export function DataTable({ guardianId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await viewTransactions(guardianId);
        setTransactions(data);
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [guardianId]); // Fetch again if the guardianId changes

  // Approve or reject transaction handler
  const handleApproveTransaction = async (transactionId, approve) => {
    try {
      const result = await approveTransaction(transactionId, approve);
      setTransactions((prev) =>
        prev.map((txn) =>
          txn.id === transactionId
            ? { ...txn, status: approve ? "Done" : "Canceled" }
            : txn
        )
      );
    } catch (err) {
      console.error("Transaction approval failed", err);
    }
  };

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-full text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center w-[50px]">#</TableHead>
            <TableHead className="text-right">AMOUNT (KWD)</TableHead>
            <TableHead className="text-left">FROM</TableHead>
            <TableHead className="text-left">TO</TableHead>
            <TableHead className="text-left">DATE</TableHead>
            <TableHead className="text-center">STATUS</TableHead>
            <TableHead className="text-center">APPROVAL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                No transactions available.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((item) => (
              <TableRow key={item.transactionId} className="border-b">
                <TableCell className="text-center">
                  {item.transactionId}
                </TableCell>
                <TableCell className="text-center">{item.amount}</TableCell>
                <TableCell className="text-left">{item.sentFromUser}</TableCell>
                <TableCell className="text-left">{item.sentToUser}</TableCell>
                <TableCell className="text-left">
                  {item.dateTime.split("T")[0]}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                      item.status === "In progress"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleApproveTransaction(item.id, true)}
                      className="text-gray-400 hover:text-green-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproveTransaction(item.id, false)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Reject
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
