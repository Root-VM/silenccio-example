import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";
import {RegisterConfirmRequestType} from "@/global/api/authentication/types";
import {
    addOrganisationEmailAccessApi,
    addOrganisationEmailApi,
    putOrganisationEmailApi
} from "@/global/api/organisation";

export interface AuthenticationStoreInterface{
    email: string,
    company: string,
    phone: string,
    phone_code: string,
    phone_data: string,
    emailConfirmChallenge: RegisterConfirmRequestType,
    phoneConfirmChallenge: RegisterConfirmRequestType,
    onboarding_data: any
}

const initialState: AuthenticationStoreInterface = {
    email: '',
    company: '',
    phone: '',
    phone_code: '41',
    phone_data: '',
    emailConfirmChallenge: {
        "id": 0,
        "expiresAt": "",
    },
    phoneConfirmChallenge: {
        "id": 0,
        "expiresAt": "",
    },
    onboarding_data: {
        websiteHasLogin: '',
        websiteHasContactForm: '',
        websiteHasPayment: '',
        websiteLoginLink: ''
    }
};

export const authentication = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setEmail: (state: AuthenticationStoreInterface, payload) => {
            return { ...state, email: payload };
        },
        setCompany: (state: AuthenticationStoreInterface, payload) => {
            return { ...state, company: payload };
        },
        setPhone: (state: AuthenticationStoreInterface, payload) => {
            return { ...state, phone: payload };
        },
        setPhoneCode: (state: AuthenticationStoreInterface, payload) => {
            return { ...state, phone_code: payload };
        },
        setPhoneData: (state: AuthenticationStoreInterface, payload) => {
            return { ...state, phone_data: payload };
        },
        setEmailChallenge: (state: AuthenticationStoreInterface, payload) => {
            return { ...state, emailConfirmChallenge: payload };
        },
        setPhoneChallenge: (state: AuthenticationStoreInterface, payload) => {
            return { ...state, phoneConfirmChallenge: payload };
        },
        setOnboardingData: (state: AuthenticationStoreInterface, payload) => {
            return { ...state, onboarding_data: {...state.onboarding_data, ...payload} };
        },
        setDefault() {
            return initialState;
        }
    },
    effects: (dispatch) => ({
        changeEmail(email: string) {
            dispatch.authentication.setEmail(email);
        },
        changeCompany(data: string) {
            dispatch.authentication.setCompany(data);
        },
        changePhone(phone: string) {
            dispatch.authentication.setPhone(phone);
        },
        changePhoneCode(phone: string) {
            dispatch.authentication.setPhoneCode(phone);
        },
        changePhoneData(phone: string) {
            dispatch.authentication.setPhoneData(phone);
        },
        changeEmailChallenge(data: RegisterConfirmRequestType) {
            dispatch.authentication.setEmailChallenge(data);
        },
        changePhoneChallenge(data: RegisterConfirmRequestType) {
            dispatch.authentication.setPhoneChallenge(data);
        },
        changeOnboardingData(data: any) {
            dispatch.authentication.setOnboardingData(data);
        },
        clearAll()  {
            dispatch.authentication.setDefault();
        },
        async addEmail(data: {email: string, domain: string}) {
            try {
                const request: any = await addOrganisationEmailAccessApi(data.email, data.domain);

                dispatch.monitoring.setEmail(request?.id ? [request] : []);
                return 'ok';
            } catch (e) {
                console.log(e);
            }
        }
    }),
})
