"use client";
import { RouterPath } from "@/shared/constants/router";
import { useRouter } from "next/router";
import { ToastContext } from "@/common-layouts/context/toasterContext";
import { Connection } from "@/shared/constants/models/Connection";
import { showToaster } from "@/shared/constants/services/ToastService";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  getErrorMessageOnValidation,
  isFormFieldInvalid,
} from "@/shared/constants/services/utilService";
import { Form, Formik } from "formik";
import React, { useEffect, useState, useContext } from "react";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { InputNumber } from "primereact/inputnumber";
import { ConnectionService } from "@/HttpServices/ConnectionService";

const CreateConnectionPage = () => {
  const router = useRouter();
  const editData = router.query.editData as string;
  const { toastRef } = useContext(ToastContext);
  const connectionSerice = new ConnectionService();
  const [toUpdateData, setToUpdatedData] = useState<Connection>(
    new Connection()
  );

  useEffect(() => {
    connectionSerice.getAll().then((res) => {});
  }, []);


  const handleEdit = () => {
    const editData = router.query.editData as string;
    const editDataParsed = JSON.parse(editData || "{}");
    setToUpdatedData(editDataParsed);
  };

  const handleSave = (values) => {
    connectionSerice
      .create(values)
      .then((res) => {
        console.log(res);
        showToaster(
          toastRef,
          "success",
          "Successfully",
          "Connection Created Successfully"
        );
        router.back();
      })
      .catch((error) => {
        showToaster(toastRef, "error", "Error", "Occured !");
      });
  };

  const connectionValidationSchema = Yup.object().shape({
    connectionName: Yup.string().required("Required"),
    driverType: Yup.string().required("Required"),
    host: Yup.string().required("Required"),
    port: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    schemaName: Yup.string().required("Required"),
  });

  return (
    <>
      <h5>Create Connection</h5>
      <Formik
        initialValues={new Connection() }
        onSubmit={(values, formikHelpers) => {
          // Always call handleSave for new data
        }}
        enableReinitialize={true}
        validationSchema={connectionValidationSchema}
      >
        {({ values, errors, touched, handleChange, handleReset }) => (
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
                    {getErrorMessageOnValidation(
                      errors,
                      touched,
                      "connectionName"
                    )}
                  </div>
                  <div className="col-6 field required">
                    <label htmlFor="name" className="ml-1">
                      Driver Type
                    </label>
                    <Dropdown
                      name="dbType"
                      options={[
                        { label: "MySQL", value: "mysql" },
                        { label: "MariaDB", value: "mariadb" },
                        { label: "Oracle", value: "oracle" },
                        { label: "PostgreSQL", value: "postgresql" },
                      ]}
                      value={values.dbType}
                      optionLabel="label"
                      optionValue="value"
                      onChange={handleChange}
                      placeholder="Driver Type"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.dbType,
                          touched.dbType
                        ),
                      })}
                      showClear
                    />
                    {getErrorMessageOnValidation(errors, touched, "driverType")}
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
                    {getErrorMessageOnValidation(errors, touched, "schemaName")}
                  </div>
                  <div className="col-6 field ">
                    <label htmlFor="name" className="ml-1">
                      Host
                    </label>
                    <InputText
                      id="serverAddress"
                      name="serverAddress"
                      value={values.serverAddress}
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.serverAddress,
                          touched.serverAddress
                        ),
                      })}
                      placeholder="Server Address"
                      onChange={handleChange}
                    />
                    {getErrorMessageOnValidation(errors, touched, "host")}
                  </div>
                  <div className="col-6 field required">
                    <label htmlFor="name" className="ml-1">
                      Port
                    </label>
                    <InputNumber
                      name="port"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.port,
                          touched.port
                        ),
                      })}
                      value={values.port}
                      placeholder=" Port"
                      useGrouping={false}
                      onChange={(e) => {
                        debugger;
                        handleChange({
                          target: { name: "port", value: e.value },
                        });
                      }}
                    />
                    {getErrorMessageOnValidation(errors, touched, "port")}
                  </div>
                  <div className="col-6 field required">
                    <label htmlFor="name" className="ml-1">
                      User name
                    </label>
                    <InputText
                      id="userId"
                      name="userId"
                      value={values.userId}
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(
                          errors.userId,
                          touched.userId
                        ),
                      })}
                      placeholder=" User Name"
                      onChange={handleChange}
                    />
                    {getErrorMessageOnValidation(errors, touched, "username")}
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
                    {getErrorMessageOnValidation(errors, touched, "password")}
                  </div>
                  <div className="col-6 field required">
                    <label htmlFor="name" className="ml-1">
                      Service Id
                    </label>
                    <InputText
                      id="serviceId"
                      name="serviceId"
                      className={"w-full"}
                      value={values.serviceId}
                      placeholder="serviceId"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 text-right">
              <Button label="Test" type="submit" size="small" />
              <Button
                label="Save "
                type="submit"
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
                onClick={() => router.back()}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateConnectionPage;
