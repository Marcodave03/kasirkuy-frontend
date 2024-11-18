"use server";

import * as React from "react";
import { Founder, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Founder[]> {
  // Fetch data from your API here.
  return [
    {
        id: "1",
        owner: "Alice Johnson",
        company: "Tech Innovations Inc.",
        plans: "Premium Plan",
        status: "paid",
        total_paid: 1500,
      },
      {
        id: "2",
        owner: "Bob Smith",
        company: "Green Solutions Ltd.",
        plans: "Basic Plan",
        status: "unpaid",
        total_paid: 0,
      },
      {
        id: "3",
        owner: "Charlie Brown",
        company: "Healthy Eats Co.",
        plans: "Pro Plan",
        status: "paid",
        total_paid: 3000,
      },
      {
        id: "4",
        owner: "Dana White",
        company: "Innovative Apps LLC",
        plans: "Basic Plan",
        status: "paid",
        total_paid: 600,
      },
      {
        id: "5",
        owner: "Eve Davis",
        company: "Smart Home Tech",
        plans: "Free Plan",
        status: "unpaid",
        total_paid: 0,
      },
      {
        id: "6",
        owner: "Frank Miller",
        company: "Travel Ventures",
        plans: "Premium Plan",
        status: "paid",
        total_paid: 2000,
      },
  ];
}

export default async function Product() {
  const data = await getData();
  return (
    <div>
      <div className="flex flex-row mb-2 space-x-2 justify-end"></div>
      <div className="border-2 rounded-lg p-2">
        <h2 className="mb-4"></h2>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
