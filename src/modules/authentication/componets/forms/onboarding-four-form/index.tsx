import {FC, useEffect, useState} from "react";
import {
    Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup
} from '@chakra-ui/react'
import cn from "classnames";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {onboardingSetDataApi} from "@/global/api/authentication/onboarding";
import {getOnboardingUrl} from "@/global/helpers/url-generator";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {webUrlPattern} from "@/global/helpers/validation-patterns";

import css from "./onboarding-four-form.module.scss";
import Select from "react-select";
import {WebProtocols} from "@/global/data/web-protocols";
import {useTranslations} from "use-intl";

const OnboardingFourForm: FC = () => {
    const [value, setValueT] = useState<any>();
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<{websiteHasLogin: string, websiteLoginLink: string, code: string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('ONBOARDING_FOUR_AUTHENTICATION_PAGE');
    const tLost = useTranslations('LOST_DATA');

    useEffect(() => {
        setValue('code', 'https://');
    }, []);

    const onSubmit: SubmitHandler<{websiteHasLogin: string, websiteLoginLink: string, code: string}> = async (data) => {

        try {
            dispatch.common.toggleModalLoading(true);
            if(data.websiteHasLogin === 'true') {
                dispatch.authentication.changeOnboardingData({
                    websiteHasLogin: data.websiteHasLogin, websiteLoginLink: data.websiteLoginLink ?
                        data.code + data.websiteLoginLink : ''
                });
            } else {
                dispatch.authentication.changeOnboardingData({websiteHasLogin: data.websiteHasLogin});
            }

            dispatch.common.toggleModalLoading(false);
            await router.replace(getOnboardingUrl(5));

        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap}  onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.title}>{t('pre_text')}</p>
            <div className={css.text}>
                {t('text')}

                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/question.svg" alt="question"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className='myPopover'>
                            {tLost('onboarding_step_4_tip')}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>

            <Controller
                control={control} name="websiteHasLogin" rules={{ required: true }}
                render={({ field: { onChange } }) => (
                    <RadioGroup className="myRadio" onChange={(e) => {onChange(e); setValueT(e)}}>
                        <Radio value='true'>{tCommon('yes')}</Radio>
                        <Radio value='false'>{tCommon('no')}</Radio>
                        <Radio value='null'>{tCommon('dont_know')}</Radio>
                    </RadioGroup>
                )}
            />
            {!!errors.websiteHasLogin && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            {value === 'true' && <>
                <div className={cn('formLabel', css.textLine)}>
                    {t('web_link')}
                </div>
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
                    <Input placeholder={tCommon('default_placeholder')} {...register("websiteLoginLink", { required: true, pattern: webUrlPattern })}
                           isInvalid={!!errors.websiteLoginLink}
                           onInput={(e: any) => {
                               e.target.value = e.target.value.replace(/(https?:\/\/)/g, "");
                           }}
                           className="myInput" type='text'/>
                </div>
                {errors?.websiteLoginLink?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                {errors?.websiteLoginLink?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
            </> }


            <div className={css.group}>
                <button type='submit' className={cn('myBtn', 'small', css.btn)}>{tCommon('next')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default OnboardingFourForm;
