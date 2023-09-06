import type { AppProps } from 'next/app';
import type { Page } from '../types/types';
import React, { useEffect } from 'react';
import 'primereact/resources/primereact.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/layout/_config.scss';
import '../styles/global/global.css'
import { useRouter } from 'next/router';
import { RouterPath } from '@/shared/constants/router';
import { Card } from 'primereact/card';
import Link from 'next/link';
import { BreadCrumb } from 'primereact/breadcrumb';
import { getPathNames } from '@/shared/constants/services/utilService';
import { usePathname } from 'next/navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LayoutProvider } from '@/common-layouts/context/layoutcontext';
import { ToastProvider } from '@/common-layouts/context/toasterContext';
import Layout from '@/common-layouts/layout/layout';

type Props = AppProps & {
    Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
    const router = useRouter();
    const path = usePathname();
    const allPaths = () => {
        let data = getPathNames(path);
        return data.map((element: any) => {
            return {
                template: <Link href={element.pathName} style={{ color: "black" }}>{element.displayName}</Link>
            }
        })
    }
    useEffect(() => {
        if (router.pathname == "/") {
            router.push(RouterPath.LOGIN)
        }
    }, [router, router.pathname])

    if (Component.getLayout) {
        return (
        <DndProvider backend={HTML5Backend}>
            <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>
        </DndProvider>
        );
    } else {
        return (
            <DndProvider backend={HTML5Backend}>
                <LayoutProvider>
                    <ToastProvider>
                        <Layout>
                            <Card>
                                <div className="grid">
                                    <div className="col-12">
                                        <BreadCrumb className='mb-3' model={allPaths()} home={{ template: <Link className='pi pi-home' href={RouterPath.Connection} style={{ color: "black" }}></Link> }} />
                                    </div>
                                </div>
                                <Component {...pageProps} />
                            </Card>
                        </Layout>
                    </ToastProvider>
                </LayoutProvider>
            </DndProvider>
        );
    }
}
