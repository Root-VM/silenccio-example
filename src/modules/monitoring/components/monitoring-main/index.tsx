import {FC, useEffect} from "react";
import cn from "classnames";
import {useRouter} from "next/router";
import {getMonitoringStartUrl} from "@/global/helpers/url-generator";

import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import WebItems from "@/modules/monitoring/components/monitoring-main/web-items";
import QuestionnaireItems from "@/modules/monitoring/components/monitoring-main/questionnaire-items";
import EmailItem from "@/modules/monitoring/components/monitoring-main/email-item";
import {phonesSelector} from "@/modules/monitoring/store/selector";

import css from "./monitoring-main.module.scss";
import PhoneItem from "@/modules/monitoring/components/monitoring-main/phone-item";
import {creditCardsSelector, isPaidSelector} from "@/global/store/payment/selector";
import CreditCardItem from "@/modules/monitoring/components/monitoring-main/credit-card-item";
import {useTranslations} from "use-intl";

const MonitoringMain: FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const phones = useSelector(phonesSelector);
    const creditCards = useSelector(creditCardsSelector);
    const t = useTranslations('MONITORING_PAGE');
    const isPaid = useSelector(isPaidSelector);

    useEffect(() => {
        Promise.all([
            dispatch.monitoring.getWeb(),
            dispatch.monitoring.getQuestionnaire(),
            dispatch.monitoring.getEmail(),
            dispatch.monitoring.getPhones(),
            isPaid && dispatch.payment.getCreditCards(),
        ]).then();
    }, [isPaid]);

    return (
        <div className={css.wrap}>
            <div className={css.content}>
                <h2>{t('title')}</h2>

                <p className={css.text}>{t('text')}</p>

                <div className={css.inform}>
                    <img src="/img/icons/i.svg" alt="i"/>
                    <p>{t('info')}</p>
                </div>

                <p className="formLabel">{t('domain')}*</p>
                <WebItems/>

                <QuestionnaireItems/>

                <p className="formLabel">{t('email_domain')}*</p>
                <EmailItem/>

                {
                    !!isPaid && <>
                        <h2>{t('inform_title')}</h2>
                        <p className={css.text}>
                            {t('inform_text')}
                        </p>

                        {
                            !!phones?.length && <> {
                                phones.map((item, index) => {
                                    return <>
                                        <p className="formLabel">{t('phone')} <span>({item.name})</span>*</p>
                                        <PhoneItem key={index} item={item}/>
                                    </>
                                })
                            }</>
                        }

                        {
                            !!creditCards?.length && <> {
                                creditCards.map((item, index) => {
                                    return item?.name && item?.linked ? <>
                                        <p className="formLabel">
                                            {t('credit')}
                                        </p>
                                        <CreditCardItem key={index} item={item}/>
                                    </> : ''
                                })
                            }</>
                        }

                        <button onClick={() => router.push(getMonitoringStartUrl())}
                                className={cn('myBtn', 'small', 'white', css.btn)}>{t('button')}
                        </button>
                    </>
                }

            </div>
        </div>
    )
}

export default MonitoringMain;
