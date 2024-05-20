import {FC} from "react";
import cn from "classnames";
import {useRouter} from "next/router";
import {getMonitoringStepUrl, getMonitoringUrl} from "@/global/helpers/url-generator";
import css from "./step-two.module.scss";
import {useSelector} from "react-redux";
import {useTranslations} from "use-intl";
import Link from "next/link";
import {creditCardsSelector} from "@/global/store/payment/selector";
import {phonesSelector} from "@/modules/monitoring/store/selector";

const setPropCountToString = (phones_length: number, credit_cards_length: number, str: string) => {
    const phone_num = 5 - phones_length ? 5 - phones_length : 0;
    const credit_num = 5 - credit_cards_length ? 5 - credit_cards_length : 0;

    return str
        .replace('(N)', phone_num.toString())
        .replace('(N)', credit_num.toString());
}
const StepTwo: FC = () => {
    const router = useRouter();
    const t = useTranslations('MONITORING_START_PAGE');
    const phones = useSelector(phonesSelector);
    const creditCards = useSelector(creditCardsSelector);

    return (
        <div className={css.wrap}>
            <img onClick={() => router.push(getMonitoringUrl())}
                 className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>
            <h2>{t('title')}</h2>
            <p className={css.text}>{setPropCountToString(phones?.length, creditCards?.filter(val => val?.linked)?.length, t('text'))}</p>

            <div className={css.group}>
                <button disabled={phones?.length >= 5} onClick={() => router.push(getMonitoringStepUrl(1))}
                        className={cn('myBtn', 'small', css.btn)}>
                    {t('phone_btn')}
                </button>

                <button disabled={creditCards?.filter(val => val?.linked)?.length >= 5} onClick={() => router.push(getMonitoringStepUrl(4))}
                        className={cn('myBtn', 'small', css.btn)}>
                    {t('credit_btn')}
                </button>
            </div>

            <p className={css.text}>
                {t('info_1')}
                <a>
                    <Link href={getMonitoringUrl()}>
                    {t('info_link')}
                </Link>
                </a>
                {t('info_2')}
            </p>

            <button onClick={() => router.push(getMonitoringUrl())}
                    className={cn('myBtn', 'small', css.btnLast)}>{t('button')}</button>
        </div>
    )
}

export default StepTwo;
