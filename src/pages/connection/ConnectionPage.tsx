import { RouterPath } from "@/shared/constants/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { showToaster } from "@/shared/constants/services/ToastService";
import React, { useEffect, useState, useContext } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import { ToastContext } from "@/common-layouts/context/toasterContext";
import { ConnectionService } from "@/HttpServices/ConnectionService";
const ConnectionPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { toastRef } = useContext(ToastContext);
  const connectionSerice = new ConnectionService();
  const [globalFilter, setGlobalFilter] = useState("");
  const [connectionDatas, setConnectionDatas] = useState([]);
  const columns = [
    { field: "connectionName", header: "Connection Name" },
    { field: "dbType", header: "Driver Type" },
    { field: "action", header: "Action" },
  ];

  useEffect(() => {
    findAllConnection();
  }, []);

  const findAllConnection = () => {
    connectionSerice
      .getAll()
      .then((res) => {
        setConnectionDatas(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <div className={"col-3 text-right"}>
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

  const handleEditClick = (rowData: any) => {
    router.push({
      pathname: RouterPath.CREATE_CONNECTION,
      query: { editId: rowData.id },
    });
  };

  const handleDelete = (rowData: any) => {
    showToaster(
      toastRef,
      "warn",
      "Warning!",
      (
        <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
          <div className="text-center">
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '2rem' }}></i>
            <div className="font-bold text-xl my-3">Are you sure to remove <b>{rowData.connectionName}</b>?</div>
          </div>
          <div className="flex gap-2">
            <Button onClick={(e) => deleteEvent(rowData.id)} type="button" label="Confirm" className="p-button-success w-7rem" />
            <Button onClick={(e) => toastRef.current.clear()} type="button" label="Cancel" className="p-button-warning w-5rem" />
          </div>
        </div>
      )
    );

    const deleteEvent = (rowDataId) =>{
      connectionSerice.delete(rowDataId).then((res) => {
        console.log(res);
        showToaster(
          toastRef,
          "success",
          "Success",
          "Connection Removed"
        );
      });
    }

  };

  return (
    <div>
      {dataTableHeader()}
      <div className="grid">
        <div className="col-12">
          <DataTable
            value={connectionDatas}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollable={true}
            scrollHeight={"20rem"}
            globalFilter={globalFilter}
          >
            {columns.map((column, index) => (
              <Column
                key={index}
                field={column.field}
                header={column.header}
                body={
                  column.field === "action"
                    ? (rowData) => (
                        <div>
                          <i
                            className="pi pi-pencil mr-4"
                            style={{ color: "slateblue" }}
                            onClick={() => handleEditClick(rowData)}
                          />
                          <i
                            className="pi pi-trash p-button-danger"
                            style={{ color: "red" }}
                            onClick={() => handleDelete(rowData)}
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
