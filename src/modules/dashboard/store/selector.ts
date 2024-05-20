import {RootState} from "@/global/store";
import {createSelector} from "reselect";
import {DashboardStoreInterface} from "@/modules/dashboard/store/model";

const selectState = (state: RootState) => state.dashboard;

export const findingsSelector = createSelector(selectState,
    (val: DashboardStoreInterface) => val?.findings);

export const findingsResolvedSelector = createSelector(selectState,
    (val: DashboardStoreInterface) => val?.findings_resolved);

export const ignoredFindingsSelector = createSelector(selectState,
    (val: DashboardStoreInterface) => val?.ignored_findings);

