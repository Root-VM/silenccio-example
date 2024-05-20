import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";
import {
    addOrganisationEmailApi,
    getOrganisationEmailApi, getOrganisationEmailServerApi,
    getOrganisationPhonesApi,
    getOrganisationWebApi,
    putOrganisationEmailApi
} from "@/global/api/organisation";
import {
    addSetWebApi,
    editQuestionnaireApi,
    editSetWebApi
} from "@/global/api/authentication/onboarding";
import {getQuestionnaireApi} from "@/global/api/questionnaire";

export interface MonitoringStoreInterface{
    web: {
        createdById: number;
        hostname: string;
        id: number;
        organisationId: number;
        protocol: string;
    } | any,
    questionnaire: {
        id: number;
        lastAnsweredBy: any;
        lastAnsweredById: number;
        websiteHasContactForm: string;
        websiteHasLogin: string;
        websiteHasPayment: string;
        websiteLoginLink: string;
    },
    email: {
        createdById: number
        domain: string;
        id:number;
        organisationId: number
        sender: string;
    }[],
    phones: {
        createdById: number;
        id: number;
        name: string;
        organisationId: number;
        phone: string;
    }[],
    card_name_for_add: string;
    current_credit_card_id: string;
    last_locale: string;
}

const initialState: MonitoringStoreInterface = {
    web: {} as MonitoringStoreInterface['web'],
    questionnaire: {
        id: 0,
        lastAnsweredBy: {},
        lastAnsweredById: 0,
        websiteHasContactForm: '',
        websiteHasLogin: '',
        websiteHasPayment: '',
        websiteLoginLink: '',
    },
    email: [],
    phones: [],
    card_name_for_add: '',
    current_credit_card_id: '',
    last_locale: 'de'
};

export const  monitoring = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setWeb: (state: MonitoringStoreInterface, payload) => {
            return { ...state, web: payload };
        },
        setEmail: (state: MonitoringStoreInterface, payload) => {
            return { ...state, email: payload };
        },
        setQuestionnaire: (state: MonitoringStoreInterface, payload) => {
            return { ...state, questionnaire: {...state.questionnaire, ...payload} };
        },
        setPhones: (state: MonitoringStoreInterface, payload) => {
            return { ...state, phones: payload };
        },
        setCardNameForAdd: (state: MonitoringStoreInterface, payload) => {
            return { ...state, card_name_for_add: payload };
        },
        setCurrentCreditCard: (state: MonitoringStoreInterface, payload) => {
            return { ...state, current_credit_card_id: payload };
        },
        setLastLocale: (state: MonitoringStoreInterface, payload) => {
            return { ...state, last_locale: payload };
        },
    },
    effects: (dispatch) => ({
        async getWeb() {
            try {
                const request = await getOrganisationWebApi();

                if(request?.length && request[0]?.id) {
                    dispatch.monitoring.setWeb(request);
                    return request;
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getEmail() {
            try {
                const request: any = await getOrganisationEmailServerApi();

                if(request[0]?.id) {
                    dispatch.monitoring.setEmail(request)
                    return request;
                }
            } catch (e) {
                console.log(e);
            }
        },

        async editEmail(data: {email: string, domain: string, id: number}) {
            try {
                const request =
                    data?.id ?
                    await putOrganisationEmailApi({email: data.email, domain: data.domain, id: data.id}) :
                    await addOrganisationEmailApi(data.email, data.domain);

                dispatch.monitoring.setEmail(request?.id ? [request] : []);
                return 'ok';
            } catch (e) {
                console.log(e);
            }
        },
        async getQuestionnaire() {
            try {
                const request = await getQuestionnaireApi();

                if(request?.id) {
                    dispatch.monitoring.setQuestionnaire(request)
                    return request;
                }
            } catch (e) {
                console.log(e);
            }
        },
        async changeWeb(data: {id:number, web: string}) {
            try {

                const request =
                    data?.id ?
                    await editSetWebApi({id: data.id, url: data.web}) :
                        await addSetWebApi(data.web);

                dispatch.monitoring.setWeb(request?.id ? request : {});
                return 'ok';
            } catch (e) {
                console.log(e);
            }
        },


        async changeQuestionnaire(data: any) {
            try {
                const request = await editQuestionnaireApi(data);

                request?.id &&  dispatch.monitoring.setQuestionnaire(request);
            } catch (e) {
                console.log(e);
            }
        },

        async changeCurrentCreditCardID(id: string) {
            dispatch.monitoring.setCurrentCreditCard(id);
        },

        async getPhones() {
            try {
                const request = await getOrganisationPhonesApi();

                dispatch.monitoring.setPhones(request?.length ? request : []);
            } catch (e) {
                console.log(e);
            }
        },
        async changeCardNameForAdd(name: string) {
            dispatch.monitoring.setCardNameForAdd(name);
        },
    }),
})
