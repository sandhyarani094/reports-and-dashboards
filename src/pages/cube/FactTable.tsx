import { CubeContext } from "@/common-layouts/context/cubeContext";
import { CubeDetails, Factdetails } from "@/shared/constants/models/Cube";
import {
  ColumnMetaData,
  TableMetaData,
} from "@/shared/constants/models/TableMetaData";
import {
  getErrorMessageOnValidation,
  isFormFieldInvalid,
} from "@/shared/constants/services/UtilService";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Fieldset } from "primereact/fieldset";
import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Dialog } from "primereact/dialog";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { table } from "console";
import { CubeService } from "@/httpServices/CubeService";

interface FactTableProps {
  setActiveIndex: Function;
  activeIndex: number;
  tables: TableMetaData[];
  setTables: Function;
  dataSourceDetails: CubeDetails;
}
const FactTable: React.FC<FactTableProps> = ({
  activeIndex,
  setActiveIndex,
  tables,
  setTables,
  dataSourceDetails,
}) => {
  const tablesArray = [
    {
      name: "Account",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
    {
      name: "Pricebook",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
    {
      name: "Lead",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
    {
      name: "Student",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
    {
      name: "Department",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
  ];
  const cubeService = new CubeService();

  useEffect(() => {
    findAllTables();
  }, []);

  const findAllTables = () => {
    cubeService
      .getAllTablesByConnection(dataSourceDetails?.connectionId)
      .then((res) => {
        setTables(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tablesDataGrid = [{ field: "tableName", header: "Select any Table" }];
  const columnsDataGrid = [
    { field: "columnName", header: "Select any Column" },
  ];
  const [selectedFactTables, setSelectedFactTables] = useState<TableMetaData[]>(
    []
  );
  const columns = [{ field: "tableName", header: "TableName" }];

  const factDetailsValidationSchema = Yup.object().shape({
    factTables: Yup.array().min(1, "Select at least one value."),
    factColumns: Yup.array().min(1, "Select at least one value."),
  });
  const [showFactTableModal, setFactTableShowShowModal] = useState(false);
  const [showFactColumnModal, setFactColumnModal] = useState(false);

  const closeModal = () => {
    setFactTableShowShowModal(false);
  };

  function handleSave(
    values: Factdetails,
    formikHelpers: FormikHelpers<Factdetails>
  ) {
    formikHelpers.resetForm();
    setActiveIndex(activeIndex + 1);
  }

  const closeFactColumnModal = () =>{
    setFactColumnModal(false);
  }

  const saveTables = () => {
    console.log(selectedFactTables);
    closeModal();
  };

  const saveColumn = () =>{
    closeFactColumnModal();
  }

  return (
    <>
      <Formik
        initialValues={new Factdetails()}
        onSubmit={(values, formikHelpers) => {
          handleSave(values, formikHelpers); // Always call handleSave for new data
        }}
        enableReinitialize={true}
        validationSchema={factDetailsValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleReset,
          setFieldValue,
        }) => (
          <Form>
            <div className="grid">
              <div className="col-6">
                <Fieldset
                  legend="Fact Table Details"
                  className="p-0"
                  style={{ minHeight: "26rem" }}
                >
                  <div className="col-12 text-right">
                    <Button
                      icon="pi pi-plus"
                      onClick={() => setFactTableShowShowModal(true)}
                      outlined
                    />
                  </div>
                  {values.factTables.length > 0 ? (
                    <div className="col-12">
                      <DataTable
                        value={values.factTables}
                        dataKey="tableName"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        scrollable={true}
                        scrollHeight={"10rem"}
                        metaKeySelection={true}
                        selectionMode={"multiple"}
                        selection={values.selectedFactTable}
                        onSelectionChange={(e) => {
                          if (values.factTables.length > 0) {
                            setFieldValue("selectedFactTable", e.value);
                            // setFieldValue("factColumns", []);
                            // setFieldValue("selectedFactColumn", []);
                          } else {
                            // setFieldValue("factColumns", []);
                            // setFieldValue("selectedFactTable", [])
                          }
                        }}
                      >
                        {tablesDataGrid.map((column, index) => (
                          <Column
                            key={index}
                            header={column.header}
                            field={column.field}
                            body={(rowData) =>
                              column.field
                                .split(".")
                                .reduce((prev, current) => {
                                  let ele;
                                  if (prev) {
                                    ele = prev[current];
                                  }
                                  return ele;
                                }, rowData)
                            }
                          />
                        ))}
                      </DataTable>
                    </div>
                  ) : (
                    <div className="col-12 grid justify-content-center align-content-center h-16rem p-5">
                      <div
                        className="bg-indigo-50"
                        style={{
                          borderRadius: "var(--border-radius)",
                          padding: "3rem",
                          color: "grey",
                        }}
                      >
                        Please select atleast one table
                      </div>
                    </div>
                  )}
                </Fieldset>
              </div>
              <div className="col-6">
                <Fieldset
                  legend="Fact Column Details"
                  className="pb-0"
                  style={{ minHeight: "26rem" }}
                >
                  {/* <div className="col-12">
                    <MultiSelect
                      name="factColumns"
                      style={{ maxWidth: "21rem" }}
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.factColumns,
                          touched.factColumns
                        ),
                      })}
                      filter
                      filterInputAutoFocus={false}
                      options={
                        values.selectedFactTable.length > 0
                          ? values.selectedFactTable[0]?.columns
                          : [
                              {
                                columnName:
                                  "Please Select a table from the list",
                                disabled: true,
                              },
                            ]
                      }
                      value={values.factColumns}
                      onChange={(e) => {
                        handleChange(e);
                        if (e.value.length === 0) {
                          setFieldValue("selectedFactColumn", []);
                        }
                      }}
                      optionLabel="columnName"
                      display="chip"
                      placeholder="Select columns"
                    />
                    <div>
                      {getErrorMessageOnValidation(
                        errors,
                        touched,
                        "factColumns"
                      )}
                    </div>
                  </div> */}

<div className="col-12 text-right">
                    <Button
                      icon="pi pi-plus"
                      onClick={() => setFactColumnModal(true)}
                      outlined
                    />
                  </div>


                  {values.factColumns.length > 0 ? (
                    <div className="col-12">
                      <DataTable
                        value={values.factColumns}
                        dataKey="columnName"
                        metaKeySelection={true}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        scrollable={true}
                        scrollHeight={"10rem"}
                        selectionMode="multiple"
                        selection={values.selectedFactColumn}
                        onSelectionChange={(e) => {
                          if (values.factColumns.length > 0) {
                            setFieldValue("selectedFactColumn", e.value);
                          } else {
                            setFieldValue("selectedFactColumn", []);
                          }
                        }}
                      >
                        
                        {columnsDataGrid.map((column, index) => (
                          <Column
                            key={index}
                            header={column.header}
                            field={column.field}
                            body={(rowData) =>
                              column.field
                                .split(".")
                                .reduce((prev, current) => {
                                  let ele;
                                  if (prev) {
                                    ele = prev[current];
                                  }
                                  return ele;
                                }, rowData)
                            }
                          />
                        ))}
                      </DataTable>
                    </div>
                  ) : (
                    <div className="col-12 grid justify-content-center align-content-center h-16rem p-5">
                      <div
                        className="bg-indigo-50"
                        style={{
                          borderRadius: "var(--border-radius)",
                          padding: "3rem",
                          color: "grey",
                        }}
                      >
                        Please select atleast one column
                      </div>
                    </div>
                  )}
                </Fieldset>
              </div>
            </div>
            <div className="col-12 text-right">
              <Button
                label="Save and Next"
                type="submit"
                className="ml-2"
                size="small"
              />
            </div>
            <Dialog
              visible={showFactTableModal}
              onHide={closeModal}
              header="Table Selection"
            >             
                <DataTable
                  value={tables}
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  scrollable={true}
                  scrollHeight={"18rem"}
                  selectionMode={"checkbox"}
                  selection={values.factTables}
                  onSelectionChange={(e) => setFieldValue("factTables", e.value)}
                  dataKey="tableName"
                  tableStyle={{ minWidth: "10rem" }}
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                  ></Column>
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
                                />
                                <i
                                  className="pi pi-trash p-button-danger"
                                  style={{ color: "red" }}
                                />
                              </div>
                            )
                          : (rowData) => rowData[column.field]
                      }
                    />
                  ))}
                </DataTable>
                <div className="p-mt-2 text-right" >
                  <Button label="Apply" type="button" onClick={saveTables} />
                </div>
             
            </Dialog>

            <Dialog
              visible={showFactColumnModal}
              onHide={closeFactColumnModal}
              header="Column Selection"
            >             
                <DataTable
                  value={values.selectedFactTable[0]?.columns}
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  scrollable={true}
                  scrollHeight={"18rem"}
                  selectionMode={"checkbox"}
                  selection={values.factColumns}
                  onSelectionChange={(e) => setFieldValue("factColumns", e.value)}
                  dataKey="columnName"
                  tableStyle={{ minWidth: "10rem" }}
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                  ></Column>
                  {columnsDataGrid.map((column, index) => (
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
                                />
                                <i
                                  className="pi pi-trash p-button-danger"
                                  style={{ color: "red" }}
                                />
                              </div>
                            )
                          : (rowData) => rowData[column.field]
                      }
                    />
                  ))}
                </DataTable>
                <div className="p-mt-2 text-right" >
                  <Button label="Apply" type="button" onClick={saveColumn} />
                </div>
             
            </Dialog>

          </Form>
        )}
      </Formik>
    </>
  );
};

export default FactTable;
