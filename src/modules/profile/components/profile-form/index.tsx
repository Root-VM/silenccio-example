import {FC, useEffect, useState} from "react";
import cn from "classnames";
import PasswordForm from "@/modules/profile/components/profile-form/password-form";
import {useDispatch, useSelector} from "react-redux";
import {isPaidSelector, subscriptionsSelector} from "@/global/store/payment/selector";
import Moment from "react-moment";
import {Dispatch} from "@/global/store";
import {Input, Modal, ModalBody, ModalContent, useDisclosure} from "@chakra-ui/react";
import {checkStandardSubscriptionPaid} from "@/global/helpers/subscriptions-check";
import {getInvoicePDFApi} from "@/global/api/payment";

import css from "./profile-form.module.scss";
import {useTranslations} from "use-intl";
import {priceModify} from "@/global/helpers/price-modify";
import AccountData from "@/modules/profile/components/profile-form/account-data";
import {applyCouponApi, applyCouponNextInvoiceApi} from "@/global/api/payment/coupon";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {successAlert} from "@/global/helpers/success-alert";

const ProfileForm: FC = () => {
    const subscriptionsS = useSelector(subscriptionsSelector);
    const [subscriptions, setSubscriptions] = useState<any>([]);
    const dispatch = useDispatch<Dispatch>();
    const leaveModal = useDisclosure();
    const [canceledID, setCanceledID] = useState<number | null>(null);
    const t = useTranslations('PROFILE_PAGE');
    const tCommon = useTranslations('COMMON');
    const tLost = useTranslations('LOST_DATA');
    const isPaid = useSelector(isPaidSelector);
    const [coupon, setCoupon] = useState<string>('');
    const { executeRecaptcha } = useGoogleReCaptcha();
    const tCoupon = useTranslations('COUPON');

    useEffect(() => {
        dispatch.payment.getSubscriptions().then();
    }, []);

    useEffect(() => {
        if(subscriptionsS?.length) {
            let standard = subscriptionsS.find(el => el?.subscriptionPlan?.name === 'STANDARD');
            let free = subscriptionsS.find(el => el?.subscriptionPlan?.name === 'FREE');
            standard = standard?.id ? standard : undefined;
            free = free?.id ? free : undefined;

            console.log(standard);
            setSubscriptions(checkStandardSubscriptionPaid(subscriptionsS) ? [standard] : [free]);
        }
    }, [subscriptionsS]);

    const couponCheck = async () => {
        try {
            dispatch.common.setLoadingModal(true);
            // @ts-ignore
            const recaptchaValue = await executeRecaptcha('CHECK_COUPON');

            let standard = subscriptionsS.find(el => el?.subscriptionPlan?.name === 'STANDARD');

            if(standard?.id) {
                const request =  await applyCouponNextInvoiceApi(standard?.id,{couponCode: coupon, recaptchaToken: recaptchaValue});

                if(request?.id) {
                    successAlert(tCoupon('success_added_to_exist_subscription'));
                }
            }

            dispatch.common.setLoadingModal(false);
        } catch (e) {
            dispatch.common.setLoadingModal(false);
            console.log(e)
        }
    }

    const onCancelSubscription = async () => {
        canceledID && await dispatch.payment.cancelSubscriptions(canceledID);
        leaveModal.onClose();
    }

    const downloadFile = async (id: number) => {

        try{
            const response = await getInvoicePDFApi(id);
            response?.url && window?.open(response?.url, '_blank')?.focus();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={css.wrap}>
            <div className={cn(css.content)}>
                <div>
                    <h2>{t('title')}</h2>
                    {
                        isPaid && <p className={css.text}>
                            {t('text')}
                        </p>
                    }

                    <div className={css.cards}>
                        {
                            !!subscriptions?.length && subscriptions.map((subscription: any, i: number) => (
                                <div className={css.card} key={i}>
                                    <p className={css.cTitle}>
                                        {
                                            subscription?.subscriptionPlan?.name === "STANDARD" ?
                                                tLost('paid_productname') : tLost('preview_productname')
                                        }
                                    </p>

                                    <div className={css.line}>
                                        <p>{tCommon('contract_start')}</p>
                                        <span>
                                            <Moment date={subscription?.startedAt} format="DD.MM.YYYY"/>
                                        </span>
                                    </div>
                                    <div className={css.line}>
                                        <p>{tCommon('contract_duration')}</p>
                                        <span>
                                            {
                                                subscription?.subscriptionPlan?.name === "STANDARD" ? tLost('term') :
                                                    tLost('term_preview')
                                            }
                                        </span>
                                    </div>
                                    {
                                        subscription?.subscriptionPlan?.name === "STANDARD" &&
                                        <div className={css.line}>
                                            <p>
                                                {
                                                    subscription?.endedByCustomerAt ? tLost('contract_end') :
                                                        t('next_contract_at')
                                                }
                                            </p>
                                            <span>
                                                <Moment date={subscription?.expiresAt} format="DD.MM.YYYY"/>
                                            </span>
                                        </div>
                                    }
                                    {
                                        subscription?.endedByCustomerAt &&
                                        <div className={css.line}>
                                            <p>{tLost('termination')}</p>
                                            <span>
                                                <Moment date={subscription?.endedByCustomerAt} format="DD.MM.YYYY"/>
                                            </span>
                                        </div>
                                    }
                                    {
                                        !isPaid && <div className={css.line}>
                                            <p>{tCommon('subscription')}</p>

                                            <span>CHF {priceModify(subscription?.subscriptionPlan.price)}</span>
                                        </div>
                                    }

                                    {
                                        isPaid && <div className={css.line}>
                                            <p>{tCommon('subscription')}</p>

                                            {
                                                subscription?.lastInvoice?.appliedCoupon?.id ?
                                                    <span style={{maxWidth: '150px'}}>
                                                        <span style={{textDecoration: 'line-through', whiteSpace: "nowrap", marginRight: "5px"}}>CHF {priceModify(subscription?.subscriptionPlan?.bruttoPrice)}</span>
                                                        <span style={{color: "#00008F", whiteSpace: "nowrap"}}>CHF {priceModify(subscription?.lastInvoice?.totalToPay)}</span></span>
                                                    :
                                                    <span>CHF {priceModify(subscription?.lastInvoice?.totalToPay)}</span>
                                            }
                                        </div>
                                    }

                                    {
                                        isPaid && <p className={css.cText}>
                                            {t('l_text')}
                                        </p>
                                    }

                                    {
                                        subscription?.subscriptionPlan?.name !== "FREE" && <>
                                            <div className={css.btnGroup}>
                                                <button onClick={() => downloadFile(subscription?.lastInvoiceId)}
                                                        className={cn('myBtn', 'small', 'white', css.btn)}>
                                                    {t('btn_1')}
                                                    <img src="/img/icons/file-grey.svg" alt="file"/>
                                                </button>
                                                {
                                                    !subscription?.endedByCustomerAt &&
                                                    <button onClick={() => {
                                                        setCanceledID(subscription.id);
                                                        leaveModal.onOpen();
                                                    }}
                                                            className={cn('myBtn', 'small', 'white', css.btn)}
                                                    >
                                                        {t('btn_2')}
                                                    </button>
                                                }
                                            </div>

                                            {
                                                isPaid && <div className={css.inputWrap}>
                                                    <p className={cn(css.title, css.titleC)}>{tCoupon('title')}</p>
                                                    <div>
                                                        <Input onInput={(e: any) => setCoupon(e.target.value)}
                                                               placeholder={tCommon('default_placeholder')}
                                                               className="myInput" type='text'/>

                                                        <img onClick={() => coupon && couponCheck()} src="/img/icons/table_check.svg"
                                                             alt="check"/>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>

                <h2 className={css.groupTitle}>{t('masterdata')}</h2>
                <div className={css.group}>
                    <PasswordForm/>
                    <AccountData/>
                </div>
            </div>


            <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose}>
                <ModalContent className={'myModal'}>
                    <ModalBody>
                        <img src="/img/icons/close.svg" alt="close" className='close'
                             onClick={() => leaveModal.onClose()}/>
                        <p className='title'>{tLost('termination_text')}</p>

                        <div className='btnGroup'>
                            <button className={cn('myBtn', 'small', css.btn)}
                                    onClick={onCancelSubscription}
                            >{tCommon('yes')}
                            </button>

                            <button className={cn('myBtn', 'small', 'white', css.btn)}
                                    onClick={() => leaveModal.onClose()}
                            >{tCommon('no')}
                            </button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProfileForm;
