import {FC} from "react";
import {
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger, Radio, RadioGroup
} from '@chakra-ui/react'
import cn from "classnames";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {getOnboardingUrl} from "@/global/helpers/url-generator";

import css from "./onboarding-two-form.module.scss";
import {useTranslations} from "use-intl";

const OnboardingTwoForm: FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<{websiteHasPayment: string}>({reValidateMode: 'onSubmit', mode: 'onSubmit'});
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const tCommon = useTranslations('COMMON');
    const t = useTranslations('ONBOARDING_TWO_AUTHENTICATION_PAGE');

    const onSubmit: SubmitHandler<{websiteHasPayment: string}> = async (data) => {
        try {
            dispatch.common.toggleModalLoading(true);
            dispatch.authentication.changeOnboardingData({websiteHasPayment: data.websiteHasPayment});

            dispatch.common.toggleModalLoading(false);
            await router.replace(getOnboardingUrl(3));

        } catch (e) {
            dispatch.common.toggleModalLoading(false);
            console.error('error', e)
        }
    }

    return (
        <form className={css.wrap} onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('title')}</h2>
            <p className={css.title}>{t('pre_text')}</p>
            <div className={css.text}>
                {t('text')}
                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/question.svg" alt="question"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className='myPopover'>
                            {t('inform_detail_s')}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>

            <Controller
                control={control} name="websiteHasPayment" rules={{ required: true }}
                render={({ field: { onChange } }) => (
                    <RadioGroup className="myRadio" onChange={(e) => onChange(e)}>
                        <Radio value='true'>{tCommon('yes')}</Radio>
                        <Radio value='false'>{tCommon('no')}</Radio>
                        <Radio value='null'>{tCommon('dont_know')}</Radio>
                    </RadioGroup>
                )}
            />
            {!!errors.websiteHasPayment && <p className="formErrorText">{tCommon('must_be_required')}</p>}

            <div className={css.group}>
                <button type='submit' className={cn('myBtn', 'small', css.btn)}>{tCommon('next')}</button>
                <p className={css.importantText}>{tCommon('required_fields')}</p>
            </div>
        </form>
    )
}

export default OnboardingTwoForm;
