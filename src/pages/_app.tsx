import { AppProps } from 'next/app';
import 'normalize.css';
import 'react-dropdown/style.css';
import '@/global/styles/fonts.scss';
import '@/global/styles/global.scss';
import '@/global/styles/global-media.scss';
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/react";
import {chakraTheme} from "@/global/hooks/chakra-theme";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" type="image/png" href="/img/logo.svg" />
                <title>Silenccio</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
            </Head>

            <ChakraProvider theme={chakraTheme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
};

export default App;
