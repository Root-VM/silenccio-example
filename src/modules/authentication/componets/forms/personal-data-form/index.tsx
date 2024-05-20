import {FC, useEffect, useState} from "react";
import { Input } from '@chakra-ui/react'
import cn from "classnames";
import Dropdown from "react-dropdown";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {registrationPersonalDataApi} from "@/global/api/authentication/registration";
import {RegistrationPersonalFormType} from "@/modules/authentication/componets/forms/personal-data-form/type";
import {authenticationEmailSelector} from "@/modules/authentication/store/selector";
import {getRegistrationCompanyDataUrl} from "@/global/helpers/url-generator";
import {sexList} from "@/global/data/sex-list";
import {roleList} from "@/global/data/role-list";

import css from "./personal-data-form.module.scss";
import {namePattern} from "@/global/helpers/validation-patterns";
import {useTranslations} from "use-intl";

const PersonalDataFrom: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegistrationPersonalFormType>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const email = useSelector(authenticationEmailSelector);
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('PERSONAL_DATA_AUTHENTICATION_PAGE');
    const {locale} = useRouter();
    const [show, setShow] = useState(true);
    const tLost = useTranslations('LOST_DATA');

    useEffect(() => {
        reload();
    }, [locale]);

    const reload = () => {
        setShow(false);
        setTimeout(() => setShow(true), 100);
    }

    const onSubmit: SubmitHandler<RegistrationPersonalFormType> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);
            delete data.phone;
            await registrationPersonalDataApi(
                {...data, email}
            );
            dispatch.common.toggleModalLoading(false);
            await router.replace(getRegistrationCompanyDataUrl());
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.text}>{t('text')}</p>

            <p className="formLabel">{tCommon('sex')}*</p>
            {
                locale && show &&
                <Controller
                    control={control} name="sex" rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                        <Dropdown placeholder={tLost('dropdown_placeholder')} className={cn('myDropdown', !!errors.sex && 'error')}
                                  options={sexList[locale]}
                                  onChange={(e) => onChange(e.value)}
                        />
                    )}
                />
            }
            {!!errors.sex && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className="formLabel">{tCommon('first_name')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("firstName", { required: true, pattern: namePattern })}
                   isInvalid={!!errors.firstName}
                   className="myInput" type='text'/>
            {errors?.firstName?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
            {errors?.firstName?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}


            <p className="formLabel">{tCommon('last_name')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("lastName", { required: true, pattern: namePattern })}
                   isInvalid={!!errors.lastName}
                   className="myInput" type='text'/>
            {errors?.lastName?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
            {errors?.lastName?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}


            <p className="formLabel">{tCommon('position')}*</p>
            {
                locale && show &&
                <Controller
                    control={control} name="positionInCompany" rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                        <Dropdown  placeholder={tLost('dropdown_placeholder')}  className={cn('myDropdown', !!errors.positionInCompany && 'error')}
                                  onChange={(e) => onChange(e.value)}
                                  options={roleList[locale]}/>
                    )}
                />
            }
            {!!errors.positionInCompany && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <div className={css.group}>
                <button type='submit' className={cn('myBtn', 'small', css.btn)}>{t('button')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default PersonalDataFrom;
