import { ColumnMetaData, TableMetaData } from "./TableMetaData";

export class FactMappingData {
    sourceTable: TableMetaData = new TableMetaData();
    joinType: string = '';
    destinationTable: TableMetaData = new TableMetaData();
    sourceColumn: ColumnMetaData = new ColumnMetaData();
    destinationColumn: ColumnMetaData = new ColumnMetaData();
    alias: string = '';
}
export class MappingTable {
    dimensionTable: TableMetaData = new TableMetaData();
    dimensionColumn: ColumnMetaData = new ColumnMetaData();
    factColumn: ColumnMetaData = new ColumnMetaData();
    joinType: string = '';
}
export class Factdetails {
    factTables: TableMetaData [] = [];
    selectedFactTable: TableMetaData [] = [];
    factColumns: ColumnMetaData [] = [];
    selectedFactColumn: ColumnMetaData [] = [];
}