import {FC} from "react";
import cn from "classnames";
import {Input} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getDashboardUrl, getMonitoringStartUrl, getMonitoringUrl} from "@/global/helpers/url-generator";

import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslations} from "use-intl";
import {postCreditCardApi} from "@/global/api/card";

import css from "./step-four.module.scss";

export const StepFour: FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const {locale} = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{name: string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const tCommon = useTranslations('COMMON');
    const tLost = useTranslations('LOST_DATA');

    const onSubmit: SubmitHandler<{name: string}> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);
            let lang: 'en-US' | 'de-DE' | 'fr-FR' | 'it-IT' = 'de-DE';
            if (locale === 'en') lang = 'en-US';
            if (locale === 'it') lang = 'it-IT';
            if (locale === 'fr') lang = 'fr-FR';

            const response = await postCreditCardApi({popupLanguage: lang, name: data.name});

            response?.assetId && dispatch.monitoring.changeCurrentCreditCardID(response?.assetId);

            if(response?.url) {
                dispatch.monitoring.setLastLocale(locale);
                window?.open(response.url, '_blank')?.focus();
                window?.open('','_self')?.close();
            }

            dispatch.common.toggleModalLoading(false);
            await router.push(getMonitoringStartUrl());
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <img onClick={() => router.push(getMonitoringUrl())}
                 className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>
            <h2>{tLost('monitoring_credit_card_title')}</h2>
            <p className={css.text}>{tLost('monitoring_credit_card_text')}</p>

            <p className="formLabel">{tLost('monitoring_credit_card_field_title')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("name", { required: true })}
                   isInvalid={!!errors.name} className={cn("myInput", css.input)}
                   type='text' />
            {!!errors.name && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className={css.text}>
                {tLost('monitoring_credit_card_description')}
            </p>

            <div className={css.group}>
                <button type='submit'
                    className={cn('myBtn', 'small', css.btn)}>{tCommon('next')}</button>

                <button onClick={() => router.push(getMonitoringStartUrl())}
                    className={cn('myBtn', 'small', 'white', css.btn)}>{tLost('cancel')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default StepFour;
