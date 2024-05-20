import {request} from "@/global/api/request";
import {NotificationCountResponseApiType} from "@/global/api/notifications/types";

export async function getNotificationsApi(offset: number, limit: number): Promise<any> {
    try {
        return await request(`post-notifications?offset=${offset}&limit=${limit}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getNotificationsCountApi(): Promise<NotificationCountResponseApiType> {
    try {
        return await request(`post-notifications/unread/count`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function markNotificationAsReadApi(id: number ): Promise<NotificationCountResponseApiType> {
    try {
        return await request(`post-notifications/read/${id}`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
