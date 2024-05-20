import {RootState} from "@/global/store";
import {createSelector} from "reselect";
import {LoginStoreInterface} from "@/modules/login/store/model";


const selectState = (state: RootState) => state.loginChallenge;

export const loginOrganisationsSelector = createSelector(selectState,
    (val: LoginStoreInterface) => val?.organisations);

export const loginCompanyIdSelector = createSelector(selectState,
    (val: LoginStoreInterface) => val?.company_id);
