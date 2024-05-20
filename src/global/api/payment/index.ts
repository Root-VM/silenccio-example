import {request} from "@/global/api/request";
import {PaymentStoreInterface} from "@/global/store/payment/model";
import {PaymentBillingAddressType, PaymentMethodApiType} from "@/global/api/payment/types";
import {SubscriptionData} from "@/global/api/payment/subscription-type";

// Step 1
export async function paymentsGetSubscriptionsApi(): Promise<PaymentStoreInterface["subscriptions"]> {
    try {
        return await request(`payments/subscriptions`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getInvoicePDFApi(id: number): Promise<any> {
    try {
        return await request(`payments/invoices/${id}/pdf`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}


export async function subscriptionPlansApi(): Promise<any> {
    try {
        return await request(`payments/subscriptions/plans`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function paymentsBillingAddressApi(data: PaymentBillingAddressType): Promise<void> {
    try {
        return await request(`payments/billing-address`, {
            method: 'PUT',
            tokenType: "login",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function paymentsBillingAddressFreeApi(data: PaymentBillingAddressType): Promise<void> {
    try {
        return await request(`payments/billing-address`, {
            method: 'PUT',
            tokenType: "access",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function createPaymentMethodApi(): Promise<any> {
    try {
        return await request(`payments/payment-methods/create`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        return new Error(e);
    }
}

export async function markPaymentMethodAsDefaultApi(id: number): Promise<any> {
    try {
        return await request(`payments/payment-methods/${id}/default`, {
            method: 'POST',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        return new Error(e);
    }
}

export async function deletePaymentMethodApi(id: number): Promise<any> {
    try {
        return await request(`payments/payment-methods/${id}`, {
            method: 'DELETE',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        return new Error(e);
    }
}

export async function getPaymentMethodApi(id: number): Promise<PaymentMethodApiType> {
    try {
        return await request(`payments/payment-methods/${id}`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function payPaymentMethodApi(invoiceId: number, paymentMethodId: number): Promise<any> {
    try {
        return await request(`payments/invoices/${invoiceId}/pay`, {
            method: 'POST',
            tokenType: "login",
            params: {paymentMethodId}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}


export async function activeSubscriptionApi(): Promise<any> {
    try {
        return await request(`payments/subscriptions/start/STANDARD`, {
            method: 'POST',
            tokenType: "login",
            params: {}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
export async function paySubscriptionApi(invoiceId: number ): Promise<any> {
    try {
        return await request(`payments/invoices/${invoiceId}/pay-with-new-payment-method`, {
            method: 'POST',
            tokenType: "login",
            params: {}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function paySubscriptionFreeApi(invoiceId: number ): Promise<any> {
    try {
        return await request(`payments/invoices/${invoiceId}/pay-free`, {
            method: 'POST',
            tokenType: "login",
            params: {}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function activeFreeSubscriptionApi(): Promise<any> {
    try {
        return await request(`payments/subscriptions/start/FREE`, {
            method: 'POST',
            tokenType: "access"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function getSubscriptionByIDApi(id: number): Promise<SubscriptionData> {
    try {
        return await request(`payments/subscriptions/${id}`, {
            method: 'GET',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function cancelSubscriptionApi(id: number): Promise<any> {
    try {
        return await request(`payments/subscriptions/${id}/end`, {
            method: 'DELETE',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function allPaymentMethodsApi(): Promise<PaymentMethodApiType[]> {
    try {
        return await request(`payments/payment-methods/all`, {
            method: 'GET',
            tokenType: "login"
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function deleteCreditCardApi(id: number ): Promise<any | null> {
    try {
        return await request(`organisation/assets/credit-card/${id}`, {
            method: 'DELETE',
            tokenType: "login",
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
