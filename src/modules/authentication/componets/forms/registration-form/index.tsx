import {FC, useEffect} from "react";
import {Input, Popover, PopoverBody, PopoverContent, PopoverTrigger} from '@chakra-ui/react'
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegistrationFormType} from "@/modules/authentication/componets/forms/registration-form/type";
import {emailPattern, passwordPattern} from "@/global/helpers/validation-patterns";
import PasswordInput from "@/global/components/ui/password-input";
import {confirmEmailRequestApi, registrationApi} from "@/global/api/authentication/registration";
import {Dispatch} from "@/global/store";
import {useDispatch, useSelector} from "react-redux";
import {getConfirmEmailUrl} from "@/global/helpers/url-generator";
import {useRouter} from "next/router";
import {setRegisterToken} from "@/global/api/tokens";
import {authenticationCompanySelector, authenticationEmailSelector} from "@/modules/authentication/store/selector";
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'

import css from "./registration-form.module.scss";
import {useTranslations} from "use-intl";
import {GoogleReCaptcha, useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {isPasswordValid, passwordCheckList} from "@/global/helpers/password-check-list";

const RegistrationForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegistrationFormType>({reValidateMode: 'onChange', mode: 'onSubmit'});
    const router = useRouter();
    const password = watch("password", "");
    const email = useSelector(authenticationEmailSelector);
    const company = useSelector(authenticationCompanySelector);
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('REGISTRATION_AUTHENTICATION_PAGE');
    const {locale} = useRouter();
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        document.body.classList.add("login");

        const exitingFunction = () => {
            document.body.classList.remove("login");
        };

        router.events.on("routeChangeStart", exitingFunction);

        return () => {
            router.events.off("routeChangeStart", exitingFunction);
        };
    }, []);

    useEffect(() => {
        setValue("email", email);
        setValue("organisationName", company);
    }, [email, company]);
    const onSubmit: SubmitHandler<RegistrationFormType> = async (data) => {
        // @ts-ignore
        const recaptchaValue = await executeRecaptcha('REGISTER');

        try {
            dispatch.common.toggleModalLoading(true);
            dispatch.authentication.changeEmail(data.email);
            dispatch.authentication.changeCompany(data.organisationName);

            const registration = await registrationApi(
                {email: data.email, password: data.password,
                    organisationName: data.organisationName, recaptchaToken: recaptchaValue}
            );

            if(!registration?.token) {
                throw new Error('Registration token not found');
            }

            setRegisterToken(registration.token);

            const confirm_email = await confirmEmailRequestApi(String(locale).toUpperCase());

            if(!confirm_email?.id) {
                throw new Error('Confirm email not found');
            }
            dispatch.authentication.changeEmailChallenge(confirm_email);

            dispatch.common.toggleModalLoading(false);
            await router.replace(getConfirmEmailUrl())
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.text}>{t('text')}</p>

            <p className="formLabel">{tCommon('company')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("organisationName", { required: true })}
                   isInvalid={!!errors.organisationName}
                   className="myInput" type='text'/>
            {!!errors.organisationName && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className="formLabel">{tCommon('email')}*</p>
            <Input placeholder={tCommon('default_placeholder')} {...register("email", { required: true, pattern: emailPattern })}
                   isInvalid={!!errors.email}
                   className="myInput" type='email'/>
            {errors?.email?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
            {errors?.email?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <p className={cn("formLabel", css.question)}>
                {tCommon('password')}*
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

            <p className="formLabel">{tCommon('password_repeat')}*</p>
            <PasswordInput register={register} isInvalid={!!errors.repeatPassword}
                           validation={{required: true, validate: (value: string) => value === password}}
                           name='repeatPassword'/>
            {errors?.repeatPassword?.type === 'validate' && <p className="formErrorText">{tCommon('password_not_same_error_validation')}</p>}
            {errors?.repeatPassword?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <GoogleReCaptcha  onVerify={(_) => {}} />

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)} type='submit'>{t('button')}</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default RegistrationForm;
