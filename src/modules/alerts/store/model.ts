import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";
import {getNotificationsApi, getNotificationsCountApi} from "@/global/api/notifications";
import {NotificationResponseApiType} from "@/global/api/notifications/types";

export interface NotificationStoreInterface{
    notifications: NotificationResponseApiType[];
    count: number
}

const initialState: NotificationStoreInterface = {
    notifications: [],
    count: 0
};

export const  notification = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setNotifications: (state: NotificationStoreInterface, payload) => {
            return { ...state, notifications: payload };
        },
        setNotificationCount: (state: NotificationStoreInterface, payload) => {
            return { ...state, count: payload };
        },
    },
    effects: (dispatch) => ({
        async getNotificationCount() {
            try {
                const request = await getNotificationsCountApi();

                dispatch.notification.setNotificationCount(request?.count ? request?.count : 0);
            } catch (e) {
                console.log(e)
            }
        },
        async getNotification() {
            try {
                const request = await getNotificationsApi(0, 50);

                dispatch.notification.setNotifications(request?.length ? request : []);
            } catch (e) {
                console.log(e)
            }
        }
    }),

})
