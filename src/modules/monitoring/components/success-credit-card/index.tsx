import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {successAlert} from "@/global/helpers/success-alert";
import {getMonitoringStartUrl} from "@/global/helpers/url-generator";
import {useTranslations} from "use-intl";
import {useDispatch, useSelector} from "react-redux";
import {currentCreditCardIdSelector, lastLocaleSelector} from "@/modules/monitoring/store/selector";
import {putCreditCardLinkApi} from "@/global/api/card";
import {Dispatch} from "@/global/store";

const SuccessCreditCard: FC = () => {
    const router = useRouter();
    const {token} = router.query;
    const tLost = useTranslations('LOST_DATA');
    const id = useSelector(currentCreditCardIdSelector);
    const dispatch = useDispatch<Dispatch>();
    const lastLocale = useSelector(lastLocaleSelector);
    const {locale} = useRouter();

    useEffect(() => {
        if(locale && lastLocale) {
            if(locale !== lastLocale) {
                router.push(router.pathname, router.asPath, {locale: lastLocale}).then();
            }
        }
    }, [lastLocale, locale]);

    useEffect(() => {
        if(token && id) {
            putCreditCardLinkApi(id, String(token)).then(async () => {{
                successAlert(tLost('monitoring_credit_card_success_added'));
                await dispatch.payment.getCreditCards();
                router.push(getMonitoringStartUrl()).then();
            }})
        }
    }, [token, id]);
    return (
        <div></div>
    )
}

export default SuccessCreditCard;
