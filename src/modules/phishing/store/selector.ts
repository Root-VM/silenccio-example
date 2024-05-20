import {RootState} from "@/global/store";
import {createSelector} from "reselect";
import {PhishingsStoreInterface} from "@/modules/phishing/store/model";

const selectState = (state: RootState) => state.phishing;

export const presetsSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.presets);

export const selectedPresetSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.selected_preset);

export const employeesSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.employees);

export const campainNameSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.selected_campain_name);

export const currentCampaignSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.current_campaign);

export const employeesFromCampaignSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.employees);

export const currentEmployeesSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.current_campaign?.events);

export const campaignIdsSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.campaign_ids);

export const currentCampaignIdSelector = createSelector(selectState,
    (val: PhishingsStoreInterface) => val?.current_campaign_id);
