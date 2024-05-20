import {FC, useEffect} from "react";
import {Input} from '@chakra-ui/react'
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {emailPattern} from "@/global/helpers/validation-patterns";
import {PasswordResetFormType} from "@/modules/authentication/componets/forms/password-reset-form/type";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {useRouter} from "next/router";
import {passwordResetApi} from "@/global/api/authentication/password-reset";
import {successAlert} from "@/global/helpers/success-alert";
import {getLoginUrl} from "@/global/helpers/url-generator";

import css from "./password-reset-form.module.scss";
import {useTranslations} from "use-intl";
import {GoogleReCaptcha, useGoogleReCaptcha} from "react-google-recaptcha-v3";

const PasswordResetForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordResetFormType>({reValidateMode: 'onSubmit', mode: 'onSubmit'})
    const router = useRouter();
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('FORGOT_PASSWORD_PAGE');
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
    const onSubmit: SubmitHandler<PasswordResetFormType> = async (data) => {
        // @ts-ignore
        const recaptchaValue = await executeRecaptcha('PASSWORD_RESET');

        try {
            dispatch.common.setLoadingModal(true);
            await passwordResetApi(data.email, recaptchaValue);

            dispatch.common.setLoadingModal(false);
            successAlert(t('success_alert'));
            await router.push(getLoginUrl());

        } catch (e) {
            dispatch.common.setLoadingModal(false);
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
            {errors?.email?.type === 'pattern' && <p className="formErrorText">{tCommon('invalid_email')}</p>}
            {errors?.email?.type === 'required' && <p className="formErrorText">{tCommon('required')}</p>}
            <GoogleReCaptcha  onVerify={(_) => {}} />

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)} type='submit'>{tCommon('send')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default PasswordResetForm;
