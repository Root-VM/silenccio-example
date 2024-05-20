import {FC} from "react";
import {Input,} from "@chakra-ui/react";
import cn from "classnames";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";

import css from "./member-add.module.scss";
import {emailPattern, namePattern} from "@/global/helpers/validation-patterns";
import {EmployeeRequestApiType} from "@/global/api/phishing/types";
import {addEmployeeApi} from "@/global/api/phishing";
import {employeesSelector} from "@/modules/phishing/store/selector";
import {useTranslations} from "use-intl";

const MemberAdd: FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EmployeeRequestApiType>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const dispatch = useDispatch<Dispatch>();
    const employees = useSelector(employeesSelector);
    const t = useTranslations('MEMBER_BLOCK');
    const tCommon = useTranslations('COMMON');

    const onSubmit: SubmitHandler<EmployeeRequestApiType> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);

            await addEmployeeApi(data)

            await dispatch.phishing.getEmployees();

            setValue('email', '');
            setValue('lastName','');
            setValue('firstName', '');
            dispatch.common.toggleModalLoading(false);
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>

            <div className={css.inputGroup}>
                <div>
                    <p className="formLabel">{tCommon('first_name')}*</p>
                    <Input placeholder={tCommon('default_placeholder')} {...register("firstName", { required: true, pattern: namePattern })}
                           isInvalid={!!errors.firstName}
                           className="myInput"  type='text'/>
                    {errors?.firstName?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                    {errors?.firstName?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}

                </div>
                <div>
                    <p className="formLabel">{tCommon('last_name')}*</p>
                    <Input placeholder={tCommon('default_placeholder')} {...register("lastName", { required: true, pattern: namePattern })}
                           isInvalid={!!errors.lastName}
                           className="myInput" type='text'/>
                    {errors?.lastName?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                    {errors?.lastName?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                </div>
                <div>
                    <p className="formLabel">{tCommon('email')}*</p>
                    <Input placeholder={tCommon('default_placeholder')} {...register("email", { required: true, pattern: emailPattern })}
                           isInvalid={!!errors.email}
                           className="myInput" type='email'/>
                    {errors?.email?.type === 'pattern' && <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                    {errors?.email?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                </div>
            </div>

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btnI)} type='submit'>
                    {t('btn')}
                </button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>

        </form>
    )
}

export default MemberAdd;
