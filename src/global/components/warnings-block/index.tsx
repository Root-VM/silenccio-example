import {FC, useEffect, useState} from "react";
import cn from "classnames";
import {useRouter} from "next/router";
import {getAlertsUrl} from "@/global/helpers/url-generator";
import css from "./warnings-block.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@/global/store";
import {notificationsCountSelector, notificationsSelector} from "@/modules/alerts/store/selector";
import {useTranslations} from "use-intl";
import {NotificationResponseApiType} from "@/global/api/notifications/types";
import {findNotificationTranslations} from "@/modules/alerts/components/curent-alerts";
import Moment from "react-moment";

const WarningsBlock: FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const count = useSelector(notificationsCountSelector);
    const t = useTranslations('ALERT_BLOCK');
    const tP = useTranslations('ALERTS_PAGE');
    const notifications = useSelector(notificationsSelector);
    const [sortedNotifications, setSortedNotifications] = useState<NotificationResponseApiType[]>([]);
    const {locale} = useRouter();

    useEffect(() => {
        dispatch.notification.getNotificationCount().then()
    }, []);

    useEffect(() => {
        if(notifications?.length) {
            setSortedNotifications(
                notifications.sort((a,b) =>
                    new Date(b?.publishedAt).getTime() - new Date(a?.publishedAt).getTime()
                ).slice(0, 2)
            )
        } else {
            dispatch.notification.getNotification().then();
        }

    }, [notifications]);

    useEffect(() => {
        dispatch.notification.getNotification().then();
    }, [locale]);

    return (
        <div className={css.wrap}>
            <p className={css.title}>
                {tP('title')}

                {
                    !!count && <span>{count}</span>
                }
            </p>

            {
                sortedNotifications?.map((notification, i) => (
                    <p key={i} className={css.text}>
                        <span><Moment date={notification?.publishedAt} format="DD.MM.YY" />:</span>
                        <span>{findNotificationTranslations(locale, notification?.postNotificationTranslations).title}</span>
                    </p>
                ))
            }

            <button onClick={() => router.push(getAlertsUrl())}
                className={cn('myBtn', 'small', css.btn)}>{t('btn')}</button>
        </div>
    )
}

export default WarningsBlock;
