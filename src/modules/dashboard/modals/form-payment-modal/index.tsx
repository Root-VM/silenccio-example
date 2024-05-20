import {FC, useEffect, useState} from "react";
import {Input, Modal, ModalBody, ModalContent, Radio, RadioGroup, useDisclosure} from "@chakra-ui/react";
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";

import css from "./form-payment-modal.module.scss";
import {cityPattern} from "@/global/helpers/validation-patterns";
import {getOrganisationApi} from "@/global/api/organisation";
import {OrganisationResponseApiType} from "@/global/api/organisation/types";
import {
    activeSubscriptionApi,
    cancelSubscriptionApi,
    createPaymentMethodApi,
    paymentsBillingAddressApi,
    paymentsGetSubscriptionsApi,
    payPaymentMethodApi,
    paySubscriptionApi,
    paySubscriptionFreeApi,
    subscriptionPlansApi
} from "@/global/api/payment";
import {useTranslations} from "use-intl";
import {subscriptionsSelector} from "@/global/store/payment/selector";
import {hasStandardSubscription} from "@/global/helpers/subscriptions-check";
import {SubscriptionData} from "@/global/api/payment/subscription-type";
import Moment from "react-moment";
import {couponPriceModify, priceModify} from "@/global/helpers/price-modify";
import {changeAccountDataApi, getAccountDataApi} from "@/global/api/account";
import {useRouter} from "next/router";
import {applyCouponApi, applyCouponCurrentInvoiceApi} from "@/global/api/payment/coupon";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {CouponApiType} from "@/global/api/payment/types";

type FormType = {
    "companyName": string,
    "street": string,
    "houseNumber": string,
    "zipCode": string,
    "city": string
}

