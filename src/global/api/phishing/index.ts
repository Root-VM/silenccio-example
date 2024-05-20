import {request} from "@/global/api/request";
import {
    CampaignResponseApiType,
    EmployeeRequestApiType,
    EmployeeResponseApiType,
    PresetResponseApiType
} from "@/global/api/phishing/types";



export async function getPresetsApi(): Promise<PresetResponseApiType[]> {
    try {
        return await request(`organisation/assets/employee/campaign/presets`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function addEmployeeApi(data: EmployeeRequestApiType): Promise<PresetResponseApiType[]> {
    try {
        return await request(`organisation/assets/employee`, {
            method: 'POST',
            tokenType: "login",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function updateEmployeeApi(id: number, data: EmployeeRequestApiType): Promise<PresetResponseApiType[]> {
    try {
        return await request(`organisation/assets/employee/${id}`, {
            method: 'PUT',
            tokenType: "login",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function deleteEmployeeApi(id: number): Promise<any> {
    try {
        return await request(`/organisation/assets/employee/${id}`, {
            method: 'DELETE',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getEmployeeApi(): Promise<EmployeeResponseApiType[]> {
    try {
        return await request(`organisation/assets/employee`, {
            method: 'GET',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function campaignInitApi(data: any): Promise<any> {
    try {
        return await request(`organisation/assets/employee/campaign/init`, {
            method: 'POST',
            tokenType: "login",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function campaignCompleteApi(): Promise<any> {
    try {
        return await request(`organisation/assets/employee/campaign/current/complete`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function currentCampaignInitApi(): Promise<CampaignResponseApiType> {
    try {
        return await request(`organisation/assets/employee/campaign/current`, {
            method: 'GET',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getCampaignByIDApi(campaignId: number): Promise<CampaignResponseApiType> {
    try {
        return await request(`organisation/assets/employee/campaign/specific/${campaignId}`, {
            method: 'GET',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getCampaignListApi(): Promise<any> {
    try {
        return await request(`organisation/assets/employee/campaign`, {
            method: 'GET',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
