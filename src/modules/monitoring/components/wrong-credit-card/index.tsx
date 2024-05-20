import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {getMonitoringUrl} from "@/global/helpers/url-generator";
import cn from "classnames";
import {useTranslations} from "use-intl";

import css from "./wrong-credit-card.module.scss";
import {useSelector} from "react-redux";
import {lastLocaleSelector} from "@/modules/monitoring/store/selector";
const WrongCreditCard: FC = () => {
    const router = useRouter();
    const tLost = useTranslations('LOST_DATA');
    const lastLocale = useSelector(lastLocaleSelector);
    const {locale} = useRouter();

    useEffect(() => {
        if(locale && lastLocale) {
            if(locale !== lastLocale) {
                router.push(router.pathname, router.asPath, {locale: lastLocale}).then();
            }
        }
    }, [lastLocale, locale]);

    return (
        <div className={css.wrap}>
            <h2>{tLost('monitoring_credit_card_error')}</h2>

            <button onClick={() => router.push(getMonitoringUrl())}
                    className={cn('myBtn', 'small', 'white', css.btnLast)}>
                {tLost('monitoring_credit_card_error_back')}
            </button>
        </div>
    )
}

export default WrongCreditCard;
