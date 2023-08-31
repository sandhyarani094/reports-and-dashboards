import { Dropdown } from "primereact/dropdown";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";

interface FactMappingDetailProps {
  onNext: Function;
}
const FactMappingDetail: React.FC<FactMappingDetailProps> = ({ onNext }) => {
  const [sourceTable, setSourceTableOption] = useState<string | null>(null);
  const [destinationTable, setDestinationTableOption] = useState<string | null>(
    null
  );
  const [sourceColumn, setsourceColumnOptions] = useState<string | null>(null);
  const [destinationColumn, setDestinationColumnOptions] = useState<
    string | null
  >(null);
  const [relationOption, setRelationOption] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<any | null>(null);

  const RelationOptions = {
    inner_join: "INNER JOIN",
    left_join: "LEFT JOIN",
    right_join: "RIGHT JOIN",
    full_join: "FULL JOIN",
    cross_join: "CROSS JOIN",
    self_join: "SELF JOIN",
    natural_join: "NATURAL JOIN",
  };

  const dropdownOptions = [
    { label: "Account", value: "Account" },
    { label: "Lead", value: "Lead" },
    { label: "Opportunity", value: "Opportunity" },
    { label: "Contact", value: "Contact" },
  ];

  useEffect(() => {
    const storedValues = JSON.parse(
      localStorage.getItem("selectedValues") || "{}"
    );
    setSelectedValues(storedValues);
  }, []);

  const storeSelectedValues = () => {
    const valuesToStore = {
      sourceTable,
      destinationTable,
      sourceColumn,
      destinationColumn,
      relationOption,
    };
    localStorage.setItem("selectedValues", JSON.stringify(valuesToStore));
    setSelectedValues(valuesToStore);
  };

  const tableColumns: Record<string, string[]> = {
    Account: ["Account Id", "Account Name", "Account Branch"],
    Contact: ["Contact Id", "Contact Name", "Contact Address"],
    Lead: ["Lead Id", "Lead Name", "Lead Status"],
    Opportunity: ["Opportunity Id", "Opportunity Name", "Stages"],
  };

  const filteredColumnOptions = sourceTable
    ? dropdownOptions.filter((option) => option.value !== sourceTable)
    : [{ label: "Please Choose From Source Table first", value: null }];

  const sourceColumnOptions = sourceTable
    ? tableColumns[sourceTable].map((col: string) => ({
        label: col,
        value: col,
      }))
    : [{ label: "Please Choose From Source Table first", value: null }];

  const destinationColumnOptions = destinationTable
    ? tableColumns[destinationTable].map((col: string) => ({
        label: col,
        value: col,
      }))
    : [{ label: "Please Choose From Destination Table first", value: null }];

  return (
    <>
      <div className="col-12">
        <div className="grid">
          <div className="col-5">
            <div className="grid">
              <div className="col-12">
                <span style={{ color: "black" }}>Source Table</span>
                <Dropdown
                  className="w-full"
                  placeholder="Choose from List"
                  options={dropdownOptions}
                  onChange={(e) => setSourceTableOption(e.value)}
                  value={sourceTable}
                />
                <span>Relation</span>
                <Dropdown
                  className="w-full"
                  placeholder="Choose One"
                  options={Object.values(RelationOptions).map(
                    (relationValue) => ({
                      label: relationValue,
                      value: relationValue,
                    })
                  )}
                  onChange={(e) => setRelationOption(e.value)}
                  value={relationOption}
                />
                <span>Destination Table</span>
                <Dropdown
                  className="w-full"
                  placeholder="Choose One"
                  options={filteredColumnOptions}
                  onChange={(e) => setDestinationTableOption(e.value)}
                  value={destinationTable}
                />
              </div>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="col-5">
            <div className="grid">
              <div className="col-12">
                <span>Source Column</span>
                <Dropdown
                  className="w-full"
                  placeholder="Choose One"
                  options={sourceColumnOptions}
                  onChange={(e) => setsourceColumnOptions(e.value)}
                  value={sourceColumn}
                />
                <div style={{ marginTop: "60px" }} />
                <span>Destination Column</span>
                <Dropdown
                  className="w-full"
                  placeholder="Choose One"
                  options={destinationColumnOptions}
                  onChange={(e) => setDestinationColumnOptions(e.value)}
                  value={destinationColumn}
                />
                <div style={{ marginTop: "10px" }}></div>
                <Button
                  label="Add"
                  type="button"
                  size="small"
                  onClick={() => {
                    storeSelectedValues();

                    // Clear selected values
                    setSourceTableOption(null);
                    setDestinationTableOption(null);
                    setsourceColumnOptions(null);
                    setDestinationColumnOptions(null);
                    setRelationOption(null);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* {selectedValues && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Values:</h4>
          <pre>{JSON.stringify(selectedValues, null, 2)}</pre>
        </div>
      )} */}
      </div>
      <div className="col-12 text-right">
        <Button
          label="Next "
          type="button"
          className="ml-2"
          size="small"
          onClick={() => {
            onNext();
          }}
          outlined
        />
      </div>
    </>
  );
};

export default FactMappingDetail;
