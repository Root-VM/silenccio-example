import {FC, useEffect, useState} from "react";
import {Modal, ModalBody, ModalContent, Spinner, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {subscriptionsSelector} from "@/global/store/payment/selector";

import {SubscriptionData} from "@/global/api/payment/subscription-type";
import Moment from "react-moment";
import {Dispatch} from "@/global/store";
import {hasStandardSubscription} from "@/global/helpers/subscriptions-check";

import css from "./success-payment-modal.module.scss";
import {useTranslations} from "use-intl";
import Link from "next/link";
import {getProfileUrl} from "@/global/helpers/url-generator";
import {priceModify} from "@/global/helpers/price-modify";

const SuccessPaymentModal: FC = () => {
    const leaveModal = useDisclosure();
    const subscriptions =  useSelector(subscriptionsSelector);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SubscriptionData>();
    const dispatch = useDispatch<Dispatch>();
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('PAYMENT_SUCCESS_MODAL');
    const tLost = useTranslations('LOST_DATA');

    useEffect(() => {
        leaveModal.onOpen();
        dispatch.payment.getSubscriptions().then();
    }, []);

    useEffect(() => {
        if(hasStandardSubscription(subscriptions)) {
            const res = subscriptions.find(el => el?.subscriptionPlan?.name === 'STANDARD');
            res && setData(res);
            setLoading(false);
        }
    }, [subscriptions]);

    const close = () => {
        dispatch.payment.changePaymentStatus(null);
        leaveModal.onClose()
    }

    return (
        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose} scrollBehavior='outside'>
            <ModalContent className={cn('myModal', css.wrap)}>
                <ModalBody>

                    <img src="/img/icons/close.svg" alt="close" className='close'
                         onClick={close}/>

                    <h4>{t('title')}</h4>

                    {loading ? <div className={css.loading}><Spinner /></div> : <>
                        <p className={css.title}>{t('text')}</p>


                        <div className={css.line}>
                            <strong>{tCommon('packet_name')}</strong>
                            <p>{tLost('paid_productname')}</p>
                        </div>
                        <div className={css.line}>
                            <strong>{tCommon('contract_start')}</strong>
                            <p>
                                <Moment date={data?.startedAt} format="DD.MM.YYYY"/>
                            </p>
                        </div>
                        <div className={css.line}>
                            <strong>{tCommon('contract_duration')}</strong>
                            <p>
                                {tLost('term')}
                            </p>
                        </div>
                        <div className={cn(css.line, css.last)}>
                        <strong>{tCommon('subscription')}</strong>
                            <p>CHF {priceModify(data?.lastInvoice?.totalToPay)}</p>
                        </div>

                        <p className={css.text}>
                            {t('info')}
                            <a><Link href={getProfileUrl()}>
                                {t('info_link')}
                            </Link></a>
                        </p>
                    </>}

                    <button onClick={close}
                            className={cn('myBtn', 'small', css.btn)}>{t('button')}</button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SuccessPaymentModal;
