import {FC, useEffect, useState} from "react";
import cn from "classnames";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useTranslations} from "use-intl";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {useRouter} from "next/router";
import {loginOrganisationsSelector} from "@/modules/login/store/selector";
import {CompanyFormType} from "@/modules/login/components/company-form/type";
import Dropdown from "react-dropdown";
import {getLoginConfirmUrl} from "@/global/helpers/url-generator";

import css from "./login-company-form.module.scss";

const LoginCompanyForm: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const tCommon = useTranslations('COMMON');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CompanyFormType>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const organisations = useSelector(loginOrganisationsSelector);
    const [list, setList] = useState<any>();
    const tLost = useTranslations('LOST_DATA');

    useEffect(() => {
        if(!organisations?.length) {
            return;
        }
        const arr= organisations.map((organisation) => ({
            label: organisation.name,
            value: organisation.id
        }));
        arr?.length && setList(arr)
    }, [organisations]);

    const onSubmit: SubmitHandler<CompanyFormType> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);

            dispatch.loginChallenge.changeCompanyId(Number(data.company));

            dispatch.common.toggleModalLoading(false);

            await router.push(getLoginConfirmUrl());
        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>Login challenge</h2>

            <p className="formLabel">Organisation*</p>

            {
                list?.length &&
                <Controller
                    control={control} name="company" rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                        <Dropdown placeholder={tLost('dropdown_placeholder')} className={cn('myDropdown', !!errors.company && 'error')}
                                  options={list}
                                  onChange={(e) => onChange(e.value)}
                        />
                    )}
                />
            }
            {!!errors.company && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <div className={css.group}>
                <button
                    className={cn('myBtn', 'small', css.btn)} type='submit'>Weiter</button>

                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default LoginCompanyForm;
