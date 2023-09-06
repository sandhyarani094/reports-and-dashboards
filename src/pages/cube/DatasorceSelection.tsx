import { ConnectionService } from "@/httpServices/ConnectionService";
import { CubeDetails } from "@/shared/constants/models/Cube";
import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState, useContext } from "react";

interface DatasourceSelectionProps {
  setActiveTab: Function;
  setActiveIndex: Function;
  activeIndex: number;
  dataSourceDetails: CubeDetails;
  setDataSourceDetails: Function;
}
const DatasourceSelection: React.FC<DatasourceSelectionProps> = ({
  setActiveTab,
  setActiveIndex,
  activeIndex,
  dataSourceDetails, setDataSourceDetails
}) => {
  const connectionSerice = new ConnectionService();
  const [datasources, setDatasources] = useState([]);
  useEffect(() => {
    findAllConnection();
  }, []);

  const findAllConnection = () => {
    connectionSerice.getAll().then((res) => {
        setDatasources(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSave = (values: any) => {
    setDataSourceDetails(values);
    setActiveIndex(activeIndex + 1); // Increment activeIndex
    setActiveTab(true);
  };
  return (
    <div>
      <>
        <Formik
          initialValues={dataSourceDetails}
          onSubmit={(values, formikHelpers) => {
            handleSave(values); // Always call handleSave for new data
          }}
          enableReinitialize={true}
        >
          {({ values, errors, touched, handleChange, handleReset }) => (
            <Form>
              <div className="grid">
                <div className="col-12">
                  <div className="grid">
                    <div className="col-6 field required">
                      <label htmlFor="name" className="ml-1">
                        Data Source
                      </label>
                      <Dropdown
                        name="connectionId"
                        options={datasources} // Use the datasources state for options
                        value={values?.connectionId}
                        optionLabel="connectionName"
                        className={"w-full"}
                        optionValue="id"
                        onChange={handleChange}
                        placeholder="Data Source"
                        showClear={values?.connectionId? true : false}
                      />
                    </div>
                    <div className="col-6 field">
                      <label htmlFor="name" className="ml-1">
                        Cube Name
                      </label>
                      <InputText
                        name="cubeName"
                        className={"w-full"}
                        value={values?.cubeName}
                        placeholder="Cube Name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-right">
                <Button
                  label="Save & Next"
                  type="submit"
                  className="ml-2"
                  size="small"
                  disabled = {values?.connectionId?.length === 0 || !values?.cubeName}
                  onClick={() => {
                    handleSave(values);
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </>
    </div>
  );
};

export default DatasourceSelection;
