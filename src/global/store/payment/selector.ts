import { RootState } from '../index';
import {createSelector} from "reselect";
import {PaymentStoreInterface} from "@/global/store/payment/model";

const selectState = (state: RootState) => state.payment;

export const subscriptionsSelector = createSelector(selectState,
    (val: PaymentStoreInterface) => val?.subscriptions);

export const currentPaymentStatusSelector = createSelector(selectState,
    (val: PaymentStoreInterface) => val?.currentPaymentStatus);

export const paymentIDSelector = createSelector(selectState,
    (val: PaymentStoreInterface) => val?.paymentID);

export const invoiceIDSelector = createSelector(selectState,
    (val: PaymentStoreInterface) => val?.invoiceID);

export const creditCardsSelector = createSelector(selectState,
    (val: PaymentStoreInterface) => val?.credit_cards);

export const payrexxLinkSelector = createSelector(selectState,
    (val: PaymentStoreInterface) => val?.payrexx_link);

export const isPaidSelector = createSelector(selectState,
    (val: PaymentStoreInterface) => val?.is_paid);
