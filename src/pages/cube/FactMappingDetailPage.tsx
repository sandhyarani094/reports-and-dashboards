import { Dropdown } from "primereact/dropdown";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Formik, Form, FormikHelpers } from "formik";
import { FactMappingData, Factdetails } from "@/shared/constants/models/Cube";
import * as Yup from 'yup';
import { getErrorMessageOnValidation, isFormFieldInvalid } from "@/shared/constants/services/UtilService";
import { classNames } from "primereact/utils";
import { ColumnMetaData, TableMetaData } from "@/shared/constants/models/TableMetaData";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

interface FactMappingDetailProps {
  setActiveIndex: Function,
  activeIndex: number,
  factTableMappingData: FactMappingData,
  setFactTableMappingData: Function;
  factDetails: Factdetails,
  setFactdetails: Function;
  isAdded: Boolean,
  setIsAdded: Function
  factTableMappingArray: Array<FactMappingData>,
  setFactTableMappingArray: Function
}
const FactMappingDetail: React.FC<FactMappingDetailProps> = ({
  activeIndex, setActiveIndex, factTableMappingData, setFactTableMappingData,
  factDetails, setFactdetails, isAdded, setIsAdded, factTableMappingArray, setFactTableMappingArray
}) => {

  const factMappingValidationSchema = Yup.object().shape({
    sourceTable: Yup.object<TableMetaData>().shape({
      tableName: Yup.string().required('Required'),
    }),
    relation: Yup.string().required('Required'),
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
  const joinTypes = [
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "FULL JOIN",
    "CROSS JOIN",
    "SELF JOIN",
    "NATURAL JOIN"
  ];

  const gridColumns = [
    { field: "sourceTable.tableName", header: "Source Table" },
    { field: "relation", header: "Relation Option" },
    { field: "destinationTable.tableName", header: "Destination Table" },
    { field: "sourceColumn.columnName", header: "Source Column" },
    { field: "destinationColumn.columnName", header: "Destination Column" },
  ];

  const handleSave = (values: FactMappingData, formikHelpers: FormikHelpers<FactMappingData>) => {
    formikHelpers.resetForm();
    setFactTableMappingArray([...factTableMappingArray, values]);
    setIsAdded(true);
  };
  const handleSaveAndNext = () => {
    setActiveIndex(activeIndex + 1);
    setIsAdded(true);
  }
  console.log(factDetails?.factTables);

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
                  <div className="col-6 field required">
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
                      options={factDetails?.factTables}
                      optionLabel="tableName"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("sourceColumn", new ColumnMetaData());
                        setFieldValue("destinationTable", new ColumnMetaData());
                      }}
                      value={values?.sourceTable}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'sourceTable.tableName')}
                  </div>
                  <div className="col-6 field required">
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
                      options={values?.sourceTable?.columns}
                      optionLabel="columnName"
                      onChange={handleChange}
                      value={values?.sourceColumn}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'sourceColumn.columnName')}
                  </div>
                  <div className="col-6 field required">
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
                      options={factDetails?.factTables.filter((factTable) => factTable.tableName !== values.sourceTable.tableName)}
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
                  <div className="col-6 field required">
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
                      options={values?.destinationTable?.columns}
                      optionLabel="columnName"
                      emptyMessage="Please Choose From Destination Table first"
                      onChange={handleChange}
                      value={values?.destinationColumn}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'destinationColumn.columnName')}
                  </div>
                  <div className="col-6 field required">
                    <label htmlFor="name" className="ml-1">
                      Relation
                    </label>
                    <Dropdown
                      name="relation"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.relation,
                          touched.relation
                        ),
                      })}
                      placeholder="Choose One"
                      options={joinTypes}
                      onChange={handleChange}
                      value={values.relation}
                    />
                    {getErrorMessageOnValidation(errors, touched, 'relation')}
                  </div>
                  <div className="col-6 field">
                    <label className="w-full">  Alias  </label>
                    <InputText
                      type="text"
                      placeholder="Enter alias"
                      name="aliasName"
                      className="w-full"
                      value={values?.aliasName}
                      onChange={handleChange}
                    />
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
                        label="Cancel"
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
              alwaysShowPaginator={false}
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
                label="Save and Next "
                type="submit"
                className="ml-2"
                size="small"
                onClick={handleSaveAndNext}
              />
            </div>
          </>

      }

    </>
  );
};

export default FactMappingDetail;