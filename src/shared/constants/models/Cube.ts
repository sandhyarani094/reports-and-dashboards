import { ColumnMetaData, TableMetaData } from "./TableMetaData";

export class FactMappingData {
    sourceTable: TableMetaData = new TableMetaData();
    relationOption: string ='';
    destinationTable: TableMetaData = new TableMetaData();
    sourceColumn: ColumnMetaData = new ColumnMetaData();
    destinationColumn: ColumnMetaData = new ColumnMetaData();
}
