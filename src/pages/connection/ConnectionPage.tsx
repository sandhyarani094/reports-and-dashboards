"use client"
import { RouterPath } from '@/shared/constants/router';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
const ConnectionPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columns, setColumns] = useState([
    { field: 'Database 1', header: 'ID' },
    { field: 'API 1', header: 'Connection Name' },
    { field: 'File 1', header: 'Type' }
  ]);

  const dataTableHeader = () => {
    return (
      <div className="grid">
        <div className="col-9">
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
            className="w-full"
            style={{ width: "3rem", marginRight: "65mm" }}
          />
        </div>
        <div className={'col-3 text-right'}>
          <Link href={{ pathname: RouterPath.CREATE_CONNECTION }}>
            <Button
              icon="pi pi-plus"
              className="w-full"
              label="Create Connection"
            />
          </Link>
        </div>

      </div>
    );
  };




  return (
    <div >
      {dataTableHeader()}
      <div className="grid">
        <div className="col-12">
          <DataTable value={columns}
          >
            {columns.map((column, index) => {
              return (
                <Column key={index} field={column.field} header={column.header} />
              )
            })}
            {/* <Column field="id" header="ID" />
        <Column field="connectionName" header="Connection Name" />
        <Column field="type" header="Type" /> */}
          </DataTable>
        </div>
      </div>

    </div>
  )
}

export default ConnectionPage;