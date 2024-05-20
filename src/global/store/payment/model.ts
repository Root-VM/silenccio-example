import { createModel } from '@rematch/core'
import {RootModel} from "@/global/store";
import {cancelSubscriptionApi, paymentsGetSubscriptionsApi} from "@/global/api/payment";
import {SubscriptionData} from "@/global/api/payment/subscription-type";
import {getCreditCardApi} from "@/global/api/card";
import {creditCardApiType} from "@/global/api/card/types";

export interface PaymentStoreInterface {
    paymentID: number | null;
    invoiceID: number | null;
    currentPaymentStatus: null | string;
    subscriptions: SubscriptionData[];
    credit_cards:creditCardApiType[];
    payrexx_link: string;
    is_paid: boolean;
}

const initialState: PaymentStoreInterface = {
    paymentID: null,
    invoiceID: null,
    subscriptions: [],
    credit_cards: [],
    currentPaymentStatus: null,
    payrexx_link: '',
    is_paid: false

};

export const payment = createModel<RootModel>()({
    state: {
        ...initialState,
    },
    reducers: {
        setSubscriptions: (state: PaymentStoreInterface, payload) => {
            return { ...state, subscriptions: payload };
        },
        setCurrentPaymentStatus: (state: PaymentStoreInterface, payload) => {
            return { ...state, currentPaymentStatus: payload };
        },
        setPaymentID: (state: PaymentStoreInterface, payload) => {
            return { ...state, paymentID: payload };
        },
        setInvoiceID: (state: PaymentStoreInterface, payload) => {
            return { ...state, invoiceID: payload };
        },
        setCreditCards: (state: PaymentStoreInterface, payload) => {
            return { ...state, credit_cards: payload };
        },
        setPayrexxLink: (state: PaymentStoreInterface, payload) => {
            return { ...state, payrexx_link: payload };
        },
        setIsPaid: (state: PaymentStoreInterface, payload) => {
            return { ...state, is_paid: payload };
        },
    },
    effects: (dispatch) => ({
        async getSubscriptions(): Promise<PaymentStoreInterface["subscriptions"] | null> {
            try {
                const request = await paymentsGetSubscriptionsApi();
                dispatch.payment.setSubscriptions(request);

                const subscription =
                    request?.find(el => el?.subscriptionPlan?.name === 'STANDARD');

                if(subscription?.id) {
                    dispatch.payment.setIsPaid(subscription?.lastInvoice?.status === "PAID")
                } else {
                    dispatch.payment.setIsPaid(false);
                }

                return request;
            } catch (e: Error | any) {
                console.log(e);
                return null;
            }
        },
        async cancelSubscriptions(id: number): Promise<any> {
            try {
                await cancelSubscriptionApi(id);
                dispatch.payment.getSubscriptions();
            } catch (e: Error | any) {
                console.log(e);
                return null;
            }
        },
        changePaymentStatus(status: PaymentStoreInterface["currentPaymentStatus"]) {
            dispatch.payment.setCurrentPaymentStatus(status);
        },
        changePaymentID(id: PaymentStoreInterface["paymentID"]) {
            dispatch.payment.setPaymentID(id);
        },
        changeInvoiceID(id: number | null) {
            dispatch.payment.setInvoiceID(id);
        },

        changePayrexxLink(link: string) {
            dispatch.payment.setPayrexxLink(link);
        },
        async getCreditCards() {
            try {
                const request = await getCreditCardApi();

                dispatch.payment.setCreditCards(request?.length ? request : []);
            } catch (e) {
                console.log(e);
            }
        },
        async checkIfPaid () {
            try {
                const all =  await paymentsGetSubscriptionsApi();
                const subscription =
                    all?.find(el => el?.subscriptionPlan?.name === 'STANDARD');

                if(subscription?.id) {
                    dispatch.payment.setIsPaid(subscription?.lastInvoice?.status === "PAID")
                } else {
                    dispatch.payment.setIsPaid(false);
                }

            } catch (e) {
                console.log(e)
            }
        }
    }),
})
