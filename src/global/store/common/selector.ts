import { RootState } from '../index';
import {createSelector} from "reselect";
import {CommonStoreInterface} from "@/global/store/common/model";

const selectState = (state: RootState) => state.common;

export const loadingModalSelector = createSelector(selectState,
    (val: CommonStoreInterface) => val?.showLoadingModal);
