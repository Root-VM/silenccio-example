import {FC, useEffect, useState} from "react";
import cn from "classnames";
import {
    Accordion
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {isPaidSelector, subscriptionsSelector} from "@/global/store/payment/selector";
import UpdateModal from "@/modules/dashboard/modals/update-modal";
import {useTranslations} from "use-intl";
import {Dispatch} from "@/global/store";
import {
    getOrganisationEmailApi,
    getOrganisationEmailServerApi,
    getOrganisationPhonesApi,
    getOrganisationWebApi
} from "@/global/api/organisation";
import {getCreditCardApi} from "@/global/api/card";
import {
    getCreditCardFindingApi,
    getEmailFindingApi,
    getEmailServerFindingApi,
    getFreeEmailFindingApi,
    getFreeEmailServerFindingApi,
    getFreePhoneFindingApi,
    getFreeWebFindingApi,
    getLastFreeScanApi,
    getLastPaidScanApi,
    getPhoneFindingApi,
    getWebFindingApi
} from "@/global/api/finding";

import AccordionDashboardItem from "@/modules/dashboard/componets/it-security/accorrdion-item";
import {getAccountDataApi, getAccountOrganisationDataApi} from "@/global/api/account";
import Moment from "react-moment";
import {findingsResolvedSelector, findingsSelector, ignoredFindingsSelector} from "@/modules/dashboard/store/selector";

import css from "./it-security.module.scss";
import {getFilterColor} from "@/global/helpers/filter-color";
import {currentCampaignIdSelector, employeesFromCampaignSelector} from "@/modules/phishing/store/selector";
import {calculatePhishingFilledPercentage} from "@/global/helpers/phishing-calculate";
import {exportFindingsApi} from "@/global/api/export";
import {exportBodyGeneration} from "@/global/helpers/export/export-body-generation";
import {useRouter} from "next/router";
import {getMonitoringUrl, getPhishingUrl} from "@/global/helpers/url-generator";
import moment from "moment";
import {exportHeaderGeneration} from "@/global/helpers/export/export-header-generation";
import {exportFooterGeneration} from "@/global/helpers/export/export-footer-generation";
import AccordionDashboardItemIgnored from "@/modules/dashboard/componets/it-security/accorrdion-item-ignored";
import AccordionDashboardItemResolved from "@/modules/dashboard/componets/it-security/accorrdion-item-resolved";

const groupDuplicates = (array: any[]) => {
    const groupedArray: any = [];

    array.forEach(item => {
        let found = false;
        groupedArray.forEach((group: any) => {
            if (group.length > 0 && group[0].name === item.name && group[0].tag === item.tag) {
                group.push(item);
                found = true;
            }
        });
        if (!found) {
            groupedArray.push([item]);
        }
    });

    return groupedArray;
}

const findGlobalColor = (findings: any[], phishing_color: any ) => {
    const network = getFilterColor(findings, 'NETWORK');
    const web = getFilterColor(findings, 'WEB_PRESENCE')
    const mail= getFilterColor(findings, 'MAIL');
    const data = getFilterColor(findings, 'DATA_LEAK');

    if(network === 'red' || web === 'red' || mail === 'red' || data === 'red' || phishing_color === 'red') {
        return 'red';
    }
    if(network === 'yellow' || web === 'yellow' || mail === 'yellow' || data === 'yellow' ||  phishing_color === 'yellow') {
        return 'yellow';
    }

    return 'green';
}

const ItSecurity: FC = () => {
    const t = useTranslations('DASHBOARD_PAGE');
    const tP = useTranslations('PROFILE_PAGE');
    const tPDF = useTranslations('PDF_Export');
    const dispatch = useDispatch<Dispatch>();
    const isPaid = useSelector(isPaidSelector);
    const [lastLoginDate, setLastLoginDate] = useState('');
    const [lastScanDate, setLastScanDate] = useState('');
    const [ignoredFindings, setIgnoredFindings] = useState<any[]>([]);
    const findings = useSelector(findingsSelector);
    const findingsResolved = useSelector(findingsResolvedSelector);
    const ignoredFindingsS = useSelector(ignoredFindingsSelector);
    const [filteredFindings, setFilteredFindings] = useState<any[]>([]);
    const [filteredFindingsResolved, setFilteredFindingsResolved] = useState<any[]>([]);
    const [canLoadFinding, setCanLoadFinding] = useState(false);
    const [globalColor, setGlobalColor] = useState('green');
    const employees = useSelector(employeesFromCampaignSelector);
    const [phishingColor, setPhishingColor] = useState('grey');
    const [accountData, setAccountData] = useState<any>(null);
    const subscriptions =  useSelector(subscriptionsSelector);
    const {locale} = useRouter();
    const router = useRouter();
    const currentId = useSelector(currentCampaignIdSelector);
    const [isOpen, setIsOpen] = useState(-1);
    const [isOpenIgnore, setIsOpenIgnore] = useState(-1);

    useEffect(() => {
        const loadMainDateInfo = async () => {

            try {
               const account = await getAccountDataApi();
               if(account?.lastLoginAt) {
                   setLastLoginDate(account?.lastLoginAt);
               }
               setAccountData(account);
            } catch (e) {
                console.log(e);
            }
        }

        dispatch.payment.changePaymentStatus(null);
        dispatch.payment.checkIfPaid().then(() => setCanLoadFinding(true));
        loadMainDateInfo().then();
    }, [])

    useEffect(() => {
        if(employees?.length) {
            const emailSentDate_P = calculatePhishingFilledPercentage(employees, 'emailSentDate');
            const emailOpenedDate_P = calculatePhishingFilledPercentage(employees, 'emailOpenedDate');
            const clickedLinkDate_P = calculatePhishingFilledPercentage(employees, 'clickedLinkDate');
            const submittedDataDate_P = calculatePhishingFilledPercentage(employees, 'submittedDataDate');
            const emailReportedDate_P = calculatePhishingFilledPercentage(employees, 'emailReportedDate');

            const colors = [
                emailSentDate_P > 80 ? 'green' : emailSentDate_P > 50 ? 'yellow' : 'red',
                emailOpenedDate_P < 10 ? 'green' : emailOpenedDate_P < 33 ? 'yellow' : 'red',
                clickedLinkDate_P < 5 ? 'green' : clickedLinkDate_P < 15 ? 'yellow' : 'red',
                submittedDataDate_P === 0 ? 'green' : submittedDataDate_P <= 5 ? 'yellow' : 'red',
                emailReportedDate_P > 50 ? 'green' : emailReportedDate_P >= 33 ? 'yellow' : 'red'
            ]

            setPhishingColor(colors.includes('red') ? 'red' :colors.includes('yellow')  ? 'yellow' : 'green');
        } else {
            setPhishingColor('grey');
        }
    }, [employees]);

    useEffect(() => {
        if(isPaid) {
            const result = groupDuplicates(findings);
            if(findingsResolved){
                const result_resolved = groupDuplicates(findingsResolved);
                setFilteredFindingsResolved(result_resolved)
            }
            setFilteredFindings(result);


            const result_ignored = groupDuplicates(ignoredFindingsS ? ignoredFindingsS : []);
            setIgnoredFindings(result_ignored);
        } else {
            const result = findings?.map(item => [item]);
            setFilteredFindings(result);
            setFilteredFindingsResolved([]);
        }

        setGlobalColor(findGlobalColor(findings, phishingColor));
    }, [findings, findingsResolved, phishingColor, isPaid, ignoredFindingsS]);

    const loadData = async () => {
        if(canLoadFinding) {
            type findingsType = {emails: number[], emails_server: number[], phones: number[], webs: number[], cards: number[]};
            const getAssetsIds = async (has_credit_card?: boolean): Promise<findingsType> => {
                let result: findingsType = {
                    emails: [],
                    emails_server: [],
                    phones: [],
                    webs: [],
                    cards: []
                };

                try {
                    const data: any = await Promise.all(
                        has_credit_card ?
                            [getOrganisationEmailApi(), getOrganisationEmailServerApi(), getOrganisationPhonesApi(), getOrganisationWebApi(), getCreditCardApi()] :
                            [getOrganisationEmailApi(), getOrganisationEmailServerApi(), getOrganisationPhonesApi(), getOrganisationWebApi()]
                    );

                    if(data?.length) {
                        if(data[0]?.length) {
                            data[0].forEach((item: any) => {
                                item?.id && result.emails.push(item?.id);
                            })
                        } else {
                            result.emails = [];
                        }

                        if(data[1]?.length || data[1]?.id) {
                            if(data[1]?.id) {
                                result.emails_server.push(data[1]?.id);
                            } else {
                                data[1].forEach((item: any) => {
                                    item?.id && result.emails_server.push(item?.id);
                                })
                            }
                        } else {
                            result.emails_server = [];
                        }

                        if(data[2]?.length) {
                            data[2].forEach((item: any) => {
                                item?.id && result.phones.push(item?.id);
                            })
                        } else {
                            result.phones = [];
                        }

                        if(data[3]?.length) {
                            data[3].forEach((item: any) => {
                                item?.id && result.webs.push(item?.id);
                            })
                        } else {
                            result.webs = [];
                        }

                        if(data[4]?.length) {
                            data[4].forEach((item: any) => {
                                item?.id && result.cards.push(item?.id);
                            })
                        } else {
                            result.cards = [];
                        }
                    }
                    return result;
                } catch (e) {
                    console.log(e);
                    return result;
                }
            }
            const loadPaidFindings = async () => {
                const assets = await getAssetsIds(true);
                currentId?.id ? dispatch.phishing.getCampaignById(currentId?.id).then() :
                                dispatch.phishing.getCurrentCampaign().then();

                try {
                    const emails_requests = assets.emails.map(id => getEmailFindingApi(id));
                    const emails_server_requests = assets.emails_server.map(id => getEmailServerFindingApi(id));
                    const phones_requests = assets.phones.map(id => getPhoneFindingApi(id));
                    const webs_requests = assets.webs.map(id => getWebFindingApi(id));
                    const cards_requests = assets.cards.map(id => getCreditCardFindingApi(id));

                    let request = await Promise.all(
                        [...emails_requests, ...emails_server_requests, ...phones_requests, ...webs_requests, ...cards_requests]
                    );

                    request = request.map((el, index) => {
                        if (index < emails_requests.length) {
                            return el.map((el: any) => {
                                return { ...el, request_type: 'email' };
                            })
                        } if (index < emails_server_requests.length + emails_requests.length) {
                            return el.map((el: any) => {
                                return { ...el, request_type: 'email_server' };
                            })
                        } else if (index < emails_requests.length + phones_requests.length + emails_server_requests.length) {
                            return el.map((el: any) => {
                                return { ...el, request_type: 'phone' };
                            })
                        } else if (index < emails_requests.length + phones_requests.length + webs_requests.length + emails_server_requests.length) {
                            return el.map((el: any) => {
                                return { ...el, request_type: 'web' };
                            })
                        } else {
                            return el.map((el: any) => {
                                return { ...el, request_type: 'credit' };
                            })
                        }
                    });

                    const sort_order = ["NETWORK", "WEB_PRESENCE", "MAIL", "DATA_LEAK"];
                    const result = [].concat(...request).filter((el: any) => el?.status === "ACTIVE")
                        .sort((a:any, b:any) => {
                            return sort_order.indexOf(a.tag) - sort_order.indexOf(b.tag);
                        });

                    const ignored_findings = [].concat(...request).filter((el: any) => el?.status === "IGNORED")
                        .sort((a:any, b:any) => {
                            return sort_order.indexOf(a.tag) - sort_order.indexOf(b.tag);
                        });

                    const resolved_findings = [].concat(...request).filter((el: any) => el?.status === "NO_LONGER_DETECTED")
                        .sort((a:any, b:any) => {
                            return sort_order.indexOf(a.tag) - sort_order.indexOf(b.tag);
                        });

                    dispatch.dashboard.changeDashboard(result);
                    dispatch.dashboard.changeDashboardResolved(resolved_findings);
                    dispatch.dashboard.changeDashboardIgnored(ignored_findings);

                    const last = await getLastPaidScanApi();
                    if(last?.finishedAt) {
                        setLastScanDate(last?.finishedAt);
                    }

                    console.log('result_paid----', result);
                } catch (e) {
                    console.log(e);
                }
            }

            const loadFreeFindings = async () => {
                const assets = await getAssetsIds(false);

                try {
                    const emails_requests = assets.emails.map(id => getFreeEmailFindingApi(id));
                    const emails_server_requests = assets.emails_server.map(id => getFreeEmailServerFindingApi(id));
                    const phones_requests = assets.phones.map(id => getFreePhoneFindingApi(id));
                    const webs_requests = assets.webs.map(id => getFreeWebFindingApi(id));
                    const request = await Promise.all(
                        [...emails_requests, ...emails_server_requests, ...phones_requests, ...webs_requests]
                    );

                    const sort_order = ["NETWORK", "WEB_PRESENCE", "MAIL", "DATA_LEAK"];
                    const result = [].concat(...request).sort((a:any, b:any) => {
                        return sort_order.indexOf(a.tag) - sort_order.indexOf(b.tag);
                    });

                    dispatch.dashboard.changeDashboard(result);
                    dispatch.dashboard.changeDashboardResolved([]);

                    const last = await getLastFreeScanApi();
                    if(last?.finishedAt) {
                        setLastScanDate(last?.finishedAt);
                    }

                    console.log('result_free----', result);
                } catch (e) {
                    console.log(e);
                }
            }

            isPaid ? loadPaidFindings().then() : loadFreeFindings().then();
        }
    }

    useEffect(() => {
        loadData().then();
    }, [isPaid, canLoadFinding, locale])

    const exportRisks = async () => {
        try {
            dispatch.common.setLoadingModal(true);
            const subscription = subscriptions.find(el =>
                el?.subscriptionPlan?.name === 'STANDARD');
            const organisation_data = await getAccountOrganisationDataApi();
            const organisation_name = organisation_data?.length ? organisation_data[0]?.name : '';

            const webs = await dispatch.monitoring.getWeb();
            const questionnaire = await dispatch.monitoring.getQuestionnaire();
            const email = await dispatch.monitoring.getEmail();

            const blob_response = await exportFindingsApi({
                body: await exportBodyGeneration({
                    account: accountData,
                    organisation_data,
                    subscription,
                    lastLoginDate,
                    lastScanDate,
                    globalColor,
                    findings,
                    phishingColor,
                    webs,
                    questionnaire,
                    email
                }),
                header: await exportHeaderGeneration({
                    organisation_name,
                    export_date: tPDF('export_date')
                }),
                footer: exportFooterGeneration({footer_one: tPDF('footer_one'), footer_two: tPDF('footer_two')}),
            });

            const url = window.URL.createObjectURL(blob_response);
            const a = document.createElement('a');
            a.href = url;
            a.download = tPDF('Filename', {company: organisation_data[0]?.name}) +  '.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            dispatch.common.setLoadingModal(false);
        } catch (e) {
            console.log(e);
            dispatch.common.setLoadingModal(false);
        }
    }

    return (
        <div className={css.wrap}>

            <h2>{t('title')}</h2>

            <div className={css.mainBlock}>
                <img src={`/img/icons/attention-${globalColor}.svg`} alt="attention"/>

                <div className={css.texts}>
                    <p>
                        {globalColor === 'red' && t('secondary_title1')}
                        {globalColor === 'yellow' && t('secondary_title2')}
                        {globalColor === 'green' && t('secondary_title3')}
                    </p>
                    {
                        !!lastLoginDate && <>
                            <span>
                                {t('secondary_text_1')} {' '}
                                <Moment date={lastLoginDate} format="DD.MM.YYYY HH:mm"/>
                            </span>
                        </>
                    }
                    {
                        !!lastScanDate && <>
                            <span>
                                {t('secondary_text_2')} {' '}
                                <Moment date={lastScanDate} format="DD.MM.YYYY HH:mm"/>
                            </span>
                        </>
                    }
                </div>
            </div>

            <div className={css.items}>
                <div className={cn(css.item)}>
                    <div className={css.circle}>
                        <img src={`/img/icons/${getFilterColor(findings, 'NETWORK')}-circle.svg`} alt="circle"/>
                        <img src="/img/icons/network.svg" alt="network"/>
                    </div>
                    <p>{t('category_1')}</p>
                </div>
                <div className={cn(css.item)}>
                    <div className={css.circle}>
                        <img src={`/img/icons/${getFilterColor(findings, 'WEB_PRESENCE')}-circle.svg`} alt="circle"/>

                        <img src="/img/icons/planet.svg" alt="planet"/>
                    </div>
                    <p>{t('category_2')}</p>
                </div>
                <div className={cn(css.item)}>
                    <div className={css.circle}>
                        <img src={`/img/icons/${getFilterColor(findings, 'MAIL')}-circle.svg`} alt="circle"/>

                        <img src="/img/icons/mail.svg" alt="mail"/>
                    </div>
                    <p>{t('category_3')}</p>
                </div>
                <div onClick={() => {
                    isPaid && router.push(getMonitoringUrl());
                }} className={cn(css.item, !isPaid && css.grey, isPaid && css.cursor)}>
                    <div className={css.circle}>
                        <img src={`/img/icons/${getFilterColor(findings, 'DATA_LEAK')}-circle.svg`} alt="circle"/>
                        <img src="/img/icons/folder.svg" alt="folder"/>
                    </div>
                    <p>{t('category_4')}</p>
                </div>
                <div onClick={() => {
                    phishingColor !== 'grey' && router.push(getPhishingUrl());
                }} className={cn(css.item, phishingColor === 'grey' && css.grey,  phishingColor !== 'grey' && css.cursor)}>
                    <div className={css.circle}>
                        <img src={`/img/icons/${phishingColor}-circle.svg`} alt="circle"/>
                        <img src="/img/icons/triangle.svg" alt="triangle"/>
                    </div>
                    <p>{t('category_5')}</p>
                </div>
            </div>

            <Accordion className={cn('myAccordion',css.accordion, !isPaid && css.notPaid)}
                       onChange={(e: number) => setIsOpen(e)}
                       allowToggle>
                {!isPaid && <div className={css.bluredWrap}><UpdateModal /></div>}

                {
                    filteredFindings.map((item, i) =>
                        <AccordionDashboardItem isOpenA={isOpen === i}
                                                key={i} onUpdate={loadData}
                                                data={item} list={findings} />)
                }
                {
                    filteredFindingsResolved.map((item, i) =>
                        <AccordionDashboardItemResolved isOpenA={isOpen === i + (filteredFindings?.length ? filteredFindings?.length : 0)}
                                                key={i} onUpdate={() => {}}
                                                data={item} list={findingsResolved} />)
                }
            </Accordion>

            {
                !!ignoredFindings?.length && <>
                    <h3 style={{marginTop: '54px'}}>{tP('ignored_vulnerabilities')}</h3>
                    <Accordion className={cn('myAccordion',css.accordion)}
                               onChange={(e: number) => setIsOpenIgnore(e)} allowToggle>
                        {
                            ignoredFindings.map((item, i) =>
                                <AccordionDashboardItemIgnored isOpenA={isOpenIgnore === i}
                                                               key={i} onUpdate={loadData}
                                                               data={item} list={ignoredFindingsS} />)
                        }
                    </Accordion>


                    { !!findings?.length &&
                        <button className={cn('myBtn', 'small', css.btn)} onClick={exportRisks}>
                            {t('button')}
                            <img src="/img/icons/file.svg" alt="file"/>
                        </button>
                    }
                </>
            }

        </div>
    )
}

export default ItSecurity;
