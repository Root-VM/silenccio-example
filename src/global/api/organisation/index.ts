import {request} from "@/global/api/request";
import {OrganisationResponseApiType} from "@/global/api/organisation/types";
import {MonitoringStoreInterface} from "@/modules/monitoring/store/model";

export async function getOrganisationApi(): Promise<OrganisationResponseApiType | null> {
    try {
        return await request(`organisation`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}


export async function getOrganisationWebApi(): Promise<Array<MonitoringStoreInterface["web"]> | null> {
    try {
        return await request(`organisation/assets/web`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getOrganisationEmailApi(): Promise<MonitoringStoreInterface["email"] | null> {
    try {
        return await request(`organisation/assets/email`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getOrganisationEmailServerApi(): Promise<MonitoringStoreInterface["email"] | null> {
    try {
        return await request(`organisation/assets/email-server`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        return [];
        // throw new Error(e);
    }
}

export async function putOrganisationEmailApi(data:{email: string, id: number, domain: string }): Promise<MonitoringStoreInterface["web"] | null> {
    try {
        return await request(`organisation/assets/email-server/${data.id}`, {
            method: 'PUT',
            tokenType: "login",
            params: {sender: data.email, domain: data.domain}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function addOrganisationEmailApi(email: string, domain: string): Promise<void | null> {
    try {
        return await request(`organisation/assets/email-server`, {
            method: 'POST',
            params: {sender: email, domain},
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function addOrganisationEmailAccessApi(email: string, domain: string): Promise<void | null> {
    try {
        return await request(`organisation/assets/email-server`, {
            method: 'POST',
            params: {sender: email, domain},
            tokenType: "access"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function addOrganisationPhoneApi(phone: string, name: string
): Promise<any | null> {
    try {
        return await request(`organisation/assets/phone`, {
            method: 'POST',
            tokenType: "login",
            params: {phone, name}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getOrganisationPhonesApi(): Promise<any | null> {
    try {
        return await request(`organisation/assets/phone`, {
            method: 'GET',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function deleteOrganisationPhonesApi(id: number ): Promise<any | null> {
    try {
        return await request(`organisation/assets/phone/${id}`, {
            method: 'DELETE',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
