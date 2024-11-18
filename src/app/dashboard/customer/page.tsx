"use server";

import * as React from "react";
import { Customer, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Customer[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Marco Davincent Dermawan",
      email: "marco.dermawan@example.com",
      birthdate: "2003-06-29",
      phone: "+62 812-3456-7890",
      gender: "male",
    },
    {
      id: "2",
      name: "Felicia Tan",
      email: "felicia.tan@example.com",
      birthdate: "2002-11-15",
      phone: "+62 813-2345-6789",
      gender: "female",
    },
    {
      id: "3",
      name: "Bryan Gunawan",
      email: "bryan.gunawan@example.com",
      birthdate: "2001-08-20",
      phone: "+62 811-2233-4455",
      gender: "male",
    },
    {
      id: "4",
      name: "Cindy Wijaya",
      email: "cindy.wijaya@example.com",
      birthdate: "1999-04-22",
      phone: "+62 815-1234-5678",
      gender: "female",
    },
    {
      id: "5",
      name: "Jonathan Pratama",
      email: "jonathan.pratama@example.com",
      birthdate: "2000-09-13",
      phone: "+62 817-1122-3344",
      gender: "male",
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
