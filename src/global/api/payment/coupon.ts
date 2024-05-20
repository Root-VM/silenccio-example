import {request} from "@/global/api/request";
import {CouponApiType} from "@/global/api/payment/types";

export async function applyCouponNextInvoiceApi(subscriptionId: number, data: { couponCode: string, recaptchaToken: string }): Promise<any> {
    try {
        return await request(`payments/subscriptions/${subscriptionId}/apply-coupon`, {
            method: 'PUT',
            tokenType: "login",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function applyCouponCurrentInvoiceApi(invoiceId: number, data: { couponCode: string, recaptchaToken: string }): Promise<any> {
    try {
        return await request(`payments/invoices/${invoiceId}/apply-coupon`, {
            method: 'PUT',
            tokenType: "login",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}

export async function applyCouponApi(data: { couponCode: string, recaptchaToken: string }): Promise<CouponApiType> {
    try {
        return await request(`payments/coupons/check`, {
            method: 'POST',
            tokenType: "login",
            params: {...data}
        });
    } catch (e: Error | any) {
        throw new Error(e);
    }
}
