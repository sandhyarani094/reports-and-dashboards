import { Connection } from "./Connection";
import { ColumnMetaData, TableMetaData } from "./TableMetaData";


export class CubeDetails {
    cubeName: string = "";
    connectionId?:string="";
    cubeFactList: Factdetails = new Factdetails();
    cubeFactMappingList: FactMappingData[] = [];
    cubeDimensionList: Factdetails = new Factdetails();
    cubeFactDimensionMappingList: DimesionMapping[] = [];
}
export class DataSource {
    cubeName: string = "";
    datasource: Connection = new Connection();
}

export class FactTable {
    id: number;
    tableName: string = "";
    columns: ColumnMetaData[] = [];
}
export class Factdetails {
    factTables: TableMetaData[] = [];
    selectedFactTable: TableMetaData = new TableMetaData();
    cubeFactDetails: FactTable[] =[]; 
    selectedFactColumns: ColumnMetaData[] = [];
    selectedFactTables: any = {};
}
export class FactMappingData {
    id: number;
    sourceTable: TableMetaData = new TableMetaData();
    sourceColumn: ColumnMetaData = new ColumnMetaData();
    relation: string = '';
    destinationTable: TableMetaData = new TableMetaData();
    destinationColumn: ColumnMetaData = new ColumnMetaData();
    aliasName: string = '';
}
export class DimesionMapping {
    factColumn: ColumnMetaData = new ColumnMetaData();
    joinType: string = '';
    dimTable: TableMetaData = new TableMetaData();
    dimColumn: ColumnMetaData = new ColumnMetaData();
}
