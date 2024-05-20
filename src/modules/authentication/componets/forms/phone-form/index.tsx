import {FC, useEffect, useState} from "react";
import { Input } from '@chakra-ui/react'
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {
    authenticationPhoneCodeSelector,
    authenticationPhoneDataSelector
} from "@/modules/authentication/store/selector";
import Select from 'react-select'

import {
     confirmPhoneRequestApi,
} from "@/global/api/authentication/registration";
import {getConfirmPhoneUrl} from "@/global/helpers/url-generator";
import {PhoneCodes} from "@/global/data/phone-codes";

import css from "./phone-form.module.scss";
import {useTranslations} from "use-intl";
import {isValidPhoneNumber} from "libphonenumber-js";

const PhoneForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const phoneCode = useSelector(authenticationPhoneCodeSelector);
    const phoneData = useSelector(authenticationPhoneDataSelector);
    const {
        register,
        control,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm<{phone:string, code: string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const [codeValue, setCodeValue] = useState<any>();
    const [show, setShow] = useState(true);
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('PHONE_AUTHENTICATION_PAGE');
    const {locale} = useRouter();

    const reload = () => {
        setShow(false);
        setTimeout(() => setShow(true), 100);
    }
    useEffect(() => {
        if(locale) {
            setValue('phone', phoneData);
            setValue('code', phoneCode);

            if(phoneCode && PhoneCodes[locale]?.length) {
                setCodeValue(PhoneCodes[locale].find((el: any) => el.value === phoneCode))
                reload()
            }
        }

    }, [phoneCode, phoneData, locale]);

    const onSubmit: SubmitHandler<{phone:string, code: string}> = async (data) => {
        if(!isValidPhoneNumber('+' + data.code + data.phone)){
            setError('phone', {type: 'pattern'})
            return;
        }

        try {
            dispatch.common.setLoadingModal(true);
            dispatch.authentication.changePhoneCode(data.code);
            dispatch.authentication.changePhoneData(data.phone);

            const confirm_phone =
                await confirmPhoneRequestApi(String(locale).toUpperCase(),'+' + data.code + data.phone);

            if(!confirm_phone?.id) {
                throw new Error('Confirm phone not found');
            }
            dispatch.authentication.changePhoneChallenge(confirm_phone);
            dispatch.authentication.changePhone('+' + data.code + data.phone);

            dispatch.common.setLoadingModal(false);
            await router.replace(getConfirmPhoneUrl())

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

            <p className="formLabel">{tCommon('mobile_phone')}*</p>

            <div className={css.phoneLine}>
                {
                    show && locale &&
                    <Controller
                        control={control} name="code" rules={{ required: true }}
                        render={({ field: { onChange } }) => (
                            <Select classNamePrefix="p"
                                    className={cn( 'phoneSelect', css.drop, !!errors.code && 'error')}
                                    onChange={(e) => {onChange(e?.value)}}
                                    formatOptionLabel={({ value, label, flag }) => (
                                        <div className='phoneCustomOption'>
                                            <span className={cn('fi', flag)} />
                                            <div className='phoneCustomLabel'>{label}</div>
                                            <div className='phoneCustomValue'>{value}</div>
                                        </div>
                                    )}
                                    options={PhoneCodes[locale]} defaultValue={codeValue}
                            />
                        )}
                    />
                }
                <Input placeholder={tCommon('default_placeholder')} {...register("phone", { required: true, pattern: /^\d+$/ })}
                       isInvalid={!!errors.phone} type="string"
                       onInput={(e: any) => {
                           e.target.value = e.target.value.replace(/[^0-9]/g, '');
                       }}
                       className="myInput"/>

            </div>
            {errors?.phone?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
            {errors?.phone?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}


            <div className={css.group}>
                <button type='submit' className={cn('myBtn', 'small', css.btn)}>{tCommon('next')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default PhoneForm;
