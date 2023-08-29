"use client"
import { ToastContext } from '@/app/context/toasterContext';
import { Connection } from '@/shared/constants/models/Connection';
import { showToaster } from '@/shared/constants/services/ToastService';
import { getErrorMessageOnValidation, isFormFieldInvalid } from '@/shared/constants/services/utilService';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React, { useContext } from 'react'
import * as Yup from 'yup';

const CreateConnectionPage = () => {
    const router = useRouter();
    const { toastRef } = useContext(ToastContext);

    const connectionValidationSchema = Yup.object().shape({
        connectionName: Yup.string()
            .required('Required'),
        dbType: Yup.string()
            .required('Required'),
        serverAddress: Yup.string()
            .required('Required'),
        port: Yup.string()
            .required('Required'),
        userId: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
        schemeName: Yup.string()
            .required('Required'),
    })

    const handleSave = (values: any) => {
        console.log("Form values:", values); // Print the form values to the console
        // Add your save logic here
        showToaster(toastRef, 'success', 'Successfully', 'Connection Created Successfully');
    };

    return (
        <>
            <h5>
                Create Connection
            </h5>
            <Formik
                initialValues={new Connection()}
                onSubmit={(values, formikHelpers) => {
                    handleSave(values); // Always call handleSave for new data
                }}
                enableReinitialize={true}
                validationSchema={connectionValidationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleReset,
                }) => (
                    <Form>
                        <div className="grid">
                            <div className="col-12">
                                <div className="grid">
                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            Connection Name
                                        </label>
                                        <InputText
                                            name="connectionName"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.connectionName,
                                                    touched.connectionName
                                                ),
                                            })}
                                            value={values.connectionName}
                                            placeholder="Connection Name"
                                            onChange={handleChange}
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'connectionName')}
                                    </div>
                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            DB Type
                                        </label>
                                        <Dropdown
                                            name="dbType"
                                            options={[
                                                { label: 'SQL', value: 'SQL' },
                                                { label: 'POSTGRES', value: 'POSTGRES' },
                                                { label: 'MARIA DB', value: 'MARIA DB' },
                                                { label: 'MONGO DB', value: 'MONGO DB' }
                                            ]}
                                            value={values.dbType}
                                            optionLabel="label"
                                            optionValue="value"
                                            onChange={handleChange}
                                            placeholder="DB Type"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.dbType,
                                                    touched.dbType
                                                ),
                                            })}
                                            showClear
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'dbType')}

                                    </div>
                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            Server Address
                                        </label>
                                        <InputText
                                            id="serverAddress"
                                            name="serverAddress"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.serverAddress,
                                                    touched.serverAddress
                                                ),
                                            })}
                                            value={values.serverAddress}
                                            placeholder="Connection Name"
                                            onChange={handleChange}
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'serverAddress')}
                                    </div>
                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            Port
                                        </label>
                                        <InputText
                                            id="port"
                                            name="port"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.port,
                                                    touched.port
                                                ),
                                            })}
                                            value={values.port}
                                            placeholder=" Port"
                                            onChange={handleChange}
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'port')}
                                    </div>

                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            User ID
                                        </label>
                                        <InputText
                                            name="userId"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.userId,
                                                    touched.userId
                                                ),
                                            })}
                                            value={values.userId}
                                            placeholder=" userId"
                                            onChange={handleChange}
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'userId')}
                                    </div>
                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            Password
                                        </label>
                                        <InputText
                                            id="password"
                                            name="password"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.password,
                                                    touched.password
                                                ),
                                            })}
                                            value={values.password}
                                            placeholder="password"
                                            onChange={handleChange}
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'password')}
                                    </div>
                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            Schema Name
                                        </label>
                                        <InputText
                                            id="schemeName"
                                            name="schemeName"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.schemeName,
                                                    touched.schemeName
                                                ),
                                            })}
                                            value={values.schemeName}
                                            placeholder="schemeName"
                                            onChange={handleChange}
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'schemeName')}
                                    </div>
                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            Service Id
                                        </label>
                                        <InputText
                                            id="serviceId"
                                            name="serviceId"
                                            className={'w-full'}
                                            value={values.serviceId}
                                            placeholder="serviceId"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-right">
                            <Button
                                label="Test"
                                type="submit"
                                size="small"
                            />
                            <Button
                                label="Save "
                                type="submit"
                                className="ml-2"
                                size="small"
                            />
                            <Button
                                label="Cancel "
                                type="button"
                                className="ml-2"
                                size="small"
                                outlined
                                onClick={() =>
                                    router.back()
                                }
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CreateConnectionPage;
