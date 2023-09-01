import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Fieldset } from "primereact/fieldset";
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

  const tablesDataGrid = [{ field: "name", header: "Select any Table" }];

  const columnsDataGrid = [{ field: "columnName", header: "Select any Column" }];
  return (
    <>
      <div className="grid">
        <div className="col-6">
          <Fieldset legend="Fact Table Details"className="p-0" style={{ minHeight: '28rem'}}>
            <div className="col-12">
              <MultiSelect
                className="w-8"
                style={{ maxWidth: '21rem' }}
                filter
                filterInputAutoFocus={false}
                options={tables}
                value={selectedFactTable}
                onChange={(e) => {
                  setSelectedFactTable(e.value);
                  if (e.value.length === 0) {
                    setSelectedTableRow([]);
                    setSelectedColumns([]);
                    setSelectedColumnRow([]);
                  }
                }}
                optionLabel="name"
                display="chip"
                placeholder="Select Tables"
              />
            </div>
            {selectedFactTable.length > 0 ?
              <div className="col-12">
                <DataTable
                  value={selectedFactTable}
                  dataKey="name"
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  scrollable={true}
                  scrollHeight={"12rem"}
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
                      header={column.header}
                      field={column.field}
                      body={(rowData) => rowData[column.field]}
                    />
                  ))}
                </DataTable>
              </div> :
              <div className="col-12 grid justify-content-center align-content-center h-16rem p-5">
                <div className="bg-indigo-50" style={{ borderRadius: 'var(--border-radius)', padding: '3rem', color: "grey" }}>
                  Please select atleast one table
                </div>
              </div>
            }
          </Fieldset>
        </div>
        <div className="col-6">
          <Fieldset legend="Fact Column Details"className="pb-0" style={{ minHeight: '28rem' }} >
            <div className="col-12">
              <MultiSelect
                style={{ maxWidth: '21rem' }}
                className="w-8"
                filter
                filterInputAutoFocus={false}
                options={
                  selectedTableRow.length > 0
                    ? (selectedTableRow[0] as any).columns
                    : [{ columnName: "Please Select a table from the list", disabled: true }]
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
            {selectedColumns.length > 0 ?
              <div className="col-12">
                <DataTable
                  value={selectedColumns}
                  dataKey="columnName"
                  metaKeySelection={true}
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  scrollable={true}
                  scrollHeight={"12rem"}
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
                      header={column.header}
                      field={column.field}
                      body={(rowData) => rowData[column.field]}
                    />
                  ))}
                </DataTable>
              </div> :
              <div className="col-12 grid justify-content-center align-content-center h-16rem p-5">
                <div className="bg-indigo-50" style={{ borderRadius: 'var(--border-radius)', padding: '3rem', color: "grey" }}>
                  Please select atleast one column
                </div>
              </div>}
          </Fieldset>
        </div>
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
