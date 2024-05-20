import {request} from "@/global/api/request";

export async function passwordResetApi(email: string, recaptchaValue: string): Promise<any | null> {
    try {
        return await request(`auth/reset-password`, {
            method: 'POST',
            params: {email, recaptchaToken: recaptchaValue},
            tokenType: "none"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }

    return null;
}

export async function passwordResetNewApi(url: string, password: string): Promise<any | null> {
    try {
        return await request(`auth/reset-password`, {
            method: 'POST',
            params: {password},
            tokenType: "none",
            fullUrl: url
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }

    return null;
}

export async function editPasswordApi(data: any): Promise<any | null> {
    try {
        return await request(`accounts/me/change/password`, {
            method: 'POST',
            params: {...data},
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
