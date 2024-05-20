import {createRef, FC, MutableRefObject, useEffect, useRef} from "react";
import {Input} from '@chakra-ui/react'
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {emailPattern} from "@/global/helpers/validation-patterns";
import PasswordInput from "@/global/components/ui/password-input";
import {loginApi, loginOrganisationsApi} from "@/global/api/login";
import Link from "next/link";
import {
    getLoginConfirmUrl,
    getPasswordResetUrl,
    getRegistrationUrl
} from "@/global/helpers/url-generator";
import {LoginFormType} from "@/modules/login/components/login-form/type";
import {useTranslations} from "use-intl";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {setChallengeToken} from "@/global/api/tokens";
import {useRouter} from "next/router";
import {errorAlert} from "@/global/helpers/error-alert";

import css from "./login-form.module.scss";
import {GoogleReCaptcha, useGoogleReCaptcha} from "react-google-recaptcha-v3";

const LoginForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const t = useTranslations('LOGIN_PAGE');
    const tCommon = useTranslations('COMMON');
    const recaptchaRef = createRef<any>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        document.body.classList.add("login");

        const exitingFunction = () => {
            document.body.classList.remove("login");
        };

        router.events.on("routeChangeStart", exitingFunction);

        return () => {
            router.events.off("routeChangeStart", exitingFunction);
        };
    }, []);

    useEffect(() => {
        dispatch.common.clearAll();
    }, []);

    const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
        // @ts-ignore
        const recaptchaValue = await executeRecaptcha('LOGIN');

        try {
            dispatch.common.toggleModalLoading(true);
            const login = await loginApi(data.email, data.password, recaptchaValue);

            if(!login?.token?.token) {
                throw new Error('Cannot login');
            }

            setChallengeToken(login.token.expiresAt, login.token.token, login?.challenge?.id);

            const organisations = await loginOrganisationsApi();

            if(organisations?.length) {
                organisations?.length && dispatch.loginChallenge.changeCompanyId(Number(organisations[0].id));
                organisations?.length && dispatch.loginChallenge.changeOrganisations(organisations);

                dispatch.common.toggleModalLoading(false);

                await router.push(getLoginConfirmUrl());
            } else {
                errorAlert('Company dont fount');
            }

        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>

            <p className="formLabel">{tCommon('email')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("email", { required: true, pattern: emailPattern })}
                isInvalid={!!errors.email}
                className="myInput" type='email'/>

            {errors?.email?.type === 'pattern' && <p className="formErrorText">{tCommon('email_error_validation')}</p>}
            {errors?.email?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className="formLabel">{tCommon('password')}*</p>
            <PasswordInput register={register} isInvalid={!!errors.password} name='password'
                           validation={{required: true}}/>
            {errors?.password?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <GoogleReCaptcha  onVerify={(_) => {}} />

            <p className={css.link}>
                <Link href={getPasswordResetUrl()}>
                    <span>{t('forgot_password')}</span>
                </Link>
            </p>

            <div className={css.group}>
                <button
                    className={cn('myBtn', 'small', css.btn)} type='submit'>{t('login')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>

            <p className={cn(css.link, css.reg)}>
                {t('no_account_yet')}
                <Link href={getRegistrationUrl()} replace={true}>
                    <span>{t('no_account_yet_link')}</span>
                </Link>
            </p>
        </form>
    )
}

export default LoginForm;
