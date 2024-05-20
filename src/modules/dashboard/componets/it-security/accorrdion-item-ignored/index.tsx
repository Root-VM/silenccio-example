import {FC, useState} from "react";
import cn from "classnames";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel, Popover,
    PopoverTrigger
} from "@chakra-ui/react";
import Moment from "react-moment";
import {useTranslations} from "use-intl";

import css from "./accorrdion-item-ignored.module.scss";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {
    ignoreCreditcardScanApi,
    ignoreEmailScanApi,
    ignoreEmailServerScanApi,
    ignorePhoneScanApi,
    ignoreWebScanApi
} from "@/global/api/finding";
import {successAlert} from "@/global/helpers/success-alert";
const AccordionDashboardItemIgnored: FC<{isOpenA: boolean, data: any, list: any[], onUpdate: () => void}> = ({isOpenA, data, list, onUpdate}) => {
    const tLost = useTranslations('LOST_DATA');
    const dispatch = useDispatch<Dispatch>();
    const [isOpen, setIsOpen] = useState(-1);
    const tP = useTranslations('PROFILE_PAGE');

    const onIgnore = async () => {
        try {
            for (let item of data) {
                dispatch.common.setLoadingModal(true);

                if(item?.request_type === 'email') {
                    await ignoreEmailScanApi(item?.id, 'ACTIVE');
                }
                if(item?.request_type === 'email_server') {
                    await ignoreEmailServerScanApi(item?.id, 'ACTIVE');
                }
                if(item?.request_type === 'phone') {
                    await ignorePhoneScanApi(item?.id, 'ACTIVE');
                }
                if(item?.request_type === 'web') {
                    await ignoreWebScanApi(item?.id, 'ACTIVE');
                }
                if(item?.request_type === 'credit') {
                    await ignoreCreditcardScanApi(item?.id, 'ACTIVE');
                }

                // successAlert(tLost('dashboard_success_ignored'));
                dispatch.common.setLoadingModal(false);
            }

            onUpdate && onUpdate();
        } catch (e) {
            dispatch.common.setLoadingModal(false);
        }
    }


    return (
        <AccordionItem className={css.accordion}>

            <AccordionButton className={cn(css.titleBntn, css.title_t)}>
                <div className={css.title_p}>
                    {
                        data[0]?.tag === "NETWORK" &&
                        <div className={cn(css.icon, css.grey)}>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <img src="/img/icons/network.svg" alt="network"/>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    }
                    {
                        data[0]?.tag === "WEB_PRESENCE" &&
                        <div className={cn(css.icon, css.grey)}>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <img src="/img/icons/planet.svg" alt="network"/>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    }
                    {
                        data[0]?.tag === "MAIL" &&
                        <div className={cn(css.icon, css.grey)}>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <img src="/img/icons/mail.svg" alt="network"/>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    }
                    {
                        data[0]?.tag === "DATA_LEAK" &&
                        <div className={cn(css.icon, css.grey)}>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <img src="/img/icons/folder.svg" alt="network"/>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    }

                    {data[0]?.name}
                    {
                        !!isOpenA &&
                        <span>
                                {tLost('dashboard_vulnerability_last_discovered')}: {' '}
                            <Moment date={data[0]?.lastDetected} format="DD.MM.YYYY"/>

                    </span>
                    }
                </div>

                <button style={{whiteSpace: 'nowrap', marginRight: '20px'}} onClick={onIgnore}
                        className={cn('myBtn', 'white', 'small')}>
                    {tP('activate')}
                </button>
            </AccordionButton>
            <AccordionPanel>
                <div className={css.acBlock}>
                    <div className={css.texts}>
                        <div className={css.text}>
                        <p>{tLost('dashboard_influence_title')}</p>
                            <span>{data[0]?.description?.cLevel?.cause}</span>
                        </div>
                        <div className={css.text}>
                            <p>{tLost('dashboard_what_can_happen_title')}</p>
                            <span>{data[0]?.description?.cLevel?.meaning}</span>
                        </div>
                    </div>
                </div>

                <Accordion onChange={(e: number) => setIsOpen(e)}
                           className={cn('myAccordion', 'simple', css.accordionContent)} allowToggle>
                    <AccordionItem>
                        <AccordionButton className={css.aBtn}>
                            {
                                isOpen === -1 ? tLost('dashboard_expert_mode_title') :
                                    tLost('dashboard_expert_mode_expanded')
                            }

                        </AccordionButton>

                        <AccordionPanel>
                            <div className={css.acBlock}>
                                <div className={css.texts}>
                                    <div className={cn(css.text, css.detail_b)}>
                                        <p>{tLost('dashboard_expert_mode_headline')}</p>
                                        {
                                            data?.map((el: any, i: number) =>
                                                <span key={i}>
                                                    {el?.description?.technical}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </AccordionPanel>
        </AccordionItem>
    )
}

export default AccordionDashboardItemIgnored;
