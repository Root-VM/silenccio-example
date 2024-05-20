import {FC, useCallback, useEffect, useState} from "react";
import { Input } from '@chakra-ui/react'
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {emailConfirmChallengeSelector} from "@/modules/authentication/store/selector";
import {confirmEmailRequestApi, confirmEmailVerifyApi} from "@/global/api/authentication/registration";
import {
    getRegistrationPhoneUrl
} from "@/global/helpers/url-generator";

import css from "./confirm-email-form.module.scss";
import EmailItemAuth from "@/modules/authentication/componets/forms/confirm-email-form/email-item";
import {useTranslations} from "use-intl";

const ConfirmEmailForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const emailConfirmChallenge = useSelector(emailConfirmChallengeSelector);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{code:string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const [seconds, setSeconds] = useState(60);
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('CONFIRM_EMAIL_AUTHENTICATION_PAGE');
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

    const sentEmailVerificationRequest = async () => {
        if (!!seconds) {return}
        setSeconds(_ => 60)

        try {
            const confirm_email = await confirmEmailRequestApi(String(locale).toUpperCase());

            if (!confirm_email?.id) {
                throw new Error('Confirm email not found');
            }
            dispatch.authentication.changeEmailChallenge(confirm_email);
        } catch (e) {
            console.error('error', e)
        }
    }

    const onSubmit: SubmitHandler<{code:string}> = useCallback(async (data) => {
        try {
            dispatch.common.setLoadingModal(true);
            await confirmEmailVerifyApi(
                String(data.code), emailConfirmChallenge.id
            );

            await router.replace(getRegistrationPhoneUrl());
            dispatch.common.setLoadingModal(false);

        } catch (e) {
            dispatch.common.setLoadingModal(false);
            console.error('error', e)
        }
    }, [emailConfirmChallenge])

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.text}>{t('text')}</p>

            <p className="formLabel">{tCommon('code')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("code", { required: true,  })}
                   isInvalid={!!errors.code}
                   className="myInput" type='text' maxLength={6}/>
            {!!errors.code && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className={css.lastText}>
                {t('description_q')} <br/>{t('description_t')}<br/>
            </p>
            <EmailItemAuth />

            <p className={css.lastText}>
                <a onClick={sentEmailVerificationRequest} className={cn(seconds && css.disable)}>
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

export default ConfirmEmailForm;
