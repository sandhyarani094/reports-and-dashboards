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
import { error } from "console";
import { ConnectionService } from "@/httpServices/ConnectionService";

const CreateConnectionPage = () => {
  const router = useRouter();
  const editData = router.query.editData as string;
  const { toastRef } = useContext(ToastContext);
  const connectionSerice = new ConnectionService();
  const [toUpdateData, setToUpdatedData] = useState<Connection>(
    new Connection()
  );
  const editId = parseInt(router.query.editId as string);
  const [connectionTest, setConnectionTest] = useState("");

  useEffect(() => {
    connectionSerice.getAll().then((res) => {});
  }, []);

  useEffect(() => {
    if (editId) {
      connectionSerice.getById(editId).then((res) => {
        setToUpdatedData(res); // Assuming the API response matches the Connection model
      });
    }
  }, [editId]);

  const getAllconnection = () => {
    connectionSerice.getAll().then((res) => {
      console.log(res);
    });
  };

  const handleSave = (values: Connection) => {
    if (editId) {
      connectionSerice
        .update(editId, values)
        .then((res) => {
          console.log(res);
          showToaster(
            toastRef,
            "success",
            "Success",
            "Connection Updated Successfully"
          );
          router.back();
        })
        .catch((error) => {
          showToaster(
            toastRef,
            "error",
            "Error",
            "An error occurred while updating!"
          );
        });
    } else {
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
    }

    getAllconnection();
  };

  const handleTest = async (values: Connection) => {
    // Check if the form values are valid based on the Yup schema
    await connectionValidationSchema.isValid(values).then((valid) => {
      if (valid) {
        // Validation succeeded, proceed with the API call
        if (values) {
          connectionSerice
            .test(values)
            .then((res) => {
              setConnectionTest(res);
              showToaster(toastRef, "success", "Successful", "Connection !");
            })
            .catch((err) => {
              console.log(err);
              showToaster(toastRef, "error", "Failed", "Connection !");
            });
        } else {
          showToaster(toastRef, "error", "Error", "Values are missing!");
        }
      } else {
        console.error("Fields can't be empty");
        showToaster(
          toastRef,
          "error",
          "Fields can't be empty",
          "Please fill out the fields."
        );
      }
    });
  };

  const connectionValidationSchema = Yup.object().shape({
    connectionName: Yup.string().required("Required"),
    dbType: Yup.string().required("Required"),
    serverAddress: Yup.string().required("Required"),
    port: Yup.number().required("Required"),
    userId: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    schemaName: Yup.string().required("Required"),
  });

  return (
    <>
      <h5>Create Connection</h5>
      <Formik
        initialValues={toUpdateData}
        onSubmit={(values, formikHelpers) => {
          // Always call handleSave for new data
          handleSave(values);
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
          setFieldValue
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
                    {getErrorMessageOnValidation(errors, touched, "dbType")}
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
                    {getErrorMessageOnValidation(
                      errors,
                      touched,
                      "serverAddress"
                    )}
                  </div>
                  <div className="col-6 field required">
                    <label htmlFor="name" className="ml-1">
                      Port
                    </label>
                    <InputNumber
                      name="port"
                      className={classNames("w-full", {
                        "p-invalid": isFormFieldInvalid(errors.port, touched.port),
                      })}
                      value={values.port}
                      placeholder=" Port"
                      useGrouping={false}
                      onChange={(e) => {
                        setFieldValue("port",e.value);
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
                    {getErrorMessageOnValidation(errors, touched, "userId")}
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
              <Button
                label="Test"
                type="button"
                size="small"
                onClick={() => handleTest(values)}
              />
              <Button
                label={editId ? "Update" : "Save"}
                type="submit"
                className="ml-2"
                size="small"
                // onClick={() => handleSave(values)}
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
