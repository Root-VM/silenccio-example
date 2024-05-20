import {FC} from "react";
import Footer from "@/global/components/footer/footer";

import css from './got-catch.module.scss';
import {useTranslations} from "use-intl";

const GotCatch: FC= () => {
    const t = useTranslations('PHISHING_GOT_CATCH_PAGE');

    return (
        <div className={css.wrap}>
            <section className={css.header}>
                <img src="/img/logo.svg" alt="logo"/>
            </section>

            <section className={css.main}>
                <h2>{t('title')}</h2>
                <p>{t('text')}</p>
                <div className={css.block}>
                    <img src="/img/icons/attention-red.svg" alt="attention"/>
                    <div>
                        <strong>{t('info_s')}</strong>
                        <p>{t('info')}</p>
                    </div>
                </div>
            </section>

            <section className={css.cards}>
                <div className={css.item}>
                    <h4>{t('card_1_title')}</h4>
                    <p>{t('card_1_text')}</p>
                    <ul>
                        <li>{t('card_1_item_1')}</li>
                        <li>{t('card_1_item_2')}</li>
                        <li>{t('card_1_item_3')}</li>
                        <li>{t('card_1_item_4')}</li>
                        <li>{t('card_1_item_5')}</li>
                    </ul>
                </div>
                <div className={css.item}>
                    <h4>{t('card_2_title')}</h4>
                    <ul>
                        <li>{t('card_2_item_1')}</li>
                        <li>{t('card_2_item_2')}</li>
                        <li>{t('card_2_item_3')}</li>
                        <li>{t('card_2_item_4')}</li>
                    </ul>
                </div>
                <div className={css.item}>
                    <h4>{t('card_3_title')}</h4>
                    <ul>
                        <li>{t('card_3_item_1')}</li>
                        <li>{t('card_3_item_2')}</li>
                        <li>{t('card_3_item_3')}</li>
                        <li>{t('card_3_item_4')}</li>
                        <li>{t('card_3_item_5')}</li>
                    </ul>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default GotCatch;
