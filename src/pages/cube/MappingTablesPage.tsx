import { DimesionMapping, Factdetails } from '@/shared/constants/models/Cube';
import { ColumnMetaData } from '@/shared/constants/models/TableMetaData';
import { isFormFieldInvalid, getErrorMessageOnValidation } from '@/shared/constants/services/UtilService';
import { Formik, Form, FormikHelpers } from 'formik';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import React from 'react'
interface DimensionMappingDetailProps {
    dimensionDetails: Factdetails,
    setDimensionDetails: Function;
    dimensionMappingData: DimesionMapping,
    setDimensionMappingData: Function;

}
const MappingTablesPage: React.FC<DimensionMappingDetailProps> = ({
    dimensionDetails, setDimensionDetails, dimensionMappingData, setDimensionMappingData
}) => {

    const sourceTableOptions = [
        { tableName: "Account", columns: [{ columnName: "Account Id" }, { columnName: "Account Name" }, { columnName: "Account Branch" }] },
        { tableName: "Lead", columns: [{ columnName: "Lead Id" }, { columnName: "Lead Name" }, { columnName: "Lead Status" }] },
        { tableName: "Opportunity", columns: [{ columnName: "Opportunity Id" }, { columnName: "Opportunity Name" }, { columnName: "Stages" }] },
        { tableName: "Contact", columns: [{ columnName: "Contact Id" }, { columnName: "Contact Name" }, { columnName: "Contact Address" }] },
    ];
    const joinTypes = [
        "INNER JOIN",
        "LEFT JOIN",
        "RIGHT JOIN",
        "FULL JOIN",
        "CROSS JOIN",
        "SELF JOIN",
        "NATURAL JOIN"
    ];
    function handleSave(values: any, formikHelpers: FormikHelpers<DimesionMapping>) {
        formikHelpers.resetForm();
    }

    console.log(dimensionDetails.selectedFactTables);
    

    return (
        <div>
            <Formik
                initialValues={dimensionMappingData}
                onSubmit={(values, formikHelpers) => {
                    handleSave(values, formikHelpers); // Always call handleSave for new data
                }}
                enableReinitialize={true}
            // validationSchema={factMappingValidationSchema}
            >
                {({ values, errors, touched, handleChange, handleReset, setFieldValue }) => (
                    <Form>
                        <div className="grid">
                            <div className="col-6 field required">
                                <label htmlFor="name" className="ml-1">
                                    Fact Column
                                </label>
                                <Dropdown
                                    name="factColumn"
                                    className={classNames("w-full", {
                                        "p-invalid": isFormFieldInvalid(
                                            errors.factColumn,
                                            touched.factColumn
                                        ),
                                    })}
                                    placeholder="Choose One"
                                    options={dimensionDetails.selectedFactTables}
                                    optionLabel="columnName"
                                    onChange={handleChange}
                                    value={values.factColumn}
                                />
                                {getErrorMessageOnValidation(errors, touched, 'factColumn.columnName')}
                            </div>
                            <div className="col-6 field required">
                                <label htmlFor="name" className="ml-1">
                                    Relation
                                </label>
                                <Dropdown
                                    name="joinType"
                                    className={classNames("w-full", {
                                        "p-invalid": isFormFieldInvalid(
                                            errors.joinType,
                                            touched.joinType
                                        ),
                                    })}
                                    placeholder="Choose One"
                                    options={joinTypes}
                                    onChange={handleChange}
                                    value={values.joinType}
                                />
                                {getErrorMessageOnValidation(errors, touched, 'joinType')}
                            </div>
                            <div className="col-6 field required">
                                <label htmlFor="name" className="ml-1">
                                    Dimension Table
                                </label>
                                <Dropdown
                                    name="dimTable"
                                    className={classNames("w-full", {
                                        "p-invalid": isFormFieldInvalid(
                                            errors.dimTable,
                                            touched.dimTable
                                        ),
                                    })}
                                    placeholder="Choose from List"
                                    options={dimensionDetails.factTables}
                                    optionLabel="tableName"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFieldValue("factColumn", new ColumnMetaData());
                                        setFieldValue("dimColumn", new ColumnMetaData());
                                    }}
                                    value={values.dimTable}
                                />
                                {getErrorMessageOnValidation(errors, touched, 'sourceTable.tableName')}
                            </div>
                            <div className="col-6 field required">
                                <label htmlFor="name" className="ml-1">
                                    Dimension Column
                                </label>
                                <Dropdown
                                    name="dimColumn"
                                    className={classNames("w-full", {
                                        "p-invalid": isFormFieldInvalid(
                                            errors.dimColumn,
                                            touched.dimColumn
                                        ),
                                    })}
                                    placeholder="Choose One"
                                    options={values.dimTable.columns}
                                    optionLabel="columnName"
                                    emptyMessage="Please Choose From Source Table first"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFieldValue("destinationColumn", new ColumnMetaData());
                                    }}
                                    value={values.dimColumn}
                                />
                                {getErrorMessageOnValidation(errors, touched, 'dimColumn.tableName')}
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
                                <Button
                                    size="small"
                                    label="Save"
                                    type="submit"
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MappingTablesPage
