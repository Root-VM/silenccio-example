import {FC, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import Dropdown from "react-dropdown";
import cn from "classnames";

import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {QuestionnaireItemsFormType} from "./type";

import css from "./questionnaire-items.module.scss";
import {Input} from "@chakra-ui/react";
import {questionnaireSelector} from "@/modules/monitoring/store/selector";
import EditableElement from "@/global/components/ui/editable-element";
import {webUrlPattern, webUrlPatternLong} from "@/global/helpers/validation-patterns";
import {successAlert} from "@/global/helpers/success-alert";
import {useTranslations} from "use-intl";

const QuestionnaireItems: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        control,
        formState: { errors },
    } = useForm<QuestionnaireItemsFormType>();
    const questionnaire = useSelector(questionnaireSelector);
    const t = useTranslations('QUESTIONNAIRES_ITEM');
    const tCommon = useTranslations('COMMON');
    const dataOptions = [
        {value: 'true', label: tCommon('yes')},
        {value: 'false', label: tCommon('no')},
        {value: 'null', label: tCommon('dont_know')}
    ]
    const tLost = useTranslations('LOST_DATA');

    useEffect(() => {
        questionnaire?.websiteHasPayment &&
        setValue('websiteHasPayment', questionnaire?.websiteHasPayment);
        questionnaire?.websiteHasLogin &&
        setValue('websiteHasLogin', questionnaire?.websiteHasLogin);
        questionnaire?.websiteHasContactForm &&
        setValue('websiteHasContactForm', questionnaire?.websiteHasContactForm);
        questionnaire?.websiteLoginLink &&
        setValue('websiteLoginLink', questionnaire?.websiteLoginLink);

        if(questionnaire?.websiteHasLogin === 'true') {
            trigger('websiteLoginLink').then();
        }
    }, [questionnaire]);

    const onSubmit: SubmitHandler<QuestionnaireItemsFormType> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);

            if (!data?.websiteLoginLink) data.websiteLoginLink = '';

            await dispatch.monitoring.changeQuestionnaire(data);

            successAlert(t('success'));

            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            {/*has payment*/}
            <p className="formLabel">{t('title')}*</p>
            <div className={css.inputGroup}>
                {
                    questionnaire?.websiteHasPayment &&
                    <EditableElement onSave={() => handleSubmit(onSubmit)()} isValid={true}
                                     value={dataOptions.find(o => o.value === questionnaire?.websiteHasPayment)?.label}>
                        <Controller
                            control={control} name="websiteHasPayment" rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Dropdown placeholder={tLost('dropdown_placeholder')} className={cn('myDropdown', css.d, !!errors.websiteHasPayment && 'error')}
                                          onChange={(e) => onChange(e.value)}
                                          value={dataOptions.find(o => o.value === questionnaire?.websiteHasPayment)}
                                          options={dataOptions}/>
                            )}
                        />
                    </EditableElement>
                }
            </div>

            {/*has contact form*/}
            <p className="formLabel">{t('contact')}*</p>
            <div className={css.inputGroup}>
                {
                    questionnaire?.websiteHasContactForm &&
                    <EditableElement onSave={() => handleSubmit(onSubmit)()} isValid={true}
                                     value={dataOptions.find(o => o.value === questionnaire?.websiteHasContactForm)?.label}>
                        <Controller
                            control={control} name="websiteHasContactForm" rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Dropdown placeholder={tLost('dropdown_placeholder')} className={cn('myDropdown', css.d, !!errors.websiteHasContactForm && 'error')}
                                          onChange={(e) => onChange(e.value)}
                                          value={dataOptions.find(o => o.value === questionnaire?.websiteHasContactForm)}
                                          options={dataOptions} />
                            )}
                        />
                    </EditableElement>
                }
            </div>

            {/*has has login*/}
            <p className="formLabel">{t('login')}*</p>
            <div className={css.inputGroup}>
                {
                    questionnaire?.websiteHasLogin &&
                    <EditableElement onSave={() => handleSubmit(onSubmit)()} isValid={true}
                                     value={dataOptions.find(o => o.value === questionnaire?.websiteHasLogin)?.label}>
                        <Controller
                            control={control} name="websiteHasLogin" rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Dropdown placeholder={tLost('dropdown_placeholder')} className={cn('myDropdown', css.d, !!errors.websiteHasLogin && 'error')}
                                          onChange={(e) => onChange(e.value)}
                                          value={dataOptions.find(o => o.value === questionnaire?.websiteHasLogin)}
                                          options={dataOptions} />
                            )}
                        />
                    </EditableElement>
                }
            </div>

            {/*has registration form*/}
            {
                questionnaire?.websiteHasLogin === 'true' && <>
                    <p className="formLabel">{t('link')}*</p>

                    <div className={css.inputGroup}>
                        <EditableElement onSave={() => handleSubmit(onSubmit)()}
                                         isValid={!errors?.websiteLoginLink}
                                         value={questionnaire?.websiteLoginLink}>
                            <div className={css.line}>
                                <Input placeholder={tCommon('default_placeholder')} {...register("websiteLoginLink", {required: true, pattern: webUrlPatternLong})}
                                       isInvalid={!!errors.websiteLoginLink}
                                       onInput={(e: any) => {
                                           e.target.value = e.target.value.replace(/(https?:\/\/)/g, "");
                                       }}
                                       className={cn('myInput', css.input)} type='text'/>
                            </div>
                        </EditableElement>
                    </div>
                    {errors?.websiteLoginLink?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                    {errors?.websiteLoginLink?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                </>

            }

        </form>
    )
}

export default QuestionnaireItems;
