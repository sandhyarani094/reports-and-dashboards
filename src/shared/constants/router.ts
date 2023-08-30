export class RouterPath {
    static readonly LOGIN = "/auth/login"
    static readonly Dashboard = "/dashboard"
    static readonly Connection = "/connection"
    static readonly Cube = "/cube"
    static readonly Components = "/components";
    static readonly CREATE_CONNECTION = "/connection/createConnection";
}

export const pathList = [
    {
        pathName: "connection",
        displayName: "Connection"
    },
    {
        pathName: "cube",
        displayName: "Cube"
    },
    {
        pathName: "components",
        displayName: "Components"
    },
    {
        pathName: "dashboard",
        displayName: "Dashboard"
    },
    {
        pathName: "createConnection",
        displayName: "Create Connection"
    }
]
