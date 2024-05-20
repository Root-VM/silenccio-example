import {request} from "@/global/api/request";

export async function getAccountDataApi(): Promise<any | null> {
    try {
        return await request(`accounts/me`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getAccountOrganisationDataApi(): Promise<any | null> {
    try {
        return await request(`accounts/me/organisations`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function changeAccountDataApi(data: any): Promise<any | null> {
    try {
        return await request(`accounts/me/data`, {
            method: 'PATCH',
            tokenType: "login",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

