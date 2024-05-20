import {FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import cn from "classnames";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel, Popover, PopoverBody,
    PopoverContent,
    PopoverTrigger
} from "@chakra-ui/react";

import css from "./curent-alerts.module.scss";
import {markNotificationAsReadApi} from "@/global/api/notifications";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {notificationsCountSelector, notificationsSelector} from "@/modules/alerts/store/selector";
import Moment from "react-moment";
import {NotificationResponseApiType, PostNotificationTranslationsType} from "@/global/api/notifications/types";
import {useTranslations} from "use-intl";
import {useRouter} from "next/router";

export const findNotificationTranslations = (lang : string | undefined, notification: NotificationResponseApiType['postNotificationTranslations']) => {
    const find = notification.find(item => item.language === lang?.toUpperCase());

    return find ? find : notification[0];
}

const NotificationIframe: FC<{ content: PostNotificationTranslationsType }> = ({ content }) => {
    const shadowRef_potentialRisks = useRef<any>(null);
    const shadowRef_recommendedAction = useRef<any>(null);
    const shadowRef_whatIsAffected = useRef<any>(null);
    const t = useTranslations('ALERTS_PAGE');

    useEffect(() => {
        if (shadowRef_potentialRisks?.current && content?.potentialRisks) {
            const existingShadowRoot = shadowRef_potentialRisks.current.shadowRoot;

            if (existingShadowRoot) {
                existingShadowRoot.innerHTML = content?.potentialRisks;
            } else {
                const shadowRoot = shadowRef_potentialRisks.current.attachShadow({ mode: 'open' });
                const div = document.createElement('div');
                div.innerHTML = content?.potentialRisks;

                shadowRoot.appendChild(div);
            }
        }
        if (shadowRef_recommendedAction?.current && content?.recommendedAction) {
            const existingShadowRoot = shadowRef_recommendedAction.current.shadowRoot;

            if (existingShadowRoot) {
                existingShadowRoot.innerHTML = content?.recommendedAction;
            } else {
                const shadowRoot = shadowRef_recommendedAction.current.attachShadow({ mode: 'open' });
                const div = document.createElement('div');
                div.innerHTML = content?.recommendedAction;

                shadowRoot.appendChild(div);
            }
        }
        if (shadowRef_whatIsAffected?.current && content?.whatIsAffected) {
            const existingShadowRoot = shadowRef_whatIsAffected.current.shadowRoot;

            if (existingShadowRoot) {
                existingShadowRoot.innerHTML = content?.whatIsAffected;
            } else {
                const shadowRoot = shadowRef_whatIsAffected.current.attachShadow({ mode: 'open' });
                const div = document.createElement('div');
                div.innerHTML = content?.whatIsAffected;

                shadowRoot.appendChild(div);
            }
        }
    }, [content]);

    return (
        <>
            <div className='isolate' ref={shadowRef_potentialRisks}/>
            <div className='isolate' ref={shadowRef_recommendedAction}/>
            <div className='isolate' ref={shadowRef_whatIsAffected}/>
            <div className={css.cve}>
                <strong>
                    CVE(s)
                </strong>
                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/question.svg" alt="network"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className={cn('myPopover', css.popoverContent)}>
                            <span className={css.yellow}>{t('CVE_flyover')}</span>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <span>{content?.cve}</span>
            </div>
        </>
    );
};

const CurentAlerts: FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const count = useSelector(notificationsCountSelector);
    const notifications = useSelector(notificationsSelector);
    const [sortedNotifications, setSortedNotifications] = useState<NotificationResponseApiType[]>([]);
    const {locale} = useRouter();
    const t = useTranslations('ALERTS_PAGE');

    useEffect(() => {
        dispatch.notification.getNotification().then();
    }, [locale]);

    useEffect(() => {
        console.log(222, notifications)
        notifications?.length && setSortedNotifications(
            notifications.sort((a,b) =>
                new Date(b?.publishedAt).getTime() - new Date(a?.publishedAt).getTime()
            )
        )
    }, [notifications]);

    useEffect(() => {
        const markAsRead = async () => {
            try {
                if(notifications.length) {
                    const notRead = notifications.filter(item => !item.read);
                    if(notRead.length) {
                        for(let i=0; i < notRead.length; i++) {
                            await markNotificationAsReadApi(notRead[i].id);
                        }
                        await dispatch.notification.getNotification();
                        await dispatch.notification.getNotificationCount();
                    }
                }
            } catch(e) {
                console.log(e)
            }
        }

        markAsRead().then();
    }, [notifications]);

    return (
        <div className={css.wrap}>
            <h2>
                {t('title')}
                {
                    !!count && <span>{count}</span>
                }
            </h2>

            <div className={css.accordionTitles}>
                <p>{t('table_title_1')}</p>
                <p>{t('table_title_2')}</p>
            </div>
            <Accordion className={cn('myAccordion', 'simple', css.accordion)} allowToggle>
                {
                    sortedNotifications.map((item, index) => (
                        <AccordionItem key={index}>
                            <AccordionButton className={css.accordionBtn}>
                                <p>
                                    <Moment date={item?.publishedAt} format="DD.MM.YY" />
                                </p>
                                <p>{!item.read && "NEU"}</p>
                                <p>{item?.postNotificationTranslations[0].title}</p>
                            </AccordionButton>
                            <AccordionPanel>
                                <div className={css.texts}>
                                    <NotificationIframe
                                        content={item?.postNotificationTranslations[0]}/>
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>
    )
}

export default CurentAlerts;
