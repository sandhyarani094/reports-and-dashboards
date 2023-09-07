import { Factdetails } from '@/shared/constants/models/Cube';
import { FieldArray } from 'formik';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import React from 'react'

const FactDimensionComponent = ({props}) => {
  return (
    <div className='grid'>
      <div className="col-12">
        <FieldArray
          name="duplicateMatchingRules"
          render={(fields) => (
            <>
              <div className="grid">
                <div className="col-12 text-right">
                  <Button
                    label="Add Rule"
                    icon="pi pi-plus"
                    type="button"
                    onClick={() => {
                      fields.push(new Factdetails());
                    }}
                  />
                </div>
                <div className="col-12">
                  {props.values.duplicateMatchingRules.map(
                    (duplicateMatchingRule, index) => (
                      <div className="formgrid grid mb-2" key={index}>
                        <div className="field col-5">
                          <label className="w-full">
                            Compare Accounts with
                          </label>
                          <Dropdown
                            name={`duplicateMatchingRules[${index}].tableMetaData`}
                            value={duplicateMatchingRule.tableMetaData}
                            onChange={(e) => {
                            //   props.setFieldValue(
                            //     `duplicateMatchingRules[${index}].tableMetaData`,
                            //     e.target.value
                            //   );
                            //   duplicateMatchingRule.tableMetaData =
                            //     e.target.value;
                            //   findMatchingRulesById(
                            //     duplicateMatchingRule.tableMetaData.id,
                            //     index
                            //   );
                            }}
                            disabled={true}
                            options={[props.values.tableMetaData]}
                            optionLabel="displayName"
                            placeholder="Select"
                            className="w-full"
                            filter
                          />
                        </div>
                        <div className="field col-5">
                          <label className="w-full">
                            Matching Rule{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <Dropdown
                            name={`duplicateMatchingRules[${index}].matchingRule`}
                            value={duplicateMatchingRule.matchingRule}
                            onChange={props.handleChange}
                            // options={filteredMatchingRuleList[index]}
                            optionLabel="name"
                            optionDisabled={(e) => {
                              return props.values.duplicateMatchingRules
                                .map((e) => e.matchingRule.id)
                                .includes(e.id);
                            }}
                            placeholder="Select"
                            className={classNames(
                            //   {
                            //     "p-invalid": checkFormFieldInvalid(index),
                            //   },
                              { "w-full": true }
                            )}
                            filter
                          />
                          {/* {checkFormFieldInvalid(index) ? (
                            <small className="p-error">
                              {
                                props.errors.duplicateMatchingRules[index][
                                  "matchingRule"
                                ]["name"]
                              }
                            </small>
                          ) : null} */}
                        </div>
                        <div className="field col-2">
                          <div
                            className="col-12 mt-4"
                            style={{ paddingTop: "3px" }}
                          >
                            <Button
                              label="Remove Rule"
                              type="button"
                              onClick={() => {
                                // filteredMatchingRuleList.splice(index, 1);
                                // setFilteredMatchingRuleList([
                                //   ...filteredMatchingRuleList,
                                // ]);
                                // fields.remove(index);
                              }}
                              className="p-button-secondary"
                              outlined
                              disabled={
                                props.values?.duplicateMatchingRules?.length > 1
                                  ? false
                                  : true
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        />
      </div>
    </div>
  )
}

export default FactDimensionComponent
