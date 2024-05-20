import {FC, useEffect, useState} from "react";
import {Progress} from '@chakra-ui/react'
import {initialScanApi} from "@/global/api/scans/initial";
import {useRouter} from "next/router";
import {getDashboardUrl} from "@/global/helpers/url-generator";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";
import {setLoginToken} from "@/global/api/tokens";

import css from "./intro-info-block.module.scss";
import {useTranslations} from "use-intl";
import {getLastFreeScanApi} from "@/global/api/finding";

const IntroInfoBlock: FC = () => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<Dispatch>();
    const t = useTranslations('INTRO_INFO_AUTHENTICATION_PAGE');

    useEffect(() => {
        const loadScan = async () => {
            try {
                const scan = await getLastFreeScanApi();

                if(scan?.state === 'FINISHED') {
                    setProgress(100);
                    setLoading(false);
                    await router.replace(getDashboardUrl());
                } else {
                    setTimeout(() => loadScan(), 1000);
                }
            } catch (e) {
                console.log('error', e);
            }
        }
        const init = async () => {
            try {
                setLoading(true);

                await initialScanApi();
                dispatch.authentication.clearAll();

                const token_data =  localStorage.getItem('accessToken');
                const parsed_token_data = token_data && JSON.parse(token_data);

                if(!!parsed_token_data) {
                    setLoginToken(parsed_token_data?.expiresAt, parsed_token_data?.data);
                }

                await loadScan();
            } catch (e) {
                console.log('error', e);
                setLoading(false);
                setProgress(100);
            }
        }

        init().then();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 90) {
                setProgress(prevProgress => prevProgress + 1);
            } else {
                clearInterval(interval);
            }
        }, 340);

        return () => clearInterval(interval);
    }, [progress]);

    return (
        <div className={css.wrap}>
            <h2>{t('title')}</h2>
            <p className={css.text}>{t('text')}</p>

            <Progress className={'myProgress'} value={progress} isAnimated/>
            <p className={css.progressNumber}>{progress}%</p>

            <p className={css.secondaryText}>{t('secondary_text')}</p>

            <div className={css.textBlock}>
                <img src="/img/icons/attention-red.svg" alt="attention"/>
                <p>{t('info_text')}</p>
            </div>

            <div className={css.textBlock}>
                <img src="/img/icons/attention-yellow.svg" alt="attention"/>
                <p>{t('info_text_2')}</p>
            </div>

            <p className={css.secondaryText}><strong>{t('end_text')}</strong> <br/> {t('end_text_2')}</p>
        </div>
    )
}

export default IntroInfoBlock;
