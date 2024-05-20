import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";
import {loginOrganisationsApi} from "@/global/api/login";

export interface LoginStoreInterface{
    company_id: number,
    organisations: [
        {
            "id": number,
            "name": string,
            "roles": string[]
        }
    ]
}

const initialState: LoginStoreInterface = {
    company_id: 0,
    organisations: [
        {
            "id": 0,
            "name": '',
            "roles": ['']
        }
    ]
};

export const loginChallenge = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setOrganisations: (state: LoginStoreInterface, payload) => {
            return { ...state, organisations: payload };
        },
        setCompanyId: (state: LoginStoreInterface, payload) => {
            return { ...state, company_id: payload };
        },
    },
    effects: (dispatch) => ({
        changeOrganisations(data: any) {
            dispatch.loginChallenge.setOrganisations(data);
        },
        changeCompanyId(id: number) {
            dispatch.loginChallenge.setCompanyId(id);
        }
    }),
})
