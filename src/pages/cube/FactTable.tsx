import { Factdetails } from "@/shared/constants/models/Cube";
import { ColumnMetaData, TableMetaData } from "@/shared/constants/models/TableMetaData";
import { getErrorMessageOnValidation, isFormFieldInvalid } from "@/shared/constants/services/utilService";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Fieldset } from "primereact/fieldset";
import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import { useState } from "react";
import * as Yup from 'yup';

interface FactTableProps {
  onNext: Function;
}
const FactTable: React.FC<FactTableProps> = ({ onNext }) => {
  const tables = [
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

  const tablesDataGrid = [{ field: "name", header: "Select any Table" }];
  const columnsDataGrid = [{ field: "columnName", header: "Select any Column" }];

  const factDetailsValidationSchema = Yup.object().shape({
    factTables: Yup
    .array()
    .min(1, 'Select at least one value.'),
    factColumns: Yup
    .array()
    .min(1, 'Select at least one value.') 
    
  })

  function handleSave(values: Factdetails, formikHelpers: FormikHelpers<Factdetails>) {
    formikHelpers.resetForm();
    onNext();
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
        {({ values, errors, touched, handleChange, handleReset, setFieldValue }) => (
          <Form>
            <div className="grid">
              <div className="col-6">
                <Fieldset legend="Fact Table Details" className="p-0" style={{ minHeight: '26rem' }}>
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
                        handleChange(e);
                        if (e.value.length === 0) {
                          setFieldValue("selectedFactTable", [])
                          setFieldValue("factColumns", []);
                          setFieldValue("selectedFactColumn", []);
                        }
                      }}
                      optionLabel="name"
                      display="chip"
                      placeholder="Select Tables"
                    />
                    <div>{getErrorMessageOnValidation(errors, touched, 'factTables')}</div>
                  </div>
                  {values.factTables.length > 0 ?
                    <div className="col-12">
                      <DataTable
                        value={values.factTables}
                        dataKey="name"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        scrollable={true}
                        scrollHeight={"10rem"}
                        metaKeySelection={true}
                        selectionMode="multiple"
                        selection={values.selectedFactTable}
                        onSelectionChange={(e) => {
                          if (values.factTables.length > 0) {
                            setFieldValue("selectedFactTable", e.value)
                            setFieldValue("factColumns", []);
                            setFieldValue("selectedFactColumn", []);
                          } else {
                            setFieldValue("factColumns", []);
                            setFieldValue("selectedFactTable", [])
                          }
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
                    <div className="col-12 grid justify-content-center align-content-center h-16rem p-5">
                      <div className="bg-indigo-50" style={{ borderRadius: 'var(--border-radius)', padding: '3rem', color: "grey" }}>
                        Please select atleast one table
                      </div>
                    </div>
                  }
                </Fieldset>
              </div>
              <div className="col-6">
                <Fieldset legend="Fact Column Details" className="pb-0" style={{ minHeight: '26rem' }} >
                  <div className="col-12">
                    <MultiSelect
                      name="factColumns"
                      style={{ maxWidth: '21rem' }}
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
                          ? (values.selectedFactTable[0]?.columns)
                          : [{ columnName: "Please Select a table from the list", disabled: true }]
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
                    <div>{getErrorMessageOnValidation(errors, touched, 'factColumns')}</div>
                  </div>
                  {values.factColumns.length > 0 ?
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
                    <div className="col-12 grid justify-content-center align-content-center h-16rem p-5">
                      <div className="bg-indigo-50" style={{ borderRadius: 'var(--border-radius)', padding: '3rem', color: "grey" }}>
                        Please select atleast one column
                      </div>
                    </div>}
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FactTable;
