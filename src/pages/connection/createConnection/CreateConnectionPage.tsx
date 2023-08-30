"use client"
import { RouterPath } from '@/shared/constants/router';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect , useState } from 'react'
import { Value } from 'sass';



const CreateConnectionPage = () => {   

    

    const router = useRouter();
    const editData = router.query.editData as string;
    const [initialValues, setInitialValues] = useState({
        id:'',
        connectionName: '',
        driverType: [],
        host: '',
        port: '',
        username: '',
        password: '',
        schemaName: '',
        serviceId: ''
      });

      useEffect(() => {
        const editDataParsed = JSON.parse(editData || '{}');
        console.log("Parsed editData:", editDataParsed); 
        setInitialValues(editDataParsed);
      }, [editData]);
      
    const handleSave = (values: any) => {
        console.log("Form values:", values);
        const existingConnections = JSON.parse(localStorage.getItem('connections') || '[]');
        existingConnections.push(values);
        localStorage.setItem('connections', JSON.stringify(existingConnections));
        router.push(RouterPath.Connection)
        
    };

    

    
    return (
        <>
            <h5>
                Create Connection
            </h5>
            <Formik
                 initialValues={initialValues}
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
                                            placeholder="Driver"
                                            className={'w-full'}
                                            showClear
                                            
                                        />

                                    </div>
                                    <div className="col-6 field ">
                                        <label htmlFor="name" className="ml-1">
                                            Schema Name
                                        </label>
                                        <InputText
                                            id="schemaName"
                                            name="schemaName"
                                            className={'w-full'}
                                            value={values.schemaName}
                                            placeholder="schemeName"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6 field ">
                                        <label htmlFor="name" className="ml-1">
                                           Host
                                        </label>
                                        <InputText
                                            id="host"
                                            name="host"
                                            className={'w-full'}
                                            value={values.host}
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
                                            User name
                                        </label>
                                        <InputText
                                            id="username"
                                            name="username"
                                            className={'w-full'}
                                            value={values.username}
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
