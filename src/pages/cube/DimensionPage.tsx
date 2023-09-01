import { Dropdown } from "primereact/dropdown";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Formik, Form, FormikHelpers } from "formik";
import { FactMappingData } from "@/shared/constants/models/Cube";
import * as Yup from 'yup';
import { getErrorMessageOnValidation, isFormFieldInvalid } from "@/shared/constants/services/utilService";
import { classNames } from "primereact/utils";
import { ColumnMetaData, TableMetaData } from "@/shared/constants/models/TableMetaData";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

interface DimensionPageProps {
  setActiveIndex: Function;
  activeIndex: number;
}
const DimensionPage: React.FC<DimensionPageProps> = ({
  setActiveIndex,
  activeIndex,
}) => {
  const [factTableMappingData, setFactTableMappingData] = useState<FactMappingData>(new FactMappingData());
  const [factTableMappingArray, setFactTableMappingArray] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const factMappingValidationSchema = Yup.object().shape({
    sourceTable: Yup.object<TableMetaData>().shape({
      tableName: Yup.string().required('Required'),
    }),
    relationOption: Yup.string().required('Required'),
    destinationTable: Yup.object<TableMetaData>().shape({
      tableName: Yup.string().required('Required'),
    }),
    sourceColumn: Yup.object<ColumnMetaData>().shape({
      columnName: Yup.string().required('Required'),
    }),
    destinationColumn: Yup.object<ColumnMetaData>().shape({
      columnName: Yup.string().required('Required'),
    }),
  })
  const relationOptions = [
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "FULL JOIN",
    "CROSS JOIN",
    "SELF JOIN",
    "NATURAL JOIN"
  ];

  const sourceTableOptions = [
    { tableName: "Account", columns: [{ columnName: "Account Id" }, { columnName: "Account Name" }, { columnName: "Account Branch" }] },
    { tableName: "Lead", columns: [{ columnName: "Lead Id" }, { columnName: "Lead Name" }, { columnName: "Lead Status" }] },
    { tableName: "Opportunity", columns: [{ columnName: "Opportunity Id" }, { columnName: "Opportunity Name" }, { columnName: "Stages" }] },
    { tableName: "Contact", columns: [{ columnName: "Contact Id" }, { columnName: "Contact Name" }, { columnName: "Contact Address" }] },
  ];
  const gridColumns = [
    { field: "sourceTable.tableName", header: "Source Table" },
    { field: "relationOption", header: "Relation Option" },
    { field: "destinationTable.tableName", header: "Destination Table" },
    { field: "sourceColumn.columnName", header: "Source Column" },
    { field: "destinationColumn.columnName", header: "Destination Column" },
  ];

  const handleSave = (values, formikHelpers: FormikHelpers<FactMappingData>) => {
    formikHelpers.resetForm();
    setFactTableMappingArray([...factTableMappingArray, values]);
    setIsAdded(true)
  };

  return (
    <>
      {
        !isAdded ?
          <Formik
            initialValues={factTableMappingData}
            onSubmit={(values, formikHelpers) => {
              handleSave(values, formikHelpers); // Always call handleSave for new data
            }}
            enableReinitialize={true}
            validationSchema={factMappingValidationSchema}
          >
            {({ values, errors, touched, handleChange, handleReset, setFieldValue }) => (
              <Form>
                <div className="grid">
                  <div className="col-4 field required">
                    <label htmlFor="name" className="ml-1">
                      Source Table
                    </label>
                    <Dropdown
                      name="sourceTable"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.sourceTable,
                          touched.sourceTable
                        ),
                      })}
                      placeholder="Choose from List"
                      options={sourceTableOptions}
                      optionLabel="tableName"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("sourceColumn", new ColumnMetaData());
                        setFieldValue("destinationTable", new ColumnMetaData());
                      }}
                      value={values.sourceTable}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'sourceTable.tableName')}
                  </div>
                  <div className="col-4 field required">
                    <label htmlFor="name" className="ml-1">
                      Relation
                    </label>
                    <Dropdown
                      name="relationOption"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.relationOption,
                          touched.relationOption
                        ),
                      })}
                      placeholder="Choose One"
                      options={relationOptions}
                      onChange={handleChange}
                      value={values.relationOption}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'relationOption')}
                  </div>
                  <div className="col-4 field required">
                    <label htmlFor="name" className="ml-1">
                      Destination Table
                    </label>
                    <Dropdown
                      name="destinationTable"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.destinationTable,
                          touched.destinationTable
                        ),
                      })}
                      placeholder="Choose One"
                      options={sourceTableOptions.filter((sourceTable) => sourceTable.tableName !== values.sourceTable.tableName)}
                      optionLabel="tableName"
                      emptyMessage="Please Choose From Source Table first"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("destinationColumn", new ColumnMetaData());
                      }}
                      value={values.destinationTable}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'destinationTable.tableName')}
                  </div>
                  <div className="col-4 field required">
                    <label htmlFor="name" className="ml-1">
                      Source Column
                    </label>
                    <Dropdown
                      name="sourceColumn"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.sourceColumn,
                          touched.sourceColumn
                        ),
                      })}
                      placeholder="Choose One"
                      emptyMessage="Please Choose From Source Table first"
                      options={values.sourceTable?.columns}
                      optionLabel="columnName"
                      onChange={handleChange}
                      value={values.sourceColumn}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'sourceColumn.columnName')}
                  </div>
                  <div className="col-4 field required">
                    <label htmlFor="name" className="ml-1">
                      Destination Column
                    </label>
                    <Dropdown
                      name="destinationColumn"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.destinationColumn,
                          touched.destinationColumn
                        ),
                      })}
                      placeholder="Choose One"
                      options={values.destinationTable?.columns}
                      optionLabel="columnName"
                      emptyMessage="Please Choose From Destination Table first"
                      onChange={handleChange}
                      value={values.destinationColumn}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'destinationColumn.columnName')}
                  </div>
                  <div className="col-4 field">
                    <label className="w-full">  Alias  </label>
                    <InputText
                      type="text"
                      placeholder="Enter alias"
                      name="alias"
                      className="w-full"
                      value={values?.alias}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 text-right">
                    <Button
                      size="small"
                      label="Reset"
                      type="reset"
                      icon="pi pi-sync"
                      className="mr-2"
                      onClick={handleReset}
                      outlined
                    />
                    {factTableMappingArray.length > 0 ?
                      <Button
                        size="small"
                        label="Back"
                        type="button"
                        className="mr-2"
                        onClick={() => setIsAdded(true)}
                        outlined
                      /> : null
                    }
                    <Button
                      size="small"
                      label="Add"
                      type="submit"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik> :
          <>
            <div className="col-12 text-right">
              <Button
                icon="pi pi-plus"
                label="Add New"
                size="small"
                type="button"
                onClick={() => setIsAdded(false)}
                outlined
              />
            </div>
            <DataTable
              value={factTableMappingArray}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              scrollable={true}
              scrollHeight={"20rem"}
            >

              {gridColumns.map((column, index) => (
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
            <div className="col-12 text-right">
              <Button
                label="Save and Next "
                type="submit"
                className="ml-2"
                size="small"
                onClick={() => {
                  setActiveIndex(activeIndex + 1)
                }}
              />
            </div>
          </>

      }

    </>
  );
};

export default DimensionPage;