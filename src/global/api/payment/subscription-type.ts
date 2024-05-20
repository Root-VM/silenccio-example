type Charge = {
    id: number;
    invoiceId: number;
    organisationPaymentMethodId: number;
    status: string;
    successAt: string | null;
    failedAt: string | null;
    failReason: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

type BillingAddress = {
    id: number;
    companyName: string;
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
    version: number;
    organisationId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

type Invoice ={
    invoiceNumber: string;
    id: number;
    amountToPay: number;
    periodStart: string;
    periodEnd: string;
    organisationSubscriptionId: number;
    billingAddressId: number;
    paidWithChargeId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    charges: Charge[];
    paidWithCharge: Charge;
    billingAddress: BillingAddress;
    totalToPay:  number;
    status: string;
}

type SubscriptionPlan = {
    name: string;
    price: number;
    subscriptionInterval: string;
    terminationPeriod: string;
    canBeProlonged: boolean;
    available: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export type SubscriptionData = {
    id: number;
    startedAt: string;
    expiresAt: string;
    terminatesAt: string;
    endedByCustomerAt: string | null;
    autoRenew: boolean;
    organisationId: number;
    lastInvoice: Invoice;
    subscriptionPlan: SubscriptionPlan;
}
