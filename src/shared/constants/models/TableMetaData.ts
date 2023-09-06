export class TableMetaData {
    id: number;
    tableName: string = "";
    displayName: string = "";
    standardTable: boolean = false;
    columns: ColumnMetaData[] = [];
}
export class ColumnMetaData {
    id: number;
    columnName: string = "";
    headerName: string = "";
    dataType: string = "";
    constraints: string = "";
}