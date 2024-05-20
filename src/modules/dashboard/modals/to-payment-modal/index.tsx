import {FC, useEffect, useState} from "react";
import {Modal, ModalBody, ModalContent, Spinner, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";

import css from "./to-payment-modal.module.scss";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {subscriptionPlansApi} from "@/global/api/payment";
import Moment from "react-moment";
import {useTranslations} from "use-intl";
import {priceModify} from "@/global/helpers/price-modify";


const ToPaymentModal: FC = () => {
    const leaveModal = useDisclosure();
    const dispatch = useDispatch<Dispatch>();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>();
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('TO_PAYMENT_MODAL');
    const tLost = useTranslations('LOST_DATA');

    useEffect(() => {
        leaveModal.onOpen();

        const getPlans = async () => {
            setLoading(true);

            try {
                const plans = await subscriptionPlansApi();
                plans?.length && setData(plans.find((p: any) => p.name === 'STANDARD'));

                setLoading(false);
            } catch (e: Error | any) {
                console.log(e);
                setLoading(false);
            }
        }

        getPlans().then();
    }, []);

    const goToBilling = () => {
        dispatch.payment.changePaymentStatus('billing_address_form');
    }

    return (
        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose} scrollBehavior='outside'>
            <ModalContent className={cn('myModal', css.wrap)}>
                <ModalBody>

                    <img src="/img/icons/close.svg" alt="close" className='close'
                         onClick={() => {dispatch.payment.changePaymentStatus(null);leaveModal.onClose()}}/>

                    <h4>{t('title')}</h4>

                    <p className={css.title}>{t('secondary_title')}</p>

                    <div className={css.text}>
                        <strong>{t('text_s')}</strong><br/>
                        <ul>
                            <li>{t('list_title')}
                                <p className={css.tC}>
                                    <span><span>{t('level_1_s')} </span> {t('level_1_t')}</span>
                                    <span><span>{t('level_2_s')} </span> {t('level_2_t')}</span>
                                </p>
                            </li>
                            <li>{t('list_end')}</li>
                            <li>{t('list_mid')}</li>
                        </ul>
                    </div>

                    <p className={css.title}>{tCommon('pricing')}</p>

                    {
                        loading ? <div className={css.loading}><Spinner/></div> : <>
                            <div className={css.line}>
                                <strong>{tCommon('packet_name')}</strong>
                                <p>{tLost('paid_productname')}</p>
                            </div>
                            <div className={css.line}>
                                <strong>{tCommon('contract_start')}</strong>
                                <p><Moment format="DD.MM.YYYY"/></p>
                            </div>
                            <div className={css.line}>
                                <strong>{tCommon('contract_duration')}</strong>
                                <p>{tLost('term')}</p>
                            </div>
                            <div className={css.line}>
                                <strong>{tCommon('subscription')}</strong>
                                <p>CHF {priceModify(data?.bruttoPrice)}</p>
                            </div>
                            <div className={cn(css.line, css.last)}>
                                <strong>{tCommon('debet')}</strong>
                                <p>{t('debet_length')}</p>
                            </div>

                            <button className={cn('myBtn', 'small', css.btn)}
                                    onClick={goToBilling}>
                                {t('button')}
                            </button>
                        </>
                    }

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ToPaymentModal;
