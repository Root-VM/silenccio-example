import {errorAlert} from "@/global/helpers/error-alert";
import {getAccessToken, getChallengeToken, getLoginToken, getRegisterToken} from "@/global/api/tokens";
import {getTranslationFromFile} from "@/global/helpers/get-translation-native";
import {getLocaleFromUrl} from "@/global/helpers/get-lang-native";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type RequestParams = Record<string, string | number> | Record<string, string[] | any>;

export interface RequestConfig {
    method?: RequestMethod;
    params?: RequestParams;
    tokenType: 'registration' | 'login' | 'none' | 'access' | 'challenge';
    fullUrl?: string;
}

export async function request(url: string, config?: RequestConfig) {
    const { method = 'GET', params } = config || ({} as RequestConfig);
    const baseURL = config?.fullUrl ? config?.fullUrl : `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
    let token: string | null;

    if(config?.tokenType === 'login') {
        token = getLoginToken();
    } else if(config?.tokenType === 'registration') {
        token = getRegisterToken();
    } else if(config?.tokenType === 'access') {
        token = getAccessToken();
    } else if(config?.tokenType === 'challenge') {
        token = getChallengeToken()
    } else {
        token = null;
    }

    const response: any = await fetch(baseURL, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(!!token) && {Authorization: `Bearer ${token}`}
        },
        method,
        body: params && JSON.stringify(params),
    });

    if(response?.status === 204) {
        return await response.text();
    }

    const data = await response.json();

    if (!response.ok) {
        if(data?.statusCode === 401) {
            window.localStorage.removeItem('loginToken');
            const translation = await getTranslationFromFile("ERRORS." + data.code, getLocaleFromUrl())
            translation && errorAlert(translation);

            throw new Error(data);
        }

        if(data?.statusCode === 404) {
            throw new Error(data);
        }

        if(data?.statusCode && data?.code) {
            if(typeof data?.code === 'string') {
                const translation = await getTranslationFromFile("ERRORS." + data.code, getLocaleFromUrl())
                translation && errorAlert(translation);
            }
        }

        throw new Error(data);
    }

    return data;
}

export async function requestFile(url: string, config?: RequestConfig) {
    const { method = 'GET', params } = config || ({} as RequestConfig);
    const baseURL = config?.fullUrl ? config?.fullUrl : `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
    let token: string | null;

    if(config?.tokenType === 'login') {
        token = getLoginToken();
    } else if(config?.tokenType === 'registration') {
        token = getRegisterToken();
    } else if(config?.tokenType === 'access') {
        token = getAccessToken();
    } else if(config?.tokenType === 'challenge') {
        token = getChallengeToken()
    } else {
        token = null;
    }

    const response: any = await fetch(baseURL, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(!!token) && {Authorization: `Bearer ${token}`}
        },
        method,
        body: params && JSON.stringify(params),
    });

    const contentType = response.headers.get('content-type');


    if (contentType && contentType.includes('application/pdf')) {
        return response.blob();
    }


    const data = await response.json();
    if (!response.ok) {
        if(data?.statusCode === 401) {
            window.localStorage.removeItem('loginToken');
            const translation = await getTranslationFromFile("ERRORS." + data.code, getLocaleFromUrl())
            translation && errorAlert(translation);

            throw new Error(data);
        }

        if(data?.statusCode === 404) {
            throw new Error(data);
        }

        if(data?.statusCode && data?.code) {
            if(typeof data?.code === 'string') {
                const translation = await getTranslationFromFile("ERRORS." + data.code, getLocaleFromUrl())
                translation && errorAlert(translation);
            }
        }

        throw new Error(data);
    }

    return data;
}
