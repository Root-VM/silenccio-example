import {RootState} from "@/global/store";
import {createSelector} from "reselect";
import {NotificationStoreInterface} from "@/modules/alerts/store/model";

const selectState = (state: RootState) => state.notification;

export const notificationsCountSelector = createSelector(selectState,
    (val: NotificationStoreInterface) => val?.count);

export const notificationsSelector = createSelector(selectState,
    (val: NotificationStoreInterface) => val?.notifications);
