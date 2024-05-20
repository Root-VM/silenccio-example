import {FC, useEffect, useState} from "react";
import { Input } from '@chakra-ui/react'
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";

import {loginCompanyIdSelector} from "@/modules/login/store/selector";
import {loginNewApi, loginVerifyApi} from "@/global/api/login";
import {getChallengeTokenId, setAccessToken, setLoginToken} from "@/global/api/tokens";
import {getDashboardUrl, getOnboardingUrl} from "@/global/helpers/url-generator";

import css from "./confirm-code-form.module.scss";
import {useTranslations} from "use-intl";
import {getQuestionnaireApi} from "@/global/api/questionnaire";
import {onboardingGetWebApi} from "@/global/api/authentication/onboarding";
import {changeAccountDataApi} from "@/global/api/account";

const ConfirmCodeForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{code:string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const [seconds, setSeconds] = useState(0);
    const [challengeId, setChallengeId] = useState(0);
    const companyId = useSelector(loginCompanyIdSelector);
    const t = useTranslations('LOGIN_CONFIRM_PAGE');
    const tCommon = useTranslations('COMMON');
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

    const sentVerificationRequest = async () => {
        if (!!seconds) {return}
        setSeconds(_ => 60)

        try {
            const confirm = await loginNewApi();

            if (!confirm?.id) {
                throw new Error('Confirm not found');
            }
            setChallengeId(confirm?.id);
        } catch (e) {
            console.error('error', e);
            setSeconds(0);
        }
    }

    const onSubmit: SubmitHandler<{code:string}> = async (data) => {
        try {
            dispatch.common.setLoadingModal(true);
            const login_data = await loginVerifyApi(
                Number(getChallengeTokenId()), data.code, companyId
            );

            login_data?.access?.token && setLoginToken(login_data?.access?.expiresAt, login_data?.access?.token);

            try {
                const web = await onboardingGetWebApi();

                if(!web[0]?.id) {
                    if(login_data?.access?.expiresAt && login_data?.access?.token) {
                        window.localStorage.removeItem('loginToken');
                        setAccessToken(login_data?.access?.expiresAt, login_data?.access?.token);
                        await router.push(getOnboardingUrl(1));
                        dispatch.common.setLoadingModal(false);
                        return;
                    }
                }
            } catch (e) {
                if(login_data?.access?.expiresAt && login_data?.access?.token) {
                    window.localStorage.removeItem('loginToken');
                    setAccessToken(login_data?.access?.expiresAt, login_data?.access?.token);
                    await router.push(getOnboardingUrl(1));
                    dispatch.common.setLoadingModal(false);
                    return;
                }
            }
            try {
                const questionnaire = await getQuestionnaireApi();

                if(!questionnaire?.id) {
                    if(login_data?.access?.expiresAt && login_data?.access?.token) {
                        window.localStorage.removeItem('loginToken');
                        setAccessToken(login_data?.access?.expiresAt, login_data?.access?.token);
                        await router.push(getOnboardingUrl(2));
                        dispatch.common.setLoadingModal(false);
                        return;
                    }
                }
            } catch (e) {
                if(login_data?.access?.expiresAt && login_data?.access?.token) {
                    window.localStorage.removeItem('loginToken');
                    setAccessToken(login_data?.access?.expiresAt, login_data?.access?.token);
                    await router.push(getOnboardingUrl(2));
                    dispatch.common.setLoadingModal(false);
                    return;
                }
            }

            await changeAccountDataApi({language: String(locale).toUpperCase()})

            dispatch.common.setLoadingModal(false);
            await router.push(getDashboardUrl());

        } catch (e) {
            dispatch.common.setLoadingModal(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.text}>
                {t('text')}
            </p>

            <p className="formLabel">{tCommon('code')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("code", { required: true })}
                   isInvalid={!!errors.code} maxLength={6}
                   className="myInput" type='text'/>
            {!!errors.code && <p className="formErrorText">{tCommon('must_be_required')}:</p>}

            <p className={css.lastText}>
                {t('description_q')} <br/>{t('description_t')}<br/>
                <a onClick={sentVerificationRequest} className={cn(seconds && css.disable)}>
                    {t('resend')}
                    {!!seconds && <span> {seconds} s.</span>}
                </a>
            </p>

            <div className={css.group}>
                <button type='submit' className={cn('myBtn', 'small', css.btn)}>{tCommon('next')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default ConfirmCodeForm;
