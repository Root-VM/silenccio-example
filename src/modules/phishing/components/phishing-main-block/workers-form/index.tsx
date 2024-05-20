import {FC, useEffect} from "react";

import {
    Accordion,
    AccordionButton,
    AccordionItem, AccordionPanel, Th,
} from "@chakra-ui/react";
import cn from "classnames";
import {getPhishingStepUrl} from "@/global/helpers/url-generator";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {employeesFromCampaignSelector} from "@/modules/phishing/store/selector";
import Chart from "@/modules/phishing/components/phishing-main-block/workers-form/chart";

import css from "./workers-form.module.scss";
import {useTranslations} from "use-intl";
function calculateActivityPercentages(employeeAsset: any) {
    const activityTypes = ["emailSentDate", "emailOpenedDate", "clickedLinkDate", "submittedDataDate", "emailReportedDate"];
    const activityCounts: any = {};

    // Initialize activity counts to zero
    activityTypes.forEach(type => activityCounts[type] = 0);

    // Count occurrences of each activity type
    employeeAsset.events.forEach((event: any) => {
        activityTypes.forEach(type => {
            if (event[type] !== null) {
                activityCounts[type]++;
            }
        });
    });

    // Calculate percentages
    const totalCount = employeeAsset.events.length;
    const percentages: any = {};
    activityTypes.forEach((type: any) => {
        percentages[type] = (activityCounts[type] / totalCount) * 100;
    });

    return percentages;
}

const WorkersForm: FC = () => {
    const router = useRouter();
    const employees = useSelector(employeesFromCampaignSelector);
    const t = useTranslations('PHISHING_WORKERS');
    const tC = useTranslations('PHISHING_COMPANY_CARD');

    useEffect(() => {
        if(!!employees?.length) {
            const res = calculateActivityPercentages(employees[0]);
            console.log('res', res)
        }
    }, [employees]);

    return (
        <div className={css.wrap}>
            <h4>{t('title')}</h4>
            <p className={css.text}>{t('text')}</p>

            <div className={css.wA}>
                {
                    !!employees?.length &&
                    <>
                        <div className={css.tableHead}>
                            <p></p>
                            <p>{tC('email_1')}</p>
                            <p>{tC('email_2')}</p>
                            <p>{tC('link')}</p>
                            <p>{tC('date')}</p>
                            <p>{tC('email_3')}</p>
                        </div>
                        <Accordion className={cn('myAccordion', 'simple', css.accordion)} allowToggle>
                            {employees.map((employee, index) => (
                                <AccordionItem key={index}>
                                    <AccordionButton className={css.accordionBtn}>
                                        <p>{employee.firstName} {employee.lastName}</p>
                                        <p>
                                            {!!calculateActivityPercentages(employee)?.emailSentDate ?
                                                calculateActivityPercentages(employee)?.emailSentDate + '%' : 0}
                                        </p>
                                        <p>{!!calculateActivityPercentages(employee)?.emailOpenedDate ?
                                            calculateActivityPercentages(employee)?.emailOpenedDate + '%' : 0}
                                        </p>
                                        <p>{!!calculateActivityPercentages(employee)?.clickedLinkDate ?
                                            calculateActivityPercentages(employee)?.clickedLinkDate + '%' : 0}
                                        </p>
                                        <p>{!!calculateActivityPercentages(employee)?.submittedDataDate ?
                                            calculateActivityPercentages(employee)?.submittedDataDate + '%' : 0}
                                        </p>
                                        <p>{!!calculateActivityPercentages(employee)?.emailReportedDate ?
                                            calculateActivityPercentages(employee)?.emailReportedDate + '%' : 0}
                                        </p>
                                    </AccordionButton>
                                    <AccordionPanel className={css.panel}>
                                        {
                                            !!employee?.events?.length && <>
                                                {/*<img src="/img/icons/arrow_back_l.svg" alt="arrow"/>*/}

                                                <Chart employee={employee}/>

                                                {/*<img src="/img/icons/arrow_back_r.svg" alt="arrow"/>*/}
                                            </>
                                        }
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </>
                }
            </div>

            {/*<button onClick={() => router.push(getPhishingStepUrl(1))}*/}
            {/*        className={cn('myBtn', 'small', css.btn)}>neue kampagne*/}
            {/*</button>*/}
        </div>
    )
}

export default WorkersForm;
