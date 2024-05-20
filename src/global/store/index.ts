import {init, Models, Plugin, RematchDispatch, RematchRootState} from "@rematch/core"
import createPersistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';
import {common} from "@/global/store/common/model";
import {authentication} from "@/modules/authentication/store/model";
import {loginChallenge} from "@/modules/login/store/model";
import {monitoring} from "@/modules/monitoring/store/model";
import {payment} from "@/global/store/payment/model";
import {notification} from "@/modules/alerts/store/model";
import {phishing} from "@/modules/phishing/store/model";
import {dashboard} from "@/modules/dashboard/store/model";
import {profile} from "@/modules/profile/store/model";

export interface RootModel extends Models<RootModel> {
    common: typeof common,
    authentication: typeof authentication,
    loginChallenge: typeof loginChallenge,
    monitoring: typeof monitoring,
    payment: typeof payment,
    notification: typeof notification,
    phishing: typeof phishing,
    dashboard: typeof dashboard,
    profile: typeof profile
}

const models: RootModel = { common, authentication, loginChallenge, monitoring, payment, notification,
    phishing, dashboard, profile }

const persistPlugin: Plugin<RootModel> = createPersistPlugin({
    key: 'root',
    storage,
    version: 1,
    whitelist: ['common', 'authentication', 'loginChallenge', 'monitoring', 'payment', 'notification', 'phishing', 'dashboard', 'profile'],
});
export const store = init({
    models,
    plugins: [persistPlugin],
    redux: {
        rootReducers: { RESET_APP: () => undefined }
    }
});

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

