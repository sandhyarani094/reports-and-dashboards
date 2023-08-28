"use client"
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React from 'react'



const CreateConnectionPage = () => {

    const router = useRouter();
    const handleSave = (values: any) => {
        console.log("Form values:", values); // Print the form values to the console
        // Add your save logic here
    };

    return (
        <>
            <h5>
                Create Connection
            </h5>
            <Formik
                initialValues={
                    {
                        connectionName: '',
                        dbType: [],
                        serverAddress: '',
                        port: '',
                        userId: '',
                        password: '',
                        schemeName: '',
                        serviceId: ''
                    }
                }
                onSubmit={(values, formikHelpers) => {
                    handleSave(values); // Always call handleSave for new data
                }}
                enableReinitialize={true}
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
                                            id="connectionName"
                                            name="connectionName"
                                            className={'w-full'}
                                            value={values.connectionName}
                                            placeholder="Connection Name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6 field ">
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
                                            className={'w-full'}
                                            showClear
                                        />

                                    </div>
                                    <div className="col-6 field ">
                                        <label htmlFor="name" className="ml-1">
                                            Server Address
                                        </label>
                                        <InputText
                                            id="serverAddress"
                                            name="serverAddress"
                                            className={'w-full'}
                                            value={values.serverAddress}
                                            placeholder="Connection Name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6 field ">
                                        <label htmlFor="name" className="ml-1">
                                            Port
                                        </label>
                                        <InputText
                                            id="port"
                                            name="port"
                                            className={'w-full'}
                                            value={values.port}
                                            placeholder=" Port"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-6 field ">
                                        <label htmlFor="name" className="ml-1">
                                            User ID
                                        </label>
                                        <InputText
                                            id="port"
                                            name="userId"
                                            className={'w-full'}
                                            value={values.userId}
                                            placeholder=" userId"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6 field ">
                                        <label htmlFor="name" className="ml-1">
                                            Password
                                        </label>
                                        <InputText
                                            id="password"
                                            name="password"
                                            className={'w-full'}
                                            value={values.password}
                                            placeholder="password"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6 field ">
                                        <label htmlFor="name" className="ml-1">
                                            Schema Name
                                        </label>
                                        <InputText
                                            id="schemeName"
                                            name="schemeName"
                                            className={'w-full'}
                                            value={values.schemeName}
                                            placeholder="schemeName"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6 field ">
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
                                type="button"
                                size="small"

                            />
                            <Button
                                label="Save "
                                type="button"
                                className="ml-2"
                                size="small"
                                onClick={() => handleSave(values)}

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
