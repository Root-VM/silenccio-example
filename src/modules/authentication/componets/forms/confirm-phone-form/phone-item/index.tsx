import {FC, useEffect } from "react";

import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import EditableElement from "@/global/components/ui/editable-element";
import {Input} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslations} from "use-intl";
import {authenticationPhoneSelector} from "@/modules/authentication/store/selector";
import {confirmPhoneRequestApi} from "@/global/api/authentication/registration";

import css from "./phone-item.module.scss";
import {isValidPhoneNumber} from "libphonenumber-js";
import {useRouter} from "next/router";

const PhoneItemAuth: FC = () => {
    const phone = useSelector(authenticationPhoneSelector);
    const dispatch = useDispatch<Dispatch>();
    const tCommon = useTranslations('COMMON');
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
    } = useForm<{phone:string}>();
    const {locale} = useRouter();


    useEffect(() => {
        phone?.length && setValue('phone', phone);
    }, [phone]);

    const onSubmit: SubmitHandler<{phone:string}> = async (data) => {
        if(!isValidPhoneNumber( data.phone)){
            setError('phone', {type: 'pattern'})
            return;
        }

        try {
            dispatch.common.toggleModalLoading(true);
            const confirm_phone = await confirmPhoneRequestApi(String(locale).toUpperCase(),data.phone);

            if (!confirm_phone?.id) {
                throw new Error('Confirm email not found');
            }
            dispatch.authentication.changePhoneChallenge(confirm_phone);
            dispatch.authentication.changePhone(data.phone);

            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <EditableElement
                isValid={!errors?.phone}
                onSave={() => handleSubmit(onSubmit)()}
                value={phone ? phone : ''}
            >
                <Input placeholder={tCommon('default_placeholder')} {...register("phone", { required: true })}
                       isInvalid={!!errors.phone} defaultValue={phone ?  phone : ''}
                       className="myInput" type='string'/>
            </EditableElement>

            {errors?.phone?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
            {errors?.phone?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

        </form>
    )
}

export default PhoneItemAuth;