const FormPaymentModal: FC = () => {
    const leaveModal = useDisclosure();
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormType>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const [company, setCompany] = useState<OrganisationResponseApiType>();
    const [type, setType] = useState<'current' | 'new'>('current');
    const [coupon, setCoupon] = useState<string>('');
    const [couponResponse, setCouponResponse] = useState<CouponApiType | undefined>();

    const tCommon = useTranslations('COMMON');
    const t = useTranslations('PAYMENT_FORM_MODAL');
    const [data, setData] = useState<any>();
    const tLost = useTranslations('LOST_DATA');
    const tCoupon = useTranslations('COUPON');
    const {locale} = useRouter();
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        leaveModal.onOpen();
    }, []);

    useEffect(() => {
        const loadCompany = async () => {
            try {
                const response = await getOrganisationApi();
                if(response?.id) {
                    setCompany(response);
                    onDataTypeChange('current', response);
                }
            } catch (e) {
                console.error('error', e)
            }
        }

        loadCompany().then();
    }, []);


    useEffect(() => {
        const init = async () => {
            try{
                const request = await subscriptionPlansApi();

                if(request?.length) {
                    setData(request.find((el: any) => el?.name === 'STANDARD'));
                }
            } catch (e) {
               console.log(e)
            }
        }

        init().then();
    }, []);

    const onDataTypeChange = (e: 'current' | 'new', organisation?: OrganisationResponseApiType) => {
        setType(e);

        if (e === 'current') {
            const data = organisation?.id ? organisation : company;

            setValue('companyName', data?.name || '');
            setValue('street', data?.organisationData?.street || '');
            setValue('houseNumber', data?.organisationData?.houseNumber || '');
            setValue('zipCode', data?.organisationData?.zipCode || '');
            setValue('city', data?.organisationData?.city || '');
        } else {
            setValue('companyName', organisation?.name || '');
            setValue('street', organisation?.organisationData?.street || '');
            setValue('houseNumber', organisation?.organisationData?.houseNumber || '');
            setValue('zipCode', organisation?.organisationData?.zipCode || '');
            setValue('city', organisation?.organisationData?.city || '');
        }
    }

    const couponCheck = async () => {
        try {
            dispatch.common.setLoadingModal(true);
            // @ts-ignore
            const recaptchaValue = await executeRecaptcha('CHECK_COUPON');

            const request =  await applyCouponApi({couponCode: coupon, recaptchaToken: recaptchaValue});

            if(request?.id) {
                setCouponResponse(request);
            }
            console.log('request', request);

            dispatch.common.setLoadingModal(false);
        } catch (e) {
            dispatch.common.setLoadingModal(false);
            console.log(e)
        }
    }
    const onSubmit: SubmitHandler<FormType> = async (data) => {
        try {
            dispatch.common.setLoadingModal(true);

            await paymentsBillingAddressApi(data);

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

            let coupon_response: any;
            if(couponResponse?.id) {
                // @ts-ignore
                const recaptchaValue = await executeRecaptcha('CHECK_COUPON');

                coupon_response = await applyCouponCurrentInvoiceApi(subscription?.lastInvoice?.id, {couponCode: coupon, recaptchaToken: recaptchaValue});
                console.log('ppppp', coupon_response);
            }

            let pay: any;
            let free: any;

            if(coupon_response?.id) {
                if(coupon_response?.totalToPay) {
                    pay = await paySubscriptionApi(subscription?.lastInvoice?.id);
                } else {
                    free = await paySubscriptionFreeApi(subscription?.lastInvoice?.id);
                    if(free?.status === 'PAID') {
                        dispatch.payment.changePaymentStatus('success');
                        const account = await getAccountDataApi();
                        if(account) {
                            await changeAccountDataApi({language: String(locale).toUpperCase(), ...account})
                        }
                        dispatch.common.setLoadingModal(false);

                        return;
                    }
                }
            } else {
                pay = await paySubscriptionApi(subscription?.lastInvoice?.id);
            }

            console.log('pay', pay);
            console.log('free', free);

            dispatch.payment.changePaymentID(pay?.paymentMethod?.id);
            dispatch.payment.changePayrexxLink(pay?.link);
            dispatch.payment.changePaymentStatus('payrexx');

            const account = await getAccountDataApi();

            if(account) {
                await changeAccountDataApi({language: String(locale).toUpperCase(), ...account})
            }

            dispatch.common.setLoadingModal(false);

        } catch (e) {
            dispatch.common.setLoadingModal(false);
            dispatch.payment.changePaymentStatus('billing_address_form');
            console.error('error', e)
        }
    }

    return (
        <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose} scrollBehavior='outside'>
            <ModalContent className={cn('myModal', css.wrap)}>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <img src="/img/icons/close.svg" alt="close" className='close'
                             onClick={() => {
                                 dispatch.payment.changePaymentStatus(null);
                                 leaveModal.onClose()
                             }}/>

                        <h4>{t('title')}</h4>

                        <p className={css.title}>{t('service')}: </p>
                        <p className={css.text}>{tLost('payment_contract_name')}</p>

                        <p className={css.title}>{t('info')}:</p>
                        <p className={css.text}>{t('inform_1')} (<Moment format="DD.MM.YYYY"/>)
                            {t('inform_2')}</p>

                        <p className="formLabel">{t('payment_address')}:</p>
                        <RadioGroup defaultValue='current' className={cn('myRadio', css.radio)}
                                    onChange={onDataTypeChange}>
                            <Radio value='current'>{t('current_address')}</Radio>
                            <Radio value='new'>{t('new_address')}</Radio>
                        </RadioGroup>

                        <div className={cn(css.groupLine, couponResponse?.id && css.activeCoupon)}>
                            <div>
                                <div>
                                    <p className={css.title}>{t('price')}:</p>
                                    <p className={css.text}>CHF {
                                        priceModify(data?.bruttoPrice)
                                    }</p>
                                </div>
                                {
                                    !!couponResponse?.id &&
                                        <p className={css.text}>CHF {
                                            couponPriceModify(data?.nettoPrice, couponResponse)
                                        }</p>
                                }
                            </div>

                            <div>
                                <p className={css.title}>{tCoupon('title')}</p>
                                <div className={css.inputWrap}>
                                    <Input onInput={(e: any) => setCoupon(e?.target?.value)}
                                           placeholder={tCommon('default_placeholder')}
                                        className="myInput" type='text' required/>
                                    <button type='button' onClick={() => coupon && couponCheck()}
                                            className={cn('myBtn', 'small', 'white', css.btnC)}>
                                        {tCoupon('btn')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {
                            type === 'new' && <>
                                <p className="formLabel">{tCommon('company')}*</p>
                                <Input
                                    placeholder={tCommon('default_placeholder')} {...register("companyName", {required: true})}
                                    isInvalid={!!errors.companyName}
                                    className="myInput" type='text'/>
                                {!!errors.companyName && <p className="formErrorText">{tCommon('must_be_required')}</p>}

                                <div className={css.group}>
                                    <div>
                                        <p className="formLabel">{tCommon('street')}*</p>
                                        <Input
                                            placeholder={tCommon('default_placeholder')} {...register("street", {required: true})}
                                            isInvalid={!!errors.street}
                                            className="myInput"
                                            type='text'/>
                                        {!!errors.street && <p className="formErrorText">{tCommon('must_be_required')}</p>}

                                    </div>
                                    <div>
                                        <p className="formLabel">{tCommon('house_number')}*</p>
                                        <Input
                                            placeholder={tCommon('default_placeholder')} {...register("houseNumber", {required: true})}
                                            isInvalid={!!errors.houseNumber}
                                            className="myInput"
                                            type='text'/>
                                        {!!errors.houseNumber &&
                                            <p className="formErrorText">{tCommon('must_be_required')}</p>}

                                    </div>
                                </div>
                                {/*{!!errors.street && <p className="formErrorText">{tCommon('must_be_required')}</p>}*/}
                                {/*{!!errors.houseNumber && <p className="formErrorText">{tCommon('must_be_required')}</p>}*/}

                                <div className={cn(css.group, css.new)}>
                                    <div>
                                        <p className="formLabel">{tCommon('zip')}*</p>
                                        <Input placeholder={tCommon('default_placeholder')} {...register("zipCode", {
                                            required: true,
                                            pattern: /^\d{4}$/
                                        })}
                                               isInvalid={!!errors.zipCode} maxLength={4}
                                               pattern="[0-9]*"
                                               onInput={(e: any) => {
                                                   e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                               }}
                                               className="myInput"
                                               type='text'/>
                                        {errors?.zipCode?.type === 'required' &&
                                            <p className="formErrorText">{tCommon('must_be_required')}</p>}
                                        {errors?.zipCode?.type === 'pattern' &&
                                            <p className="formErrorText">{tCommon('zip_error_validation')}</p>}

                                    </div>
                                    <div>
                                        <p className="formLabel">{tCommon('city')}*</p>
                                        <Input placeholder={tCommon('default_placeholder')} {...register("city", {
                                            required: true,
                                            pattern: cityPattern
                                        })}
                                               isInvalid={!!errors.city}
                                               className="myInput"
                                               type='text'/>
                                        {errors?.city?.type === 'required' &&
                                            <p className="formErrorText">{tCommon('must_be_required')}</p>}
                                        {errors?.city?.type === 'pattern' &&
                                            <p className="formErrorText">{tCommon('city_error_validation')}</p>}

                                    </div>
                                </div>

                            </>
                        }

                        <div className={css.btnGroup}>
                            <button type='submit'
                                    className={cn('myBtn', 'small', css.btn)}>{t('button')}</button>

                            {
                                type === 'new' &&
                                <p className={css.importantText}>{tCommon('required_fields')}</p>
                            }
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default FormPaymentModal;
