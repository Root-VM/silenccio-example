import {requestFile} from "@/global/api/request";

export async function exportFindingsApi(data: {body: string, header: string, footer: string}): Promise<any> {
    try {
        return await requestFile(`organisation/findings/export`, {
            method: 'POST',
            params: {
                body: data.body,
                "header": data.header,
                "footer": data.footer,
                marginBottom: 90,
                marginTop: 90
            },
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
