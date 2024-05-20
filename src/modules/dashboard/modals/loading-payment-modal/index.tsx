import {FC, useEffect} from "react";
import {Modal, ModalBody, ModalContent, Spinner, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";

import {useDispatch, useSelector} from "react-redux";
import {paymentIDSelector} from "@/global/store/payment/selector";
import {
    activeSubscriptionApi, cancelSubscriptionApi, deletePaymentMethodApi,
    getPaymentMethodApi, markPaymentMethodAsDefaultApi,
    paymentsGetSubscriptionsApi, payPaymentMethodApi
} from "@/global/api/payment";
import {Dispatch} from "@/global/store";
import {hasStandardSubscription} from "@/global/helpers/subscriptions-check";

import css from "./loading-payment-modal.module.scss";
import {useTranslations} from "use-intl";

const LoadingPaymentModal: FC = () => {
    const leaveModal = useDisclosure();
    const paymentID = useSelector(paymentIDSelector);
    const dispatch = useDispatch<Dispatch>();
    const t = useTranslations('PAYMENT_LOADING_MODAL');

    useEffect(() => {
        leaveModal.onOpen();
    }, []);

    useEffect(() => {
        const loadPayment = async () => {
            if(paymentID) {
                try{
                    const response = await getPaymentMethodApi(paymentID);

                    if(!response?.isActive) {
                        setTimeout(() => {
                            loadPayment().then();
                        }, 5000)
                    } else {
                        await markPaymentMethodAsDefaultApi(paymentID);

                        let all =  await paymentsGetSubscriptionsApi();
                        all = all ? all : [];
                        let  subscription;

                        if(hasStandardSubscription(all)) {
                            subscription = all.find(el => el?.subscriptionPlan?.name === 'STANDARD');
                        }

                        subscription?.lastInvoice?.id && dispatch.payment.changeInvoiceID(subscription?.lastInvoice?.id);

                        const success = subscription?.lastInvoice?.status === "PAID";

                        if(success) {
                            let free = all.find(el => el?.subscriptionPlan?.name === 'FREE');
                            free?.id && await cancelSubscriptionApi(free?.id);

                            dispatch.payment.changePaymentStatus('success')
                        } else {
                            await deletePaymentMethodApi(response?.id);
                            dispatch.payment.changePaymentStatus('wrong');
                        }
                    }
                } catch (e) {
                    await deletePaymentMethodApi(paymentID);
                    dispatch.payment.changePaymentStatus('wrong')
                    console.log(e)
                }
            }
        }

        setTimeout(() => {
            loadPayment().then();
        }, 5000)
    }, [paymentID]);

    return (
        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose} scrollBehavior='outside'>
            <ModalContent className={cn('myModal', css.wrap)}>
                <ModalBody>

                    <p className={css.title}>
                        {t('title')}
                    </p>
                    <p className={css.text}>
                        {t('text')}
                    </p>

                    <Spinner className={css.spin} />
        </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default LoadingPaymentModal;
