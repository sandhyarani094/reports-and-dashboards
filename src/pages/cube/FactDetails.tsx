import { CubeDetails, Factdetails } from "@/shared/constants/models/Cube";
import {
  TableMetaData,
} from "@/shared/constants/models/TableMetaData";

import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Fieldset } from "primereact/fieldset";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { isFormFieldInvalid, getErrorMessageOnValidation } from "@/shared/constants/services/UtilService";

interface FactTableProps {
  setActiveIndex: Function;
  activeIndex: number;
  tables: TableMetaData[];
  setTables: Function;
  dataSourceDetails: CubeDetails;
  factDetails: Factdetails,
  setFactdetails: Function;
}
const FactDetails: React.FC<FactTableProps> = ({
  activeIndex,
  setActiveIndex,
  tables,
  setTables,
  dataSourceDetails, factDetails, setFactdetails
}) => {

  const tablesDataGrid = [{ field: "tableName", header: "Tables" }];
  const columnsDataGrid = [
    { field: "columnName", header: "Columns" },
    { field: "aliasName", header: "AliasName" }
  ];
  const factDetailsValidationSchema = Yup.object().shape({
    factTables: Yup.array().min(2, "Select at least two tables."),
    factColumns: Yup.array().min(1, "Select at least one table."),
  });

  const handleSave = (values: Factdetails, formikHelpers: FormikHelpers<Factdetails>) => {
    setFactdetails(values);
    setActiveIndex(activeIndex + 1);
  }

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    rowData[field] = newValue;
  }

  return (
    <>
      <Formik
        initialValues={factDetails}
        onSubmit={(values, formikHelpers) => {
          handleSave(values, formikHelpers);
        }}
        enableReinitialize={true}
        validationSchema={factDetailsValidationSchema}
      >
        {({
          values,
          setValues,
          errors,
          touched,
          handleChange,
          handleReset,
          setFieldValue,
        }) => (
          <Form>
            <div className="grid">
              <div className="col-6">
                <Fieldset legend="Fact Table Details" className="p-0" style={{ minHeight: '35rem' }}>
                  <div className="col-12">
                    <MultiSelect
                      name="factTables"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.factTables,
                          touched.factTables
                        ),
                      })}
                      style={{ maxWidth: '21rem' }}
                      filter
                      filterInputAutoFocus={false}
                      options={tables}
                      value={values.factTables}
                      onChange={(e) => {
                        let currentTables = e.target.value;
                        let newMap: any = {};
                        for (let currentTable of currentTables) {
                          let tableName = currentTable.tableName;
                          newMap[tableName] = (factDetails.selectedFactTables[tableName] || []).map(e => {
                            return e;
                          });
                        }

                        let oldKeys = Object.keys(factDetails.selectedFactTables);
                        let newKeys = Object.keys(newMap);

                        for(let key of oldKeys) {
                          if(!newKeys.find(v => v == key)) {
                            tables.find(v => v.tableName = key)?.columns.map(v => v.aliasName = "");
                          }
                        }

                        factDetails.selectedFactTables = { ...newMap };
                        setFieldValue("selectedFactTables", factDetails.selectedFactTables);
                        let resetSelectedTableColumns = Object.keys(factDetails.selectedFactTables).find(e => e == factDetails.selectedFactTable.tableName);
                        if (!resetSelectedTableColumns) {
                          setFieldValue("selectedFactTable", new TableMetaData());
                        }
                        handleChange(e);
                      }}
                      optionLabel="tableName"
                      display="chip"
                      placeholder="Select Tables"
                    />
                    <div>{getErrorMessageOnValidation(errors, touched, 'factTables')}</div>
                  </div>
                  {values.factTables.length > 0 ?
                    <div className="col-12">
                      <DataTable
                        value={values.factTables}
                        dataKey="tableName"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        scrollable={true}
                        scrollHeight={"18rem"}
                        metaKeySelection={true}
                        selectionMode="single"
                        selection={values.selectedFactTable}
                        onSelectionChange={(e) => {
                          setFieldValue("selectedFactTable", e.value);
                        }}
                      >
                        {tablesDataGrid.map((column, index) => (
                          <Column
                            key={index}
                            header={column.header}
                            field={column.field}
                            body={(rowData) => column.field.split(".").reduce((prev, current) => {
                              let ele;
                              if (prev) {
                                ele = prev[current];
                              }
                              return ele;
                            }, rowData)}
                          />
                        ))}
                      </DataTable>
                    </div> :
                    <div className="col-12 grid justify-content-center align-content-center h-18rem p-5">
                      <div className="bg-indigo-50" style={{ borderRadius: 'var(--border-radius)', padding: '3rem', color: "grey" }}>
                        Please select atleast two tables
                      </div>
                    </div>
                  }
                </Fieldset>
              </div>
              <div className="col-6">
                <Fieldset legend="Fact Column Details" className="pb-0" style={{ minHeight: '35rem' }} >
                  <div className="col-12">
                    <div>{getErrorMessageOnValidation(errors, touched, 'factColumns')}</div>
                  </div>
                  {(values.factTables.length > 0) && (values.selectedFactTable.tableName) ?
                    <div className="col-12">
                      <DataTable
                        value={values.selectedFactTable?.columns}
                        dataKey="columnName"
                        metaKeySelection={true}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        scrollable={true}
                        scrollHeight={"18rem"}
                        selectionMode={null}
                        selection={values.selectedFactTables[values.selectedFactTable.tableName]}
                        onSelectionChange={(e) => {
                          values.selectedFactTables[values.selectedFactTable.tableName] = e.value;
                          setFieldValue("selectedFactTables", values.selectedFactTables);
                        }}
                      >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        {columnsDataGrid.map((column, index) => {
                          if (column.field != 'aliasName') {
                            return <Column
                              key={index}
                              header={column.header}
                              field={column.field}
                              body={(rowData) => {
                                return (
                                  column.field.split(".").reduce((prev, current) => {
                                    let ele;
                                    if (prev) {
                                      ele = prev[current];
                                    }
                                    return ele;
                                  }, rowData)
                                )
                              }}
                            />
                          } else {
                            return (<Column
                              key={index}
                              header={column.header}
                              field={column.field}
                              editor={(options) => column.field == 'aliasName' ? textEditor(options) : null}
                              onCellEditComplete={(e) => {
                                if (column.field === 'aliasName') {
                                  onCellEditComplete(e);
                                }
                              }}
                            />
                            )
                          }
                        })
                        }
                      </DataTable>
                    </div> :
                    <div className="col-12 grid justify-content-center align-content-center h-23rem p-5">
                      <div className="bg-indigo-50" style={{ borderRadius: 'var(--border-radius)', padding: '3rem', color: "grey" }}>
                        Please select atleast one Table
                      </div>
                    </div>}
                </Fieldset>
              </div>
            </div>
            <div className="col-6 inline-block">
              <Button
                size="small"
                label="Back"
                icon="pi pi-angle-left"
                type="button"
                className="mr-2"
                onClick={() => setActiveIndex(activeIndex - 1)}
                outlined
              />
            </div>
            <div className="col-6 inline-block text-right">
              <Button
                label="Save and Next"
                type="submit"
                className="ml-2"
                size="small"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FactDetails;
