import {OrganisationResponseApiType} from "@/global/api/organisation/types";
import {request} from "@/global/api/request";

export async function getQuestionnaireApi(): Promise<any | null> {
    try {
        return await request(`organisation/questionnaire`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
