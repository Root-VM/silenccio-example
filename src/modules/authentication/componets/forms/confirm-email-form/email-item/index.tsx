import {FC, useEffect } from "react";

import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import EditableElement from "@/global/components/ui/editable-element";
import {Input} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {emailPattern} from "@/global/helpers/validation-patterns";
import {useTranslations} from "use-intl";

import css from "./email-item.module.scss";
import {authenticationEmailSelector} from "@/modules/authentication/store/selector";
import {confirmEmailRequestApi} from "@/global/api/authentication/registration";
import {useRouter} from "next/router";

const EmailItemAuth: FC = () => {
    const email = useSelector(authenticationEmailSelector);
    const dispatch = useDispatch<Dispatch>();
    const tCommon = useTranslations('COMMON');
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<{email:string}>();
    const {locale} = useRouter();

    useEffect(() => {
        email?.length && setValue('email', email);
    }, [email]);

    const onSubmit: SubmitHandler<{email:string}> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);
            const confirm_email = await confirmEmailRequestApi(String(locale).toUpperCase(), data.email);

            if (!confirm_email?.id) {
                throw new Error('Confirm email not found');
            }
            dispatch.authentication.changeEmailChallenge(confirm_email);
            dispatch.authentication.changeEmail(data.email);

            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <EditableElement
                isValid={!errors?.email}
                onSave={() => handleSubmit(onSubmit)()}
                value={email ? email : ''}
            >
                <Input placeholder={tCommon('default_placeholder')} {...register("email", { required: true, pattern: emailPattern })}
                       isInvalid={!!errors.email} defaultValue={email ?  email : ''}
                       className="myInput" type='email'/>
            </EditableElement>

            {errors?.email?.type === 'pattern' && <p className="formErrorText">{tCommon('email_error_validation')}</p>}
            {errors?.email?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

        </form>
    )
}

export default EmailItemAuth;
