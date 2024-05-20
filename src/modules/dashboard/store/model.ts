import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";
import {
    getOrganisationWebApi
} from "@/global/api/organisation";

export interface DashboardStoreInterface{
    findings: any[],
    findings_resolved: any[],
    ignored_findings: any[],
}

const initialState: DashboardStoreInterface = {
    findings: [],
    findings_resolved: [],
    ignored_findings: []
};

export const  dashboard = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setDashboard: (state: DashboardStoreInterface, payload) => {
            return { ...state, findings: payload };
        },
        setDashboardResolved: (state: DashboardStoreInterface, payload) => {
            return { ...state, findings_resolved: payload };
        },
        setDashboardIgnored: (state: DashboardStoreInterface, payload) => {
            return { ...state, ignored_findings: payload };
        },
    },
    effects: (dispatch) => ({
        async changeDashboard(arr: any[]) {
            dispatch.dashboard.setDashboard(arr);
        },
        async changeDashboardResolved(arr: any[]) {
            dispatch.dashboard.setDashboardResolved(arr);
        },

        async changeDashboardIgnored(arr: any[]) {
            dispatch.dashboard.setDashboardIgnored(arr);
        },
    }),
})
