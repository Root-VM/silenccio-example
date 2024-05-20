import {FC, useEffect} from "react";
import cn from "classnames";
import {Input} from "@chakra-ui/react";

import {useRouter} from "next/router";
import {getMonitoringStartUrl, getMonitoringUrl} from "@/global/helpers/url-generator";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import Select from "react-select";
import {PhoneCodes} from "@/global/data/phone-codes";
import {addOrganisationPhoneApi} from "@/global/api/organisation";
import {successAlert} from "@/global/helpers/success-alert";

import css from "./step-one.module.scss";
import {useTranslations} from "use-intl";
import {isValidPhoneNumber} from "libphonenumber-js";

const StepOne: FC = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        setError,
        formState: { errors },
    } = useForm<{code: string, phone:string, name: string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const dispatch = useDispatch<Dispatch>();
    const tLost = useTranslations('LOST_DATA');
    const tCommon = useTranslations('COMMON');
    const {locale} = useRouter();
    const code = watch("code", "41");
    const phone = watch("phone", "");

    useEffect(() => {
        setValue('code', '41');
    }, []);

    const onSubmit: SubmitHandler<{code: string, phone:string, name: string}> = async (data) => {
        if(!isValidPhoneNumber('+' + data.code + data.phone)){
            setError('phone', {type: 'pattern'})
            return;
        }

        try {
            dispatch.common.toggleModalLoading(true);

            await addOrganisationPhoneApi('+' + data.code + data.phone, data.name);

            dispatch.common.toggleModalLoading(false);
            successAlert(tLost('monitoring_phone_success_added'));
            await dispatch.monitoring.getPhones();
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
            <h2>{tLost('monitoring_phone_title')}</h2>
            <p className={css.text}>{tLost('monitoring_phone_text')}</p>

            <p className="formLabel">{tLost('monitoring_phone_field_title')}*</p>
            <div className={css.phoneLine}>
                { !!locale &&
                    <Controller
                        control={control} name="code" rules={{ required: true }}
                        render={({ field: { onChange } }) => (
                            <Select classNamePrefix="p"
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


            <p className={css.text}>{tLost('monitoring_phone_field_description')}</p>

            <p className="formLabel">{tLost('monitoring_phone_field_name_title')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("name", {required: true})} isInvalid={!!errors.name}
                className={cn('myInput', css.input)}/>
            {!!errors?.name && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <div className={css.group}>
                <button type='submit'
                        onClick={() => {
                            if(!isValidPhoneNumber('+' + code + phone)){
                                setError('phone', {type: 'pattern'})
                                return;
                            }
                        }}
                    className={cn('myBtn', 'small', css.btn)}>{tLost('monitoring_phone_next')}</button>
                <button
                    onClick={() => router.push(getMonitoringStartUrl())} type='button'
                    className={cn('myBtn', 'small', 'white', css.btn)}>{tLost('cancel')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default StepOne;
