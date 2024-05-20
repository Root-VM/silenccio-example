import {FC, useEffect, useState} from "react";
import css from "./cards.module.scss";
import {useSelector} from "react-redux";
import {currentEmployeesSelector} from "@/modules/phishing/store/selector";
import cn from "classnames";
import {useTranslations} from "use-intl";
import {
    calculate,
    calculateCurrentPhishingFilledPercentage,
} from "@/global/helpers/phishing-calculate";

const Cards: FC = () => {
    const employees = useSelector(currentEmployeesSelector);

    const [data, setData] = useState({
        emailSentDate: 0,
        emailOpenedDate: 0,
        clickedLinkDate: 0,
        submittedDataDate: 0,
        emailReportedDate: 0
    });
    const [colorsData, setColorsData] = useState({
        emailSentDate: 'grey',
        emailOpenedDate: 'grey',
        clickedLinkDate: 'grey',
        submittedDataDate: 'grey',
        emailReportedDate: 'grey'
    });
    const t = useTranslations('PHISHING_COMPANY_CARD');

    useEffect(() => {
        if(employees?.length) {
            setData({
                emailSentDate: calculate(employees, 'emailSentDate'),
                emailOpenedDate: calculate(employees, 'emailOpenedDate'),
                clickedLinkDate: calculate(employees, 'clickedLinkDate'),
                submittedDataDate: calculate(employees, 'submittedDataDate'),
                emailReportedDate: calculate(employees, 'emailReportedDate')
            })

            const emailSentDate_P = calculateCurrentPhishingFilledPercentage(employees, 'emailSentDate');
            const emailOpenedDate_P = calculateCurrentPhishingFilledPercentage(employees, 'emailOpenedDate');
            const clickedLinkDate_P = calculateCurrentPhishingFilledPercentage(employees, 'clickedLinkDate');
            const submittedDataDate_P = calculateCurrentPhishingFilledPercentage(employees, 'submittedDataDate');
            const emailReportedDate_P = calculateCurrentPhishingFilledPercentage(employees, 'emailReportedDate');


            setColorsData({
                emailSentDate: emailSentDate_P > 80 ? 'green' : emailSentDate_P > 50 ? 'yellow' : 'red',
                emailOpenedDate: emailOpenedDate_P < 10 ? 'green' : emailOpenedDate_P < 33 ? 'yellow' : 'red',
                clickedLinkDate: clickedLinkDate_P < 5 ? 'green' : clickedLinkDate_P < 15 ? 'yellow' : 'red',
                submittedDataDate: submittedDataDate_P === 0 ? 'green' : submittedDataDate_P <= 5 ? 'yellow' : 'red',
                emailReportedDate: emailReportedDate_P > 50 ? 'green' : emailReportedDate_P >= 33 ? 'yellow' : 'red'
            });
        }

    }, [employees]);

    return (
        <div className={css.cards}>
            <div className={cn(css.card, employees?.length && css.active, css[colorsData.emailSentDate])}>
                <div className={css.circle}>
                    <p>{data.emailSentDate}</p>
                </div>

                <p>{t('email_1')}</p>
            </div>
            <div className={cn(css.card, employees?.length && css.active, css[colorsData.emailOpenedDate])}>
                <div className={css.circle}>
                    <p>{data.emailOpenedDate}</p>
                </div>

                <p>{t('email_2')}</p>
            </div>
            <div className={cn(css.card, employees?.length && css.active, css[colorsData.clickedLinkDate])}>
                <div className={css.circle}>
                    <p>{data.clickedLinkDate}</p>
                </div>

                <p>{t('link')}</p>
            </div>
            <div className={cn(css.card, employees?.length && css.active, css[colorsData.submittedDataDate])}>
                <div className={css.circle}>
                    <p>{data.submittedDataDate}</p>
                </div>

                <p>{t('date')}</p>
            </div>
            <div className={cn(css.card, employees?.length && css.active, css[colorsData.emailReportedDate])}>
                <div className={css.circle}>
                    <p>{data.emailReportedDate}</p>
                </div>

                <p>{t('email_3')}</p>
            </div>
        </div>
    )
}

export default Cards;
