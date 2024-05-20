import {FC, useEffect} from "react";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";

import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {
    activeSubscriptionApi,
    paymentsGetSubscriptionsApi,
    paySubscriptionApi
} from "@/global/api/payment";

import css from "./wrong-payment-modal.module.scss";
import {useTranslations} from "use-intl";
import {hasStandardSubscription} from "@/global/helpers/subscriptions-check";

const WrongPaymentModal: FC = () => {
    const leaveModal = useDisclosure();
    const dispatch = useDispatch<Dispatch>();
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('PAYMENT_WRONG_MODAL');

    useEffect(() => {
        leaveModal.onOpen();
    }, []);

    const payAgain = () => {
        dispatch.payment.changePaymentStatus('loading');
        leaveModal.onClose();
    }
    const changePayProvider = async () => {
        try {
            let subscription;
            let all =  await paymentsGetSubscriptionsApi();
            if(hasStandardSubscription(all)) {
                const subscription_old = all.find(el => el?.subscriptionPlan?.name === 'STANDARD');
                if(subscription_old?.id) {
                    subscription = subscription_old;
                }
            }

            if(!subscription) {
                subscription = await activeSubscriptionApi();
            }
            const pay = await paySubscriptionApi(subscription?.lastInvoice?.id);

            dispatch.payment.changePaymentID(pay?.paymentMethod?.id);
            dispatch.payment.changePayrexxLink(pay?.link);
            dispatch.payment.changePaymentStatus('payrexx');

            leaveModal.onClose();
        } catch (e) {
            console.error('error', e)
        }
    }

    return (
        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose} scrollBehavior='outside'>
            <ModalContent className={cn('myModal', css.wrap)}>
                <ModalBody>

                    <img src="/img/icons/close.svg" alt="close" className='close'
                         onClick={() => leaveModal.onClose()}/>

                    <h4>{t('title')}</h4>

                    <p className={css.title}>{t('text')}</p>
                    <p className={css.text}>{t('secondary_text')}</p>

                    <div className={css.btnGroup}>
                        {/*<button onClick={payAgain}*/}
                        {/*    className={cn('myBtn', 'small', css.btn)}>{t('pay_again')}</button>*/}
                        <button onClick={changePayProvider}
                            className={cn('myBtn', 'small', 'white', css.btn)}>{t('pay_again_deep')}</button>
                    </div>


                    <div className={css.line}>
                        <p>{t('contact')}</p>
                    </div>
                    <div className={cn(css.line, css.last)}>
                        <strong>{tCommon('email')}:</strong>
                        <p>contact@silenccio.com</p>
                    </div>

                    <button className={cn('myBtn', 'small', 'white', css.btn)}
                            onClick={() => leaveModal.onClose()}
                    >{t('button')}</button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default WrongPaymentModal;
