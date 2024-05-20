import {GetStaticPropsContext} from "next";

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../global/data/locale/${locale}.json`)).default
        }
    };
}

export async function getServerSideProps({locale}: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../global/data/locale/${locale}.json`)).default
        }
    };
}
