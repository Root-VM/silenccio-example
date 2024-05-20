import {request} from "@/global/api/request";
import {creditCardApiType} from "@/global/api/card/types";

export async function postCreditCardApi(data:{popupLanguage: 'en-US' | 'de-DE' | 'fr-FR' | 'it-IT' , name: string}): Promise<any> {
    try {
        return await request(`organisation/assets/credit-card`, {
            method: 'POST',
            params: {popupLanguage: data.popupLanguage, name: data.name},
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getCreditCardApi(): Promise<creditCardApiType[]> {
    try {
        return await request(`organisation/assets/credit-card`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function putCreditCardLinkApi(assetId: string, token: string): Promise<creditCardApiType[]> {
    try {
        return await request(`organisation/assets/credit-card/${assetId}/link`, {
            method: 'PUT',
            params: {creditCardToken: token},
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
