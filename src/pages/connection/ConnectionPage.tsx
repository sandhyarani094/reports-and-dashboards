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
    confirmDialog({
      message: `Do you want to delete this Matching Rule ?`,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: () => {
        connectionSerice.delete(rowData.id).then((res) => {
          console.log(res);
          showToaster(
            toastRef,
            "success",
            "Success",
            "Connection Created Successfully"
          );
        });
      },
      reject: () => {
        showToaster(
          toastRef,
          "error",
          "Error",
          "An error occurred while deleting the connection."
        );
      },
    });
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
