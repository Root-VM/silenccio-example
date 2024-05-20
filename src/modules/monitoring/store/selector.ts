import {RootState} from "@/global/store";
import {createSelector} from "reselect";
import {MonitoringStoreInterface} from "@/modules/monitoring/store/model";

const selectState = (state: RootState) => state.monitoring;

export const websSelector = createSelector(selectState,
    (val: MonitoringStoreInterface) => val?.web?.length ? val?.web[0] : val?.web);

export const emailSelector = createSelector(selectState,
    (val: MonitoringStoreInterface) => val?.email);

export const questionnaireSelector = createSelector(selectState,
    (val: MonitoringStoreInterface) => val?.questionnaire);

export const phonesSelector = createSelector(selectState,
    (val: MonitoringStoreInterface) => val?.phones);

export const cardNameForAddSelector = createSelector(selectState,
    (val: MonitoringStoreInterface) => val?.card_name_for_add);

export const currentCreditCardIdSelector = createSelector(selectState,
    (val: MonitoringStoreInterface) => val?.current_credit_card_id);

export const lastLocaleSelector = createSelector(selectState,
    (val: MonitoringStoreInterface) => val?.last_locale);
