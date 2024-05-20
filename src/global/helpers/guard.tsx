"use client";
import { useEffect } from "react";
import {getLoginToken} from "@/global/api/tokens";
import {getLoginUrl} from "@/global/helpers/url-generator";
import {useRouter} from "next/router";

export default function isAuth(Component: any) {

    return function IsAuth(props: any) {
        const auth = getLoginToken();
        const router = useRouter();

        useEffect(() => {
            if (!auth) {
                router.push(getLoginUrl()).then();
                return;
            }
        }, []);


        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}
