import {FC, useEffect, useMemo, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {websSelector} from "@/modules/monitoring/store/selector";
import EditableElement from "@/global/components/ui/editable-element";
import {Input} from "@chakra-ui/react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Select from "react-select";
import cn from "classnames";
import {WebProtocols} from "@/global/data/web-protocols";
import {webUrlPattern} from "@/global/helpers/validation-patterns";

import css from "./web-items.module.scss";
import {useTranslations} from "use-intl";
import {successAlert} from "@/global/helpers/success-alert";

const WebItems: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const webs = useSelector(websSelector);
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<{code:string, web: string}>();
    const tCommon = useTranslations('COMMON');
    const [show, setShow] = useState(true);

    useEffect(() => {
        setValue('code', 'https://');
        webs?.id && setValue('web', webs.hostname);

        setShow(false);
        setTimeout(() => setShow(true), 100);
    }, [webs]);

    const onSubmit: SubmitHandler<{code:string, web: string}> = async (data) => {
        if(data.web !== webs.hostname) {
            try {
                dispatch.common.toggleModalLoading(true);

                const edit = await dispatch.monitoring.changeWeb({id: webs?.id, web: data?.code + data?.web});
                if(edit === 'ok') {
                    successAlert(tCommon('web_was_changed'));
                }
                dispatch.common.toggleModalLoading(false);
            } catch (e) {
                dispatch.common.toggleModalLoading(false);
                console.error('error', e)
            }
        }
    }

    return (
        <>
            {
                show &&
                <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
                    <EditableElement
                        isValid={!errors.web}
                        onSave={() => handleSubmit(onSubmit)()}
                        value={webs?.id ? webs.protocol + '://' + webs?.hostname : ''}
                    >
                        <div className={css.line}>
                            <Controller
                                control={control} name={"code"} rules={{required: true}}
                                render={({field: {onChange}}) => (
                                    <Select classNamePrefix="p"
                                            className={cn('phoneSelect', css.drop, !!errors.code && 'error')}
                                            onChange={(e: any) => {
                                                onChange(e?.value)
                                            }}
                                            formatOptionLabel={(data: any) => (
                                                <div className='phoneCustomOption'>
                                                    <div className='phoneCustomLabel'>{data?.label}</div>
                                                    <div className='phoneCustomValue'>{data?.label}</div>
                                                </div>
                                            )}
                                            options={WebProtocols} defaultValue={{label: 'https', value: 'https://'}}
                                    />
                                )}
                            />
                            <Input placeholder={tCommon('default_placeholder')} {...register("web", {
                                required: true,
                                pattern: webUrlPattern
                            })}
                                   isInvalid={!!errors.web}
                                   onInput={(e: any) => {
                                       e.target.value = e.target.value.replace(/(https?:\/\/)/g, "");
                                   }}
                                   className={cn('myInput', css.input)} type='text'/>
                        </div>
                    </EditableElement>

                    {errors?.web?.type === 'pattern' &&
                        <p className="formErrorText">{tCommon('format_error_validation')}</p>}
                    {errors?.web?.type === 'required' && <p className="formErrorText">{tCommon('must_be_required')}</p>}
                </form>
            }

        </>
    )
}

export default WebItems;
