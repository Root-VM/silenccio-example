import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";
import {getAccountDataApi, getAccountOrganisationDataApi} from "@/global/api/account";

export interface ProfileStoreInterface{
    account: {
        id: number;
        email: string;
        emailToChange: string | null;
        phone: string;
        phoneToChange: string | null;
        isActive: boolean;
        isRegisterComplete: boolean;
        loginCount: number;
        lastLoginAt: string;
        ableToCreateOrganisation: boolean;
        accountData: {
            id: number;
            accountId: number;
            firstName: string;
            lastName: string;
            sex: string;
            language: string;
            positionInCompany: string;
            createdAt: string;
            updatedAt: string;
        };
    } | null;
    organisation: {
        name: string;
        id: number;
        organisationData: {
            id: number;
            organisationId: number;
            phone: string;
            street: string;
            houseNumber: string;
            zipCode: string;
            city: string;
            createdAt: string;
            updatedAt: string;
        }
    }[]
}

const initialState: ProfileStoreInterface = {
    account: null,
    organisation: []
};

export const profile = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setAccount: (state: ProfileStoreInterface, payload) => {
            return { ...state, account: payload };
        },
        setOrganisation: (state: ProfileStoreInterface, payload) => {
            return { ...state, organisation: payload };
        },
    },
    effects: (dispatch) => ({

        async getAccount() {
            try {
                const request = await getAccountDataApi();

                dispatch.profile.setAccount(request);
            } catch (e) {
                console.log(e)
            }
        },
        async getAccountOrganisation() {
            try {
                const request = await getAccountOrganisationDataApi();

                dispatch.profile.setOrganisation(request);
            } catch (e) {
                console.log(e)
            }
        },
    }),
})
