import {FC} from "react";
import {Popover, PopoverBody, PopoverContent, PopoverTrigger} from '@chakra-ui/react'
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {passwordPattern} from "@/global/helpers/validation-patterns";
import PasswordInput from "@/global/components/ui/password-input";
import {Dispatch} from "@/global/store";
import {useDispatch} from "react-redux";
import {PasswordFormType} from "@/modules/profile/components/profile-form/password-form/type";
import {editPasswordApi} from "@/global/api/authentication/password-reset";
import {successAlert} from "@/global/helpers/success-alert";

import css from "./password-form.module.scss";
import {useTranslations} from "use-intl";
import {passwordCheckList} from "@/global/helpers/password-check-list";
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

const PasswordForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<PasswordFormType>({reValidateMode: 'onChange', mode: 'onSubmit'});
    const password = watch("newPassword", "");
    const t = useTranslations('PROFILE_PASSWORD');
    const tP = useTranslations('PASSWORD_RESET_CONFIRM_PAGE');
    const tCommon = useTranslations('COMMON');

    const onSubmit: SubmitHandler<PasswordFormType> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);

            await editPasswordApi(data)

            successAlert(t('success'));
            reset();
            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            {/*<h2>{t('title')}</h2>*/}
            <h4>{t('title')}</h4>

            <p className="formLabel">{t('text')}</p>
            <PasswordInput register={register} isInvalid={!!errors.oldPassword}
                           validation={{required: true}}
                           name='oldPassword' />
            {errors?.oldPassword?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className={cn("formLabel", css.question)}>
                {tP('text')}
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

            <PasswordInput register={register} isInvalid={!!errors.newPassword}
                           validation={{required: true, pattern: passwordPattern}}
                           name='newPassword' />
            {/*{errors?.newPassword?.type === 'pattern' && <p className="formErrorText">{tCommon('password_error_validation')}</p>}*/}
            {errors?.newPassword?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

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

            <p className="formLabel">{t('new_password')}</p>
            <PasswordInput register={register} isInvalid={!!errors.repeatPassword}
                           validation={{required: true, validate: (value: string) => value === password}}
                           name='repeatPassword' />
            {errors?.repeatPassword?.type === 'validate' && <p className="formErrorText">{tCommon('password_not_same_error_validation')}</p>}
            {errors?.repeatPassword?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}


            <button className={cn('myBtn', 'small', css.btn)} type='submit'>{t('btn')}</button>

        </form>
    )
}

export default PasswordForm;
