import {FC, useEffect} from "react";
import ToPaymentModal from "@/modules/dashboard/modals/to-payment-modal";
import SuccessPaymentModal from "@/modules/dashboard/modals/success-payment-modal";
import WrongPaymentModal from "@/modules/dashboard/modals/wrong-payment-modal";
import LoadingPaymentModal from "@/modules/dashboard/modals/loading-payment-modal";
import FormPaymentModal from "@/modules/dashboard/modals/form-payment-modal";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {currentPaymentStatusSelector} from "@/global/store/payment/selector";
import {checkStandardSubscriptionPaid, hasStandardSubscription} from "@/global/helpers/subscriptions-check";
import PayrexxPaymentModal from "@/modules/dashboard/modals/payrexx-payment-modal";

const PaymentProvider: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const status = useSelector(currentPaymentStatusSelector);

    useEffect(() => {
        const load = async () => {
            const subscriptions = await dispatch.payment.getSubscriptions();

            if(!subscriptions?.length) {
                dispatch.payment.changePaymentStatus('no_subscriptions')
            } else {
                if(!hasStandardSubscription(subscriptions)) {
                    dispatch.payment.changePaymentStatus('no_subscriptions');
                    return;
                }

                if(checkStandardSubscriptionPaid(subscriptions)) {
                    dispatch.payment.changePaymentStatus(null)
                    return;
                }

                // dispatch.payment.changePaymentStatus('wrong')
            }
        }

        if(!status || status === 'no_subscriptions') {
            load().then();
        }
    }, [status]);

    return (
        <>
            {status === 'to_payment' && <ToPaymentModal />}
            {status === 'billing_address_form' && <FormPaymentModal/>}
            {status === 'loading' && <LoadingPaymentModal/> }
            {status === 'wrong' && <WrongPaymentModal /> }
            {status === 'success' && <SuccessPaymentModal /> }
            {status === 'payrexx' && <PayrexxPaymentModal />}
        </>
    )
}

export default PaymentProvider;
