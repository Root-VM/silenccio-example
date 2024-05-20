import {RootState} from "@/global/store";
import {createSelector} from "reselect";
import {AuthenticationStoreInterface} from "@/modules/authentication/store/model";


const selectState = (state: RootState) => state.authentication;

export const authenticationEmailSelector = createSelector(selectState,
    (val: AuthenticationStoreInterface) => val?.email);
export const authenticationCompanySelector = createSelector(selectState,
    (val: AuthenticationStoreInterface) => val?.company);
export const authenticationPhoneSelector = createSelector(selectState,
    (val: AuthenticationStoreInterface) => val?.phone);
export const authenticationPhoneCodeSelector = createSelector(selectState,
    (val: AuthenticationStoreInterface) => val?.phone_code);
export const authenticationPhoneDataSelector = createSelector(selectState,
    (val: AuthenticationStoreInterface) => val?.phone_data);
export const emailConfirmChallengeSelector = createSelector(selectState,
    (val: AuthenticationStoreInterface) => val?.emailConfirmChallenge);

export const phoneConfirmChallengeSelector = createSelector(selectState,
    (val: AuthenticationStoreInterface) => val?.phoneConfirmChallenge);

export const onboardingDataSelector = createSelector(selectState,
    (val: AuthenticationStoreInterface) => val?.onboarding_data);
