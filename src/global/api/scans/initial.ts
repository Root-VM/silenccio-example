import {request} from "@/global/api/request";

export async function initialScanApi(): Promise<void> {
    try {
        return await request(`organisation/scans/free/initial`, {
            method: 'POST',
            params: {},
            tokenType: "access"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
