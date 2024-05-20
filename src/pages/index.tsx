import type { NextPage } from 'next';
import {useRouter} from "next/router";
import {useEffect} from "react";
import {getDashboardUrl, getLoginUrl} from "@/global/helpers/url-generator";
import {getLoginToken} from "@/global/api/tokens";

const IndexPage: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(getLoginToken() ? getDashboardUrl() :  getLoginUrl()).then();
    }, []);

    return <></>;
};

export default IndexPage;
