import {FC, useCallback, useEffect, useState} from "react";
import { Input } from '@chakra-ui/react'
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {authenticationPhoneSelector, phoneConfirmChallengeSelector} from "@/modules/authentication/store/selector";
import {
    confirmPhoneRequestApi,
    confirmPhoneVerifyApi
} from "@/global/api/authentication/registration";
import {
    getRegistrationPersonalDataUrl,
} from "@/global/helpers/url-generator";

import css from "./confirm-phone-form.module.scss";
import PhoneItemAuth from "@/modules/authentication/componets/forms/confirm-phone-form/phone-item";
import {useTranslations} from "use-intl";

const ConfirmPhoneForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const phoneConfirmChallenge = useSelector(phoneConfirmChallengeSelector);
    const phone = useSelector(authenticationPhoneSelector);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{code:string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const [seconds, setSeconds] = useState(60);
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('CONFIRM_PHONE_AUTHENTICATION_PAGE');
    const {locale} = useRouter();

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => {
                if (seconds <= 0) return;

                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds]);

    const sentPhoneVerificationRequest = async () => {
        if (!!seconds) {return}
        setSeconds(_ => 60)

        try {
            const confirm_phone = await confirmPhoneRequestApi(String(locale).toUpperCase(), phone);

            if (!confirm_phone?.id) {
                throw new Error('Confirm phone not found');
            }
            dispatch.authentication.changePhoneChallenge(confirm_phone);
        } catch (e) {
            console.error('error', e)
        }
    }

    const onSubmit: SubmitHandler<{code:string}> = useCallback(async (data) => {
        try {
            dispatch.common.setLoadingModal(true);
            await confirmPhoneVerifyApi(
                String(data.code), phoneConfirmChallenge.id
            );

            await router.replace(getRegistrationPersonalDataUrl());
            dispatch.common.setLoadingModal(false);

        } catch (e) {
            dispatch.common.setLoadingModal(false);
            console.error('error', e)
        }
    }, [phoneConfirmChallenge])


    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.text}>{t('text')}</p>

            <p className="formLabel">{tCommon('code')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("code", {required: true})}
                   isInvalid={!!errors.code} maxLength={6}
                   className="myInput" type='text'/>
            {!!errors.code && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className={css.lastText}>
                {t('description_q')} <br/>{t('description_t')}<br/>
            </p>

            <PhoneItemAuth/>

            <p className={css.lastText}>
                <a onClick={sentPhoneVerificationRequest} className={cn(seconds && css.disable)}>
                    {t('resend')}
                    {!!seconds && <span> {seconds} s.</span>}
                </a>
            </p>

            <div className={css.group}>
                <div className={css.box}>
                    <button type='submit' className={cn('myBtn', 'small', css.btn)}>{t('button')}</button>
                </div>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default ConfirmPhoneForm;
