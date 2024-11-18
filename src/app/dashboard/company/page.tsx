"use server";

import * as React from "react";
import { Company, columns } from "./columns";
import { DataTable } from "./data-table";
import { BASE_URL } from "@/app/config";

async function getData(): Promise<Company[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/companies/`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const rawData = await response.json(); 
        console.log("Fetched Data:", rawData);

        return rawData.map(({ id, name, duePayment }: { id: string | number; name: string; duePayment: string }) => ({
            id,
            name,
            duePayment,
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export default async function Product() {
    const data = await getData();

    return (
        <div>
            <div className="flex flex-row mb-2 space-x-2 justify-end"></div>
            <div className="border-2 rounded-lg p-2">
                <h2 className="mb-4">Companies</h2>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}
