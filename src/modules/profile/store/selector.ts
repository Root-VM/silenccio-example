import {RootState} from "@/global/store";
import {createSelector} from "reselect";
import {ProfileStoreInterface} from "@/modules/profile/store/model";

const selectState = (state: RootState) => state.profile;

export const accountSelector = createSelector(selectState,
    (val: ProfileStoreInterface) => val?.account);
export const organisationSelector = createSelector(selectState,
    (val: ProfileStoreInterface) => val?.organisation);
