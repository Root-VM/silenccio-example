import {LoginOrganisationsResponseApiType, LoginResponseApiType} from "@/global/api/login/types";
import {request} from "@/global/api/request";

export async function loginApi(email: string, password: string, recaptchaToken: string): Promise<LoginResponseApiType | null> {
    try {
        return await request(`auth/login`, {
            method: 'POST',
            params: {email, password, recaptchaToken},
            tokenType: "none"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}


export async function loginOrganisationsApi(): Promise<LoginOrganisationsResponseApiType | null> {
    try {
        return await request(`auth/login/challenge/organisations`, {
            method: 'GET',
            tokenType: "challenge"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function loginNewApi(): Promise<{ "id": number, "expiresAt": string } | null> {
    try {
        return await request(`auth/login/challenge/new`, {
            method: 'POST',
            tokenType: "challenge",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function loginVerifyApi(challengeId: number, code: string, organisationId: number):
    Promise<{ access: {"token": string, type: string, "expiresAt": string}, refresh: {"token": string, type: string, "expiresAt": string} } | null> {
    try {
        return await request(`auth/login/challenge/verify`, {
            method: 'POST',
            tokenType: "challenge",
            params: {challengeId, code, organisationId}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}


