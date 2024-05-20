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
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {webUrlPattern} from "@/global/helpers/validation-patterns";
import {onboardingSetWebApi} from "@/global/api/authentication/onboarding";
import {getOnboardingUrl} from "@/global/helpers/url-generator";
import Select from 'react-select';

import css from "./onboarding-one-form.module.scss";
import {WebProtocols} from "@/global/data/web-protocols";
import {useTranslations} from "use-intl";

const OnboardingOneForm: FC = () => {
    const [value, setValueT] = useState<any>();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<{url: string, dontHaveEmail: boolean, code: string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('ONBOARDING_ONE_AUTHENTICATION_PAGE');

    useEffect(() => {
        setValue('code', 'https://');
    }, []);

    const onSubmit: SubmitHandler<{url: string, dontHaveEmail: boolean, code: string}> = async (data) => {
        if(!data.dontHaveEmail && data.url) {
            try {
                dispatch.common.toggleModalLoading(true);
                await onboardingSetWebApi(data.code + data.url);

                dispatch.common.toggleModalLoading(false);
                await router.replace(getOnboardingUrl(2));

            } catch (e) {
                dispatch.common.toggleModalLoading(false);
                console.error('error', e)
            }
        } else {
            await router.replace(getOnboardingUrl(2));
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.title}>{t('pre_text')}</p>
            <p className={css.text}>{t('text')}</p>

            <div className={cn('formLabel', css.textLine)}>
                {t('inform')}

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
                    <div className={css.phoneLine}>
                        <Controller
                            control={control} name="code" rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Select classNamePrefix="p"
                                        className={cn( 'phoneSelect', css.drop, !!errors.code && 'error')}
                                        onChange={(e: any) => {onChange(e?.value);}}

                                        formatOptionLabel={(data: any) => (
                                            <div className='phoneCustomOption'>
                                                <div className='phoneCustomLabel'>{data?.label}</div>
                                                <div className='phoneCustomValue'>{data?.label}</div>
                                            </div>
                                        )}
                                        options={WebProtocols}
                                        defaultValue={{label: 'https', value: 'https://'}}
                                />
                            )}
                        />
                        <Input placeholder={tCommon('default_placeholder')} {...register("url", { required: true, pattern: webUrlPattern })}
                               isInvalid={!!errors.url}
                               onInput={(e: any) => {
                                   e.target.value = e.target.value.replace(/(https?:\/\/)/g, "");
                               }}
                               className="myInput" type='text'/>
                    </div>
                    {errors?.url?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                    {errors?.url?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                </>
            }

            {/*<Checkbox className={'myCheck'} {...register("dontHaveEmail", { required: false })}*/}
            {/*          onChange={(e) => setValueT(e.target.checked)}>*/}
            {/*    {tCommon('dont_know')}*/}
            {/*</Checkbox>*/}


            <div className={css.group}>
                <button type='submit' className={cn('myBtn', 'small', css.btn)}>{tCommon('next')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default OnboardingOneForm;
