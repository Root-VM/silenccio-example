import {FC, useState} from "react";
import cn from "classnames";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel, Popover, PopoverBody,
    PopoverContent,
    PopoverTrigger
} from "@chakra-ui/react";
import Moment from "react-moment";
import {useTranslations} from "use-intl";

import css from "./accorrdion-item.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {
    ignoreCreditcardScanApi,
    ignoreEmailScanApi,
    ignoreEmailServerScanApi,
    ignorePhoneScanApi,
    ignoreWebScanApi,
    supportCreditcardScanApi,
    supportEmailScanApi,
    supportEmailServerScanApi,
    supportPhoneScanApi,
    supportWebScanApi
} from "@/global/api/finding";
import {successAlert} from "@/global/helpers/success-alert";
import {isPaidSelector} from "@/global/store/payment/selector";
import {getFilterColor} from "@/global/helpers/filter-color";
const AccordionDashboardItem: FC<{isOpenA: boolean, data: any, list: any[], onUpdate: () => void}> = ({isOpenA, data, list, onUpdate}) => {
    const tLost = useTranslations('LOST_DATA');
    const dispatch = useDispatch<Dispatch>();
    const isPaid = useSelector(isPaidSelector);
    const [isOpen, setIsOpen] = useState(-1);
    const t = useTranslations('INTRO_INFO_AUTHENTICATION_PAGE');

    const onIgnore = async () => {
        try {
            for (let item of data) {
                dispatch.common.setLoadingModal(true);

                if(item?.request_type === 'email') {
                    await ignoreEmailScanApi(item?.id, 'IGNORED');
                }
                if(item?.request_type === 'email_server') {
                    await ignoreEmailServerScanApi(item?.id, 'IGNORED');
                }
                if(item?.request_type === 'phone') {
                    await ignorePhoneScanApi(item?.id, 'IGNORED');
                }
                if(item?.request_type === 'web') {
                    await ignoreWebScanApi(item?.id, 'IGNORED');
                }
                if(item?.request_type === 'credit') {
                    await ignoreCreditcardScanApi(item?.id, 'IGNORED');
                }

                successAlert(tLost('dashboard_success_ignored'));
                dispatch.common.setLoadingModal(false);
            }

            onUpdate && onUpdate();
        } catch (e) {
            dispatch.common.setLoadingModal(false);
        }
    }

    const onSupport = async () => {
        try {
            for (let item of data) {
                dispatch.common.setLoadingModal(true);

                if(item?.request_type === 'email') {
                    await supportEmailScanApi(item?.id);
                }
                if(item?.request_type === 'email_server') {
                    await supportEmailServerScanApi(item?.id);
                }
                if(item?.request_type === 'phone') {
                    await supportPhoneScanApi(item?.id);
                }
                if(item?.request_type === 'web') {
                    await supportWebScanApi(item?.id);
                }
                if(item?.request_type === 'credit') {
                    await supportCreditcardScanApi(item?.id);
                }

                successAlert(tLost('dashboard_support_ask_success'));
                dispatch.common.setLoadingModal(false);
            }
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
                        <div className={cn(css.icon, css[getFilterColor(list, 'NETWORK')])}>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <img src="/img/icons/network.svg" alt="network"/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverBody className={cn('myPopover', css.popoverContent)}>
                                        <span className={css.red}>{t('info_text')}</span>
                                        <span className={css.yellow}>{t('info_text_2')}</span>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </div>
                    }
                    {
                        data[0]?.tag === "WEB_PRESENCE" &&
                        <div className={cn(css.icon, css[getFilterColor(list, 'WEB_PRESENCE')])}>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <img src="/img/icons/planet.svg" alt="network"/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverBody className={cn('myPopover', css.popoverContent)}>
                                        <span className={css.red}>{t('info_text')}</span>
                                        <span className={css.yellow}>{t('info_text_2')}</span>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </div>
                    }
                    {
                        data[0]?.tag === "MAIL" &&
                        <div className={cn(css.icon, css[getFilterColor(list, 'MAIL')])}>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <img src="/img/icons/mail.svg" alt="network"/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverBody className={cn('myPopover', css.popoverContent)}>
                                        <span className={css.red}>{t('info_text')}</span>
                                        <span className={css.yellow}>{t('info_text_2')}</span>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </div>
                    }
                    {
                        data[0]?.tag === "DATA_LEAK" &&
                        <div className={cn(css.icon, css[getFilterColor(list, 'DATA_LEAK')])}>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <img src="/img/icons/folder.svg" alt="network"/>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverBody className={cn('myPopover', css.popoverContent)}>
                                        <span className={css.red}>{t('info_text')}</span>
                                        <span className={css.yellow}>{t('info_text_2')}</span>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </div>
                    }

                    {data[0]?.name}

                    {
                        !data[0]?.name && !isPaid && 'Lorem Ipsum has been the industrys standard dummy text ever since '
                    }

                    <span>{isOpenA}</span>
                    {
                        isPaid && !!isOpenA &&
                        <span>
                                {tLost('dashboard_vulnerability_last_discovered')}: {' '}
                            <Moment date={data[0]?.lastDetected} format="DD.MM.YYYY"/>

                    </span>
                    }
                </div>

                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/i.svg" alt="question" className={css.popover}/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className={cn('myPopover', css.popoverContent)}>
                            {tLost('dashboard_tip')}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
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

                    <button onClick={onIgnore} className={cn('myBtn', 'white', 'small')}>
                        {tLost('dashboard_ignore_btn')}
                    </button>
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

                                <button onClick={onSupport}
                                    className={cn('myBtn', 'white', 'small')}>
                                    {tLost('dashboard_help_btn')}
                                </button>
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </AccordionPanel>
        </AccordionItem>
    )
}

export default AccordionDashboardItem;
