import {request} from "@/global/api/request";

export async function onboardingSetWebApi(url: string): Promise<void | null> {
    try {
        return await request(`organisation/assets/web`, {
            method: 'POST',
            params: {url},
            tokenType: "access"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function onboardingGetWebApi(): Promise<any | null> {
    try {
        return await request(`organisation/assets/web`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function onboardingGetWebAccessApi(): Promise<any | null> {
    try {
        return await request(`organisation/assets/web`, {
            method: 'GET',
            tokenType: "access"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function editSetWebApi(data:{url: string, id: number}): Promise<any | null> {
    try {
        return await request(`organisation/assets/web/${data.id}`, {
            method: 'PUT',
            params: {url: data.url},
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function addSetWebApi(url: string): Promise<void | null> {
    try {
        return await request(`organisation/assets/web`, {
            method: 'POST',
            params: {url},
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function editQuestionnaireApi(data: {
    websiteHasLogin?: string,
    websiteHasContactForm?: string,
    websiteHasPayment?: string,
    websiteLoginLink?: string
}): Promise<any | null> {
    try {
        return await request(`organisation/questionnaire`, {
            method: 'PUT',
            params: {...data},
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function onboardingSetDataApi(data: {
    websiteHasLogin?: string,
    websiteHasContactForm?: string,
    websiteHasPayment?: string,
    websiteLoginLink?: string
}): Promise<void | null> {
    try {
        return await request(`organisation/questionnaire`, {
            method: 'PUT',
            params: {...data},
            tokenType: "access"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function onboardingSetEmailApi(email: string): Promise<void | null> {
    try {
        return await request(`organisation/assets/email`, {
            method: 'POST',
            params: {email, name: ''},
            tokenType: "access"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
