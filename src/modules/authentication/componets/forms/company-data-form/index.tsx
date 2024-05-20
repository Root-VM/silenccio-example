import {FC, useEffect, useState} from "react";
import {Checkbox, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger} from '@chakra-ui/react'
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import Select from "react-select";
import {PhoneCodes} from "@/global/data/phone-codes";
import {RegistrationCompanyFormType} from "@/modules/authentication/componets/forms/company-data-form/type";
import {
    registrationCompanyDataApi,
    registrationFinalizeApi,
} from "@/global/api/authentication/registration";
import {getOnboardingUrl, getTermsConditionUrl} from "@/global/helpers/url-generator";
import {setAccessToken} from "@/global/api/tokens";
import Link from "next/link";
import {cityPattern} from "@/global/helpers/validation-patterns";
import {activeFreeSubscriptionApi, paymentsBillingAddressFreeApi} from "@/global/api/payment";
import {useTranslations} from "use-intl";

import css from "./company-data-form.module.scss";
import {isValidPhoneNumber} from "libphonenumber-js";
import {authenticationCompanySelector} from "@/modules/authentication/store/selector";

const CompanyDataFrom: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors },
    } = useForm<RegistrationCompanyFormType>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const [clicked, setClicked] = useState(false);
    const tCommon = useTranslations('COMMON');
    const tLost = useTranslations('LOST_DATA');
    const t = useTranslations('COMPANY_AUTHENTICATION_PAGE');
    const {locale} = useRouter();
    const company = useSelector(authenticationCompanySelector);

    useEffect(() => {
        setValue('code', '41');
    }, []);

    const onSubmit: SubmitHandler<RegistrationCompanyFormType> = async (data) => {
        setClicked(true);

        if(!isValidPhoneNumber('+' + data.code + data.phone)){
            setError('phone', {type: 'pattern'})
            return;
        }

        if(!checked) {
            return;
        }

        try {
            dispatch.common.toggleModalLoading(true);
            const code = data.code;
            delete data.code;
            await registrationCompanyDataApi({...data, phone: '+' + code + data.phone});
            data.code = code;

            const finalize = await registrationFinalizeApi();

            finalize?.access && setAccessToken(finalize?.access?.expiresAt, finalize?.access?.token);

            await paymentsBillingAddressFreeApi({
                "companyName": company,
                "street": data.street,
                "houseNumber": data.houseNumber,
                "zipCode": data.zipCode,
                "city": data.city
            });
            await activeFreeSubscriptionApi();

            dispatch.common.toggleModalLoading(false);
            await router.replace(getOnboardingUrl(1));
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
        }
    }

    const goToTerm = () => {
        if(locale === 'de') {
            return 'https://cyberpreventionservices.axa.ch/agb/'
        }
        if(locale === 'en') {
            return 'https://cyberpreventionservices.axa.ch/en/agb/'
        }
        if(locale === 'it') {
            return 'https://cyberpreventionservices.axa.ch/it/cgc/'
        }
        if(locale === 'fr') {
            return 'https://cyberpreventionservices.axa.ch/fr/tc/'
        }

        return 'https://cyberpreventionservices.axa.ch/agb/'
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.text}>{t('text')}.</p>

            <p className="formLabel">{tCommon('street')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("street", { required: true })}
                   isInvalid={!!errors.street}
                   className="myInput" type='text'/>
            {!!errors.street && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className="formLabel">{tCommon('house_number')}</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("houseNumber")}
                   isInvalid={!!errors.houseNumber}
                   className="myInput" type='text'/>
            {!!errors.houseNumber && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className="formLabel">{tCommon('zip')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("zipCode", { required: true, pattern: /^\d{4}$/})}
                   isInvalid={!!errors.zipCode} maxLength={4}
                   pattern="[0-9]*"
                   onInput={(e: any) => {
                       e.target.value = e.target.value.replace(/[^0-9]/g, '');
                   }}
                   className="myInput" type='text'/>
            {errors?.zipCode?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
            {errors?.zipCode?.type === 'pattern' && <p className="formErrorText">{tCommon('zip_error_validation')}</p>}

            <p className="formLabel">{tCommon('city')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("city", { required: true, pattern: cityPattern })}
                   isInvalid={!!errors.city}
                   className="myInput" type='text'/>
            {errors?.city?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
            {errors?.city?.type === 'pattern' && <p className="formErrorText">{tCommon('city_error_validation')}</p>}

            <p className={cn('formLabel', css.question)}>
                {tCommon('phone_number')}*
                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/question.svg" alt="question"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className='myPopover'>
                            {t('companyPhone_info')}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </p>
            <div className={css.phoneLine}>
                {
                    !!locale &&
                    <Controller
                        control={control} name="code" rules={{ required: true }}
                        render={({ field: { onChange } }) => (
                            <Select  classNamePrefix="p"
                                    className={cn( 'phoneSelect', css.drop, !!errors.code && 'error')}
                                    onChange={(e) => onChange(e?.value)}
                                    defaultValue={{ "value": "41", "label": "Switzerland (+41)", "flag": "fi-ch" }}
                                    formatOptionLabel={({ value, label, flag }) => (
                                        <div className='phoneCustomOption'>
                                            <span className={cn('fi', flag)} />
                                            <div className='phoneCustomLabel'>{label}</div>
                                            <div className='phoneCustomValue'>{value}</div>
                                        </div>
                                    )}
                                    options={PhoneCodes[locale]}
                            />
                        )}
                    />
                }
                <Input placeholder={tCommon('default_placeholder')} {...register("phone", { required: true, pattern: /^\d+$/  })}
                       isInvalid={!!errors.phone} type="string"
                       onInput={(e: any) => {
                           e.target.value = e.target.value.replace(/[^0-9]/g, '');
                       }}
                       className="myInput"/>
            </div>
            {errors?.phone?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
            {errors?.phone?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <Checkbox className={cn('myCheck', css.checkbox, clicked && !checked && 'error')}
                      onChange={(e) => setChecked(e.target.checked)}>
                {t('terms_text')}
                <Link target='_blank' href={goToTerm()}>
                    <span>{t('link')}</span>
                </Link>
            </Checkbox>
            {clicked && !checked && <p className="formErrorText">{tLost('conditions_agree')}</p>}

            <div className={css.group}>
                <button type='submit' onClick={() => setClicked(true)} className={cn('myBtn', 'small', css.btn)}>
                    {t('registration')}
                </button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default CompanyDataFrom;
