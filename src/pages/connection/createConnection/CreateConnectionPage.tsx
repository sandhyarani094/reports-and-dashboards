"use client"
import { RouterPath } from '@/shared/constants/router';
import { useRouter } from 'next/router';
import { ToastContext } from '@/app/context/toasterContext';
import { Connection } from '@/shared/constants/models/Connection';
import { showToaster } from '@/shared/constants/services/ToastService';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getErrorMessageOnValidation, isFormFieldInvalid } from '@/shared/constants/services/utilService';
import { Form, Formik } from 'formik';
import React, { useEffect , useState,useContext } from 'react'
import { classNames } from 'primereact/utils';
import * as Yup from 'yup';

const CreateConnectionPage = () => {   
    const router = useRouter();
    const editData = router.query.editData as string;
    const { toastRef } = useContext(ToastContext);
    const [connectionData, setConnectionData] = useState<Connection>(new Connection());

      useEffect(() => {
        const editDataParsed = JSON.parse(editData || '{}');
        console.log("Parsed editData:", editDataParsed); 
        setConnectionData(editDataParsed);
      }, [editData]);
      
    const handleSave = (values: any) => {
        console.log("Form values:", values);
        const existingConnections = JSON.parse(localStorage.getItem('connections') || '[]');
        existingConnections.push(values);
        localStorage.setItem('connections', JSON.stringify(existingConnections));
        router.push(RouterPath.Connection);
        showToaster(toastRef, 'success', 'Successfully', 'Connection Created Successfully');
    }

    const connectionValidationSchema = Yup.object().shape({
        connectionName: Yup.string()
            .required('Required'),
        driverType: Yup.string()
            .required('Required'),
        host: Yup.string()
            .required('Required'),
        port: Yup.string()
            .required('Required'),
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
        schemaName: Yup.string()
            .required('Required'),
    })
    
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
                                            Driver Type
                                        </label>
                                        <Dropdown
                                            name="driverType"
                                            options={[
                                                { label: 'MySQL', value: 'MySQL' },
                                                { label: 'MariaDB', value: 'MariaDB' },
                                                { label: 'Oracle', value: 'Oracle' },
                                                { label: 'PostgreSQL', value: 'PostgreSQL' }
                                            ]}
                                            value={values.driverType}
                                            optionLabel="label"
                                            optionValue="value"
                                            onChange={handleChange}
                                            placeholder="Driver Type"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.driverType,
                                                    touched.driverType
                                                ),
                                            })}
                                            showClear
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'driverType')}

                                    </div>
                                    <div className="col-6 field required">
                                        <label htmlFor="name" className="ml-1">
                                            Schema Name
                                        </label>
                                        <InputText
                                            id="schemaName"
                                            name="schemaName"
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.schemaName,
                                                    touched.schemaName
                                                ),
                                            })}
                                            value={values.schemaName}
                                            placeholder="schemeName"
                                            onChange={handleChange}
                                        />
                                         {getErrorMessageOnValidation(errors, touched, 'schemaName')}
                                    </div>
                                    <div className="col-6 field ">
                                        <label htmlFor="name" className="ml-1">
                                           Host
                                        </label>
                                        <InputText
                                            id="host"
                                            name="host"
                                            value={values.host}
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.host,
                                                    touched.host
                                                ),
                                            })}
                                            placeholder="Server Address"
                                            onChange={handleChange}
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'host')}
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
                                            User name
                                        </label>
                                        <InputText
                                            id="username"
                                            name="username"
                                            value={values.username}
                                            className={classNames("w-full", {
                                                "p-invalid": isFormFieldInvalid(
                                                    errors.username,
                                                    touched.username
                                                ),
                                            })}
                                            placeholder=" User Name"
                                            onChange={handleChange}
                                        />
                                        {getErrorMessageOnValidation(errors, touched, 'username')}
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