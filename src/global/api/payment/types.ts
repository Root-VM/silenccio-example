export type PaymentBillingAddressType = {
    "companyName": string,
    "street": string,
    "houseNumber": string,
    "zipCode": string,
    "city": string
}

export type PaymentMethodApiType = {
    brand: string;
    cardNumber: string;
    charges: any[];
    expiresAt: string;
    id: number;
    isActive: boolean;
    isDefault: boolean;
    type: string;
    wallet: string;
};

export type CouponApiType = {
    "id": number,
    "couponCode": string,
    "maxUses": number,
    "usesLeft": number,
    "fixedAmount": any,
    "percentageAmount": number,
    "validUntil": any,
    "lastAppliedAt": string,
    "perpetual": boolean,
    "applicableToSubscriptionPlanName": string,
    "createdAt": string,
    "updatedAt": string
};
