import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
interface FactTableProps {
  onNext: Function;
}
const FactTable: React.FC<FactTableProps> = ({ onNext }) => {
  const tables = [
    {
      name: "Account",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
    {
      name: "Pricebook",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
    {
      name: "Lead",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
    {
      name: "Student",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
    {
      name: "Department",
      columns: [{ columnName: "Created by" }, { columnName: "Updated by" }],
    },
  ];
  const [selectedFactTable, setSelectedFactTable] = useState([]);
  const [selectedTableRow, setSelectedTableRow] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedColumnRow, setSelectedColumnRow] = useState([]);

  const tablesDataGrid = [{ field: "name", header: "Table Name" }];

  const columnsDataGrid = [{ field: "columnName", header: "Column Name" }];
  return (
    <>
      <div className="grid">
        <div
          className={selectedTableRow.length > 0 ? "col-6" : "col-12"}
          style={{ transition: "0.2s ease" }}
        >
          <div className="col-12 text-right">
            <MultiSelect
              className={selectedTableRow.length > 0 ? "w-4" : "w-2"}
              options={tables}
              value={selectedFactTable}
              onChange={(e) => {
                setSelectedFactTable(e.value);
                if (e.value.length === 0) {
                  setSelectedTableRow([]);
                }
              }}
              optionLabel="name"
              display="chip"
              placeholder="Select Tables"
            />
          </div>
          <div className="col-12">
            <DataTable
              value={selectedFactTable}
              dataKey="name"
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              scrollable={true}
              scrollHeight={"20rem"}
              metaKeySelection={true}
              selectionMode="multiple"
              selection={selectedTableRow}
              onSelectionChange={(e) => {
                if (selectedFactTable.length > 0) {
                  setSelectedTableRow(e.value);
                  setSelectedColumns([]);
                  setSelectedColumnRow([]);
                } else {
                  setSelectedColumns([]);
                  setSelectedTableRow([]);
                }
              }}
            >
              {tablesDataGrid.map((column, index) => (
                <Column
                  key={index}
                  field={column.field}
                  header={column.header}
                  body={(rowData) => rowData[column.field]}
                />
              ))}
            </DataTable>
          </div>
        </div>
        {selectedTableRow.length > 0 ? (
          <>
            <div className="col-6">
              <div className="col-12 text-right">
                <MultiSelect
                  className={"w-4"}
                  options={
                    selectedTableRow.length > 0
                      ? selectedTableRow[0].columns
                      : []
                  }
                  value={selectedColumns}
                  onChange={(e) => {
                    setSelectedColumns(e.value);
                    if (e.value.length === 0) {
                      setSelectedColumnRow([]);
                    }
                  }}
                  optionLabel="columnName"
                  display="chip"
                  placeholder="Select columns"
                />
              </div>
              <div className="col-12">
                <DataTable
                  className="text-center"
                  value={selectedColumns}
                  dataKey="columnName"
                  metaKeySelection={true}
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  scrollable={true}
                  scrollHeight={"25rem"}
                  selectionMode="multiple"
                  selection={selectedColumnRow}
                  onSelectionChange={(e) => {
                    if (selectedColumns.length > 0) {
                      setSelectedColumnRow(e.value);
                    } else {
                      setSelectedColumnRow([]);
                    }
                  }}
                >
                  {columnsDataGrid.map((column, index) => (
                    <Column
                      key={index}
                      field={column.field}
                      header={column.header}
                      body={(rowData) => rowData[column.field]}
                    />
                  ))}
                </DataTable>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className="col-12 text-right">
        <Button
          label="Save "
          type="submit"
          className="ml-2"
          size="small"
          onClick={() => {
            // handleSave(values);
          }}
        />
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

export default FactTable;
