import {FC, useEffect, useState} from "react";
import {
    Checkbox,
    Input,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger
} from '@chakra-ui/react'
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    onboardingGetWebAccessApi,
    onboardingSetDataApi,
    onboardingSetEmailApi
} from "@/global/api/authentication/onboarding";
import {getAuthenticationInfoUrl} from "@/global/helpers/url-generator";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {emailPattern} from "@/global/helpers/validation-patterns";
import {authenticationEmailSelector, onboardingDataSelector} from "@/modules/authentication/store/selector";

import css from "./onboarding-five-form.module.scss";
import {useTranslations} from "use-intl";

const OnboardingFiveForm: FC = () => {
    const [value, setValueD] = useState<any>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<{email: string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const email = useSelector(authenticationEmailSelector);
    const onboardingData = useSelector(onboardingDataSelector);
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('ONBOARDING_FIVE_AUTHENTICATION_PAGE');

    useEffect(() => {
        !!email && setValue('email', email)
    }, [email]);

    const onSubmit: SubmitHandler<{email: string}> = async (data) => {
        try {
            const web = await onboardingGetWebAccessApi();
            dispatch.common.toggleModalLoading(true);
            if(!value) {
                // await onboardingSetEmailApi(data.email);
                await dispatch.authentication.addEmail({email: data.email, domain: data.email?.split('@')[1]});
            }

            await onboardingSetDataApi(onboardingData);

            dispatch.common.toggleModalLoading(false);
            await router.replace(getAuthenticationInfoUrl());

        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.title}>{t('pre_text')}</p>
            <p className={css.text}>{t('text')}</p>

            <div className={cn('formLabel', css.textLine)}>
                {tCommon('email')}*

                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/question.svg" alt="question"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className='myPopover'>
                            {t('inform_detail_s')}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>

            {
                !value && <>
                    <Input placeholder={tCommon('default_placeholder')} {...register("email", { required: true, pattern: emailPattern })}
                           isInvalid={!!errors.email} defaultValue={email}
                           className="myInput" type='email'/>
                    {errors?.email?.type === 'pattern' && <p className="formErrorText">{tCommon('email_error_validation')}</p>}
                    {errors?.email?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

                </>
            }

            <Checkbox className={'myCheck'}
                      onChange={(e) => setValueD(e.target.checked)}>
                {tCommon('dont_know')}
            </Checkbox>

            <div className={css.group}>
                <button type='submit' className={cn('myBtn', 'small', css.btn)}>{t('button')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default OnboardingFiveForm;
