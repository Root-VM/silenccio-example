"use client";

import { AppProps } from 'next/app';

import Head from "next/head";
import {ChakraProvider, Spinner} from "@chakra-ui/react";
import {chakraTheme} from "@/global/helpers/chakra-theme";
import {Provider} from 'react-redux';

import 'normalize.css';
import 'react-dropdown/style.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import 'react-toastify/dist/ReactToastify.css';
import '@/global/styles/fonts.scss';
import '@/global/styles/global.scss';
import '@/global/styles/global-media.scss';

import {store} from "@/global/store";
import {ToastContainer} from "react-toastify";
import {NextIntlClientProvider} from "next-intl";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import HelperProvider from "@/global/components/helper-provider";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import ReactGA from 'react-ga';


const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const [isRenderedOnClient, setIsRenderedOnClient] = useState(false)

    useEffect(() => {
        setIsRenderedOnClient(true);
    }, [])

    useEffect(() => {
        ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACK_ID as string, { debug: true });
        ReactGA.pageview(window.location.pathname + window.location.search);

        const handleRouteChange = () => {
            ReactGA.event({
                category: 'User',
                action: 'move'
            });
            ReactGA.pageview(window.location.pathname + window.location.search);
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    const renderServerSide = () => (
        <div className={'mainLoading'}><Spinner size='xl'/></div>
    );

    const renderClientSide = () => (
        <NextIntlClientProvider
            locale={router.locale}
            timeZone="Europe/Vienna"
            messages={pageProps.messages}
        >
            <Head>
                <link rel="shortcut icon" type="image/png" href="/img/logo.svg"/>
                <title>CYBER PREVENTION</title>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
            </Head>
            <Provider store={store}>
                <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_SITE_KEY as string}>
                    <ChakraProvider theme={chakraTheme}>
                        <Component {...pageProps} />
                    </ChakraProvider>
                    <ToastContainer/>
                    <HelperProvider/>
                </GoogleReCaptchaProvider>
            </Provider>
        </NextIntlClientProvider>
    );

    return isRenderedOnClient ? renderClientSide() : renderServerSide();

};

export default App;
