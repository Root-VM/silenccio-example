import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";

export interface CommonStoreInterface{
    showLoadingModal: boolean
}

const initialState: CommonStoreInterface = {
    showLoadingModal: false
};

export const common = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setLoadingModal: (state: CommonStoreInterface, payload) => {
            return { ...state, showLoadingModal: payload };
        },
    },
    effects: (dispatch) => ({
        toggleModalLoading(val: boolean) {
            dispatch.common.setLoadingModal(val);
        },
        clearAll() {
            dispatch({ type: 'RESET_APP' });
        }
    }),
})
