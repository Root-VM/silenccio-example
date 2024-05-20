export const hasStandardSubscription = (subscriptions: any) => {
    return subscriptions.some((subscription: any) => subscription?.subscriptionPlan?.name === "STANDARD");
};

export const checkStandardSubscriptionPaid = (subscriptions: any) => {
    if(hasStandardSubscription(subscriptions)) {
        const standard = subscriptions.find((subscription: any) => subscription?.subscriptionPlan?.name === "STANDARD");

        return standard?.lastInvoice?.status === "PAID";
    } else {
        return false;
    }
};
