import {FC, useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {emailSelector, websSelector} from "@/modules/monitoring/store/selector";
import EditableElement from "@/global/components/ui/editable-element";
import {Input} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {emailPattern} from "@/global/helpers/validation-patterns";
import {useTranslations} from "use-intl";

import css from "./email-item.module.scss";
import {successAlert} from "@/global/helpers/success-alert";

const EmailItem: FC = () => {
    const email = useSelector(emailSelector);
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<{email:string}>();
    const tCommon = useTranslations('COMMON');
    const [show, setShow] = useState(true);

    useEffect(() => {
        email?.length && setValue('email', email[0]?.sender);

        setShow(false);
        setTimeout(() => setShow(true), 100);
    }, [email]);

    const onSubmit: SubmitHandler<{email:string}> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);

            const edit =await dispatch.monitoring.editEmail({email: data.email, id: email?.[0]?.id, domain: data.email?.split('@')[1]});
            if(edit === 'ok') {
                successAlert(tCommon('email_was_changed'));
            }

            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <>
            {
                show &&
                <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
                    <EditableElement
                        isValid={!errors?.email}
                        onSave={() => handleSubmit(onSubmit)()}
                        value={email.length ? email[0]?.sender : ''}
                    >
                        <Input placeholder={tCommon('default_placeholder')} {...register("email", {
                            required: true,
                            pattern: emailPattern
                        })}
                               isInvalid={!!errors.email} defaultValue={email?.length ? email[0].sender : ''}
                               className="myInput" type='email'/>
                    </EditableElement>

                    {errors?.email?.type === 'pattern' &&
                        <p className="formErrorText">{tCommon('email_error_validation')}</p>}
                    {errors?.email?.type === 'required' &&
                        <p className="formErrorText">{tCommon('must_be_required')}</p>}

                </form>
            }
        </>
    )
}

export default EmailItem;
