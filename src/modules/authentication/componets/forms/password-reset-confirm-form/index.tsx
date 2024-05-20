import {FC, useEffect, useState} from "react";
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {useRouter} from "next/router";
import {PasswordResetConfirmFormType} from "@/modules/authentication/componets/forms/password-reset-confirm-form/type";
import {decodeBase64} from "@/global/helpers/base64-decode";

import css from "./password-reset-confirm-form.module.scss";
import {Popover, PopoverBody, PopoverContent, PopoverTrigger} from "@chakra-ui/react";
import PasswordInput from "@/global/components/ui/password-input";
import {passwordPattern} from "@/global/helpers/validation-patterns";
import {passwordResetNewApi} from "@/global/api/authentication/password-reset";
import {successAlert} from "@/global/helpers/success-alert";
import {getLoginUrl} from "@/global/helpers/url-generator";
import {useTranslations} from "use-intl";
import {passwordCheckList} from "@/global/helpers/password-check-list";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

const PasswordResetConfirmForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordResetConfirmFormType>({reValidateMode: 'onChange', mode: 'onSubmit'});
    const password = watch("password", "");
    const router = useRouter();
    const [decodeUrl, setDecodeUrl] = useState<string>('');
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('PASSWORD_RESET_CONFIRM_PAGE');

    useEffect(() => {
        if(typeof router?.query?.token === 'string') {
            const decode = decodeBase64(router.query.token);
            decode && setDecodeUrl(decode);

        }
    }, [router.query]);

    const onSubmit: SubmitHandler<PasswordResetConfirmFormType> = async (data) => {
        try {
            dispatch.common.setLoadingModal(true);
            await passwordResetNewApi(decodeUrl, data.password);

            dispatch.common.setLoadingModal(false);
            successAlert(t('success_alert'));
            await router.push(getLoginUrl());

        } catch (e) {
            dispatch.common.setLoadingModal(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>

            <p className={cn("formLabel", css.question)}>
                {t('text')}
                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/question.svg" alt="question"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className='myPopover'>
                            {t('inform_d_0')}<br/>
                            <ul style={{listStyle: 'none', paddingLeft: '5px' }}>
                                <li>{t('inform_d_1')}</li>
                                <li>{t('inform_d_2')}</li>
                                <li>{t('inform_d_3')}</li>
                                <li>{t('inform_d_4')}</li>
                                <li>{t('inform_d_5')}</li>
                            </ul>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </p>
            <PasswordInput register={register} isInvalid={!!errors.password}
                           validation={{required: true, pattern: passwordPattern}}
                           name='password' />
            {/*{errors?.password?.type === 'pattern' && <p className="formErrorText">{tCommon('password_error_validation')}</p>}*/}
            {errors?.password?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            {
                !!password &&
                <ul className='checkList'
                    style={{listStyle: 'none', paddingLeft: '5px', marginTop: '-10px', marginBottom: '10px'}}>
                    <li>
                        {passwordCheckList(password).length ? <CheckIcon className='green' color="green.500" /> : <CloseIcon className='red' color="#C91432" />}
                        {t('inform_d_1')}</li>
                    <li>
                        {passwordCheckList(password).lowercase ? <CheckIcon className='green' color="green.500" /> : <CloseIcon className='red' color="#C91432" />}
                        {t('inform_d_2')}</li>
                    <li>
                        {passwordCheckList(password).uppercase ? <CheckIcon className='green' color="green.500" /> : <CloseIcon className='red' color="#C91432" />}
                        {t('inform_d_3')}</li>
                    <li>
                        {passwordCheckList(password).digit ? <CheckIcon className='green' color="green.500" /> : <CloseIcon className='red' color="#C91432" />}
                        {t('inform_d_4')}</li>
                    <li>
                        {passwordCheckList(password).special ? <CheckIcon className='green' color="green.500" /> : <CloseIcon className='red' color="#C91432" />}
                        {t('inform_d_5')}</li>
                </ul>
            }


            <p className="formLabel">{t('repeat')}</p>
            <PasswordInput register={register} isInvalid={!!errors.repeatPassword}
                           validation={{required: true, validate: (value: string) => value === password || "Passwords do not match"}}
                           name='repeatPassword' />
            {errors?.repeatPassword?.type === 'pattern' && <p className="formErrorText">{tCommon('password_not_same_error_validation')}</p>}
            {errors?.repeatPassword?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}


            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)} type='submit'>{t('button')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default PasswordResetConfirmForm;
