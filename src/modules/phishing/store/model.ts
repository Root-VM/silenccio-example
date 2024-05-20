import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";
import {
    currentCampaignInitApi,
    getCampaignByIDApi,
    getCampaignListApi,
    getEmployeeApi,
    getPresetsApi
} from "@/global/api/phishing";
import {CampaignResponseApiType, EmployeeResponseApiType, PresetResponseApiType} from "@/global/api/phishing/types";

export interface PhishingsStoreInterface{
    presets: PresetResponseApiType[],
    selected_preset: PresetResponseApiType | null,
    selected_campain_name: string,
    employees: EmployeeResponseApiType[],
    current_campaign: CampaignResponseApiType| null,
    campaign_ids: {id: number, launchDate: string}[],
    current_campaign_id: {id: number | null, launchDate: string}
}

const initialState: PhishingsStoreInterface = {
    presets: [],
    selected_preset: null,
    employees: [],
    selected_campain_name: '',
    current_campaign: null,
    campaign_ids: [],
    current_campaign_id: {id: null, launchDate: ''},
};

export const phishing = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setPresets: (state: PhishingsStoreInterface, payload) => {
            return { ...state, presets: payload };
        },
        setEmployees: (state: PhishingsStoreInterface, payload) => {
            return { ...state, employees: payload };
        },
        setSelectedPreset: (state: PhishingsStoreInterface, payload) => {
            return { ...state, selected_preset: payload };
        },
        setCampainName: (state: PhishingsStoreInterface, payload) => {
            return { ...state, selected_campain_name: payload };
        },
        setCurrentCampaign: (state: PhishingsStoreInterface, payload) => {
            return { ...state, current_campaign: payload };
        },
        setCampaignIds: (state: PhishingsStoreInterface, payload) => {
            return { ...state, campaign_ids: payload };
        },
        setCurrentId: (state: PhishingsStoreInterface, payload) => {
            return { ...state, current_campaign_id: payload };
        },
    },
    effects: (dispatch) => ({
        async getPresets() {
            try {
                const request = await getPresetsApi();

                dispatch.phishing.setPresets(request);
            } catch (e) {
                console.log(e)
            }
        },
        selectPreset(preset: PresetResponseApiType) {
            dispatch.phishing.setSelectedPreset(preset);
        },

        async getEmployees() {
            try {
                const request = await getEmployeeApi();

                dispatch.phishing.setEmployees(request);
            } catch (e) {
                console.log(e)
            }
        },
        async getCurrentCampaign() {
            try {
                const request = await currentCampaignInitApi();

                const request_employee = await getEmployeeApi();
                dispatch.phishing.setEmployees(request_employee);
                console.log('request_employee', request);

                dispatch.phishing.setCurrentCampaign(request);
            } catch (e) {
                console.log(e)
            }
        },
        async getCampaignById(id: number) {
            try {
                const request = await getCampaignByIDApi(id);

                const request_employee = await getEmployeeApi();
                dispatch.phishing.setEmployees(request_employee);
                console.log('request_employee', request);

                dispatch.phishing.setCurrentCampaign(request);
            } catch (e) {
                console.log(e)
            }
        },
        async loadCampaignListIDs() {
            try {
                const request = await getCampaignListApi();

                if(request?.length) {
                    dispatch.phishing.setCampaignIds(request.map((item: any) =>
                        ({id: item?.id, launchDate: item?.launchDate}))
                    );
                }
            } catch (e) {
                console.log(e)
            }
        }
    }),
})
