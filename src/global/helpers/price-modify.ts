import {CouponApiType} from "@/global/api/payment/types";

export const priceModify = (price: number | string | undefined ) => {
    if(!price) {
        return 0
    }

    return (Number(price) / 100).toFixed(2)
}

export const couponPriceModify = (price: number | string | undefined, coupon: CouponApiType ) => {
    if(!price) {
        return 0
    }

    price = Number(price);

    if(coupon.percentageAmount) {
        price = (price - (price * coupon.percentageAmount)) * 1.081;
    } else {
        price = (price - coupon.fixedAmount) * 1.081;
    }

    return (price / 100).toFixed(2)
}
