import { AppMenuItem } from "@/types/layout";
import { RouterPath } from "./router";

export const sidemenu: AppMenuItem[] = [
    {
        label: 'Connection',
        items: [{
            label: 'Connection',
            icon: 'pi pi-fw pi-database',
            to: RouterPath.Connection
        }]
    },
    {
        label: 'Cube',
        items: [{
            label: 'Cube',
            icon: 'pi pi-fw pi-box',
            to: RouterPath.Cube
        }]
    },
    {
        label: 'Components',
        items: [{
            label: 'Components',
            icon: 'pi pi-fw pi-folder-open',
            to: RouterPath.Components
        }]
    },
    {
        label: 'Dashboard',
        items: [{
            label: 'Dashboard',
            icon: 'pi pi-fw pi-list',
            to: RouterPath.Dashboard
        }]
    }
    ,
];