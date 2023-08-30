"use client"
import { RouterPath } from '@/shared/constants/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
const ConnectionPage = () => {

  const [data, setData] = useState([]);
  const router = useRouter();


  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    { field: 'connectionName', header: 'Connection Name' },
    { field: 'driverType', header: 'Driver Type' },
    {field:'action' , header:'Action'}
  ];

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem('connections') || '[]');
    setData(storedData);
  }, []);




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

  const handleEdit = (rowData: any) => {
    // Navigate to Create Connection page with rowData as query parameter
    router.push({
      pathname: RouterPath.CREATE_CONNECTION,
      query: { editData: JSON.stringify(rowData) },
    });
  };



  return (
    <div>
      {dataTableHeader()}
      <div className="grid">
        <div className="col-12">
          <DataTable value={data} 
            globalFilter={globalFilter}>
            {columns.map((column, index) => (
              <Column 
                key={index} 
                field={column.field} 
                header={column.header} 
                body={
                  column.field === 'action'
                    ? (rowData) => (
                        <div>
                          <i
                          
                            className="pi pi-pencil mr-2" 
                            style={{color:'slateblue'}}
                            onClick={() => handleEdit(rowData)}
                          />
                          <i
                            className="pi pi-trash p-button-danger"
                            style={{color:'red'}}
                            // onClick={() => handleDelete(rowData)}
                          />
                        </div>
                      )
                    : (rowData) => rowData[column.field]
                }
              />
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};


export default ConnectionPage;