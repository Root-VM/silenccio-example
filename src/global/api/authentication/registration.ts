import {
    RegisterConfirmRequestType,
    RegisterConfirmVerifyType,
    RegistrationResponseApiType
} from "@/global/api/authentication/types";
import {request} from "@/global/api/request";
import {RegistrationPersonalFormType} from "@/modules/authentication/componets/forms/personal-data-form/type";
import {RegistrationCompanyFormType} from "@/modules/authentication/componets/forms/company-data-form/type";

export async function registrationApi(data: {email: string, password: string, organisationName: string,
    recaptchaToken: string}):
    Promise<RegistrationResponseApiType | null> {
    try {
        return await request(`auth/register`, {
            method: 'POST',
            params: data,
            tokenType: "none"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function registrationPersonalDataApi(data: RegistrationPersonalFormType): Promise<any | null> {
    try {
        return await request(`auth/register/data`, {
            method: 'PUT',
            params: data,
            tokenType: "registration"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function registrationCompanyDataApi(data: RegistrationCompanyFormType): Promise<any | null> {
    try {
        return await request(`auth/register/organisation/data`, {
            method: 'PUT',
            params: data,
            tokenType: "registration"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function confirmEmailRequestApi(locale: string, email?: string): Promise<RegisterConfirmRequestType | null> {
    try {
        return await request(`auth/register/challenge/email/request`, {
            method: 'POST',
            params: email ? {email, language: locale } : {language: locale},
            tokenType: "registration"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function confirmEmailVerifyApi(code: string, challengeId: number): Promise<RegisterConfirmVerifyType | null> {
    try {
        return await request(`auth/register/challenge/email/verify`, {
            method: 'POST',
            params: { challengeId, code: String(code) },
            tokenType: "registration"

        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function confirmPhoneRequestApi(locale: string, phone: string): Promise<RegisterConfirmRequestType | null> {
    try {
        return await request(`auth/register/challenge/phone/request`, {
            method: 'POST',
            params: {phone, language: locale},
            tokenType: "registration"

    });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function confirmPhoneVerifyApi(code: string, challengeId: number): Promise<RegisterConfirmVerifyType | null> {
    try {
        return await request(`auth/register/challenge/phone/verify`, {
            method: 'POST',
            params: { challengeId, code: String(code) },
            tokenType: "registration"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function registrationFinalizeApi(): Promise<any | null> {
    try {
        return await request(`auth/register/finalize`, {
            method: 'POST',
            params: {},
            tokenType: "registration"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
