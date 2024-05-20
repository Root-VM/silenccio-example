import {request} from "@/global/api/request";

export async function getWebFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/asset/web/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getEmailFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/asset/email/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getEmailServerFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/asset/email-server/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getPhoneFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/asset/phone/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getCreditCardFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/asset/creditcard/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}



export async function getFreeWebFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/free/web/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getFreeEmailFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/free/email/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function getFreeEmailServerFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/free/email-server/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getFreePhoneFindingApi(assetId: number): Promise<any> {
    try {
        return await request(`organisation/findings/free/phone/${assetId}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getLastFreeScanApi(): Promise<any> {
    try {
        return await request(`organisation/scans/free/latest`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getLastPaidScanApi(): Promise<any> {
    try {
        return await request(`organisation/scans/latest`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function ignoreEmailScanApi(findingId: number, status: "ACTIVE" | "IGNORED" ): Promise<any> {
    try {
        return await request(`organisation/findings/email/${findingId}/status`, {
            method: 'PATCH',
            tokenType: "login",
            params: {status}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function ignoreEmailServerScanApi(findingId: number, status: "ACTIVE" | "IGNORED"): Promise<any> {
    try {
        return await request(`/organisation/findings/email-server/${findingId}/status`, {
            method: 'PATCH',
            tokenType: "login",
            params: {status}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function ignoreWebScanApi(findingId: number, status: "ACTIVE" | "IGNORED"): Promise<any> {
    try {
        return await request(`/organisation/findings/web/${findingId}/status`, {
            method: 'PATCH',
            tokenType: "login",
            params: {status}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function ignoreCreditcardScanApi(findingId: number, status: "ACTIVE" | "IGNORED"): Promise<any> {
    try {
        return await request(`/organisation/findings/creditcard/${findingId}/status`, {
            method: 'PATCH',
            tokenType: "login",
            params: {status}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function ignorePhoneScanApi(findingId: number, status: "ACTIVE" | "IGNORED"): Promise<any> {
    try {
        return await request(`/organisation/findings/phone/${findingId}/status`, {
            method: 'PATCH',
            tokenType: "login",
            params: {status}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function supportEmailScanApi(findingId: number): Promise<any> {
    try {
        return await request(`organisation/findings/request-support/email/${findingId}`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function supportEmailServerScanApi(findingId: number): Promise<any> {
    try {
        return await request(`organisation/findings/request-support/email-server/${findingId}`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function supportWebScanApi(findingId: number): Promise<any> {
    try {
        return await request(`organisation/findings/request-support/web/${findingId}`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function supportCreditcardScanApi(findingId: number): Promise<any> {
    try {
        return await request(`organisation/findings/request-support/creditcard/${findingId}`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function supportPhoneScanApi(findingId: number): Promise<any> {
    try {
        return await request(`organisation/findings/request-support/phone/${findingId}`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
