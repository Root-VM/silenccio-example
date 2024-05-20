import {FC, useEffect, useState} from "react";
import cn from "classnames";

import css from "./it-scan-block.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {creditCardsSelector, isPaidSelector} from "@/global/store/payment/selector";
import {useRouter} from "next/router";
import {getMonitoringUrl} from "@/global/helpers/url-generator";
import {Dispatch} from "@/global/store";
import {useTranslations} from "use-intl";

const MonitoringBlock: FC = () => {
    const creditCards = useSelector(creditCardsSelector);
    const isPaid = useSelector(isPaidSelector);
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const [loaded, setLoaded] = useState(false);
    const t = useTranslations('MONITORING_BLOCK');

    useEffect(() => {
        if(isPaid && !loaded) {
            const init = async () => {
                try {
                    await dispatch.payment.getCreditCards();
                    setLoaded(true);
                } catch (e) {
                    console.log(e);
                }
            }
            !creditCards?.length && init();
        }
    }, [creditCards, isPaid, loaded]);

    return (
        <>
            {!creditCards?.length && isPaid &&
                <div className={css.wrap}>
                    <p className={css.title}>
                        {t('monitoring_title')}
                    </p>
                    <p className={css.text}>{t('monitoring_text')}</p>

                    <button onClick={() => router.push(getMonitoringUrl())}
                        className={cn('myBtn', 'small', 'white', css.btn)}
                    >{t('btn')}</button>
                </div>
            }
        </>
    )
}

export default MonitoringBlock;
