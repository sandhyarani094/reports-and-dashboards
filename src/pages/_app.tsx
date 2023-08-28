import type { AppProps } from 'next/app';
import type { Page } from '../types/types';
import React, { useEffect } from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/layout/_config.scss';
import { useRouter } from 'next/router';
import { RouterPath } from '@/shared/constants/router';
import LoginPage from './auth/login';

type Props = AppProps & {
    Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
    const router = useRouter();
    useEffect(()=> {
        if(router.pathname == "/") {
            router.push(RouterPath.LOGIN)
        }
    }, [router, router.pathname])

    if (Component.getLayout) {
        return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
    } else {
        return (
            <LayoutProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LayoutProvider>
        );
    }
}
