import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState, useContext } from "react";

interface DatasourceSelectionProps {
  setActiveTab: Function;
  setActiveIndex: Function;
  activeIndex: number;
}
const DatasourceSelection: React.FC<DatasourceSelectionProps> = ({
  setActiveTab,
  setActiveIndex,
  activeIndex,
}) => {
  const [datasources, setDatasources] = useState([]);

  const [initialValues, setInitialValues] = useState({
    datasource: [],
    cubeName: "",
  });

  const handleSave = (values: any) => {
    console.log(values);
    setActiveIndex(activeIndex + 1); // Increment activeIndex
    setActiveTab(true);
  };
  return (
    <div>
      <>
        <Formik
          initialValues={initialValues}
          // initialValues={new Connection()}
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
                        name="datasource"
                        options={datasources} // Use the datasources state for options
                        value={values.datasource}
                        optionLabel="label"
                        optionValue="value"
                        className={"w-full"}
                        onChange={handleChange}
                        placeholder="Data Source"
                        showClear
                      />
                    </div>

                    <div className="col-6 field">
                      <label htmlFor="name" className="ml-1">
                        Cube Name
                      </label>
                      <InputText
                        name="cubeName"
                        className={"w-full"}
                        value={values.cubeName}
                        placeholder="Connection Name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-right">
                <Button
                  label="Save  & Next"
                  type="submit"
                  className="ml-2"
                  size="small"
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
