import {FC, useState} from "react";
import cn from "classnames";

import css from "./onepager-content.module.scss";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import {useTranslations} from "use-intl";
import {useRouter} from "next/router";
import {getRegistrationUrl} from "@/global/helpers/url-generator";

const OnePagerContent: FC = () => {
    const t = useTranslations('ONEPAGER_PAGE');
    const [showMore, setShowMore] = useState(false);
    const router = useRouter();

    return (
        <div className={css.wrap}>
            <section className={css.main}>
                <p className={css.text}>{t('title')}</p>
                <h1>{t('text_b')} <br/>  {t('text')}</h1>
            </section>

            <section className={css.info}>
                <h2>{t('info_title')}</h2>
                <p className={css.text}>{t('info_text')}</p>
                <ul>
                    <li>
                        <img src="/img/icons/check.svg" alt="check"/>
                        <p>{t('list_1')}</p>
                    </li>
                    <li>
                        <img src="/img/icons/check.svg" alt="check"/>
                        <p>{t('list_2')}</p>
                    </li>
                    <li>
                        <img src="/img/icons/check.svg" alt="check"/>
                        <p>{t('list_3')}</p>
                    </li>
                </ul>
                <button onClick={() => router.push(getRegistrationUrl())}
                        className={cn('myBtn', css.btn)}>{t('list_btn')}</button>
            </section>

            <section className={css.cards}>
                <div className={css.card}>
                    <p className={css.title}>{t('card_1_title')}</p>
                    <p className={css.text}>{t('card_1_text')}</p>
                    <a href="#">{t('card_1_link')}</a>
                </div>
                <div className={css.card}>
                    <p className={css.title}>{t('card_2_title')}</p>
                    <p className={css.text}>{t('card_2_text')}</p>
                    <a href="#">{t('card_2_link')}</a>
                </div>
                <div className={css.card}>
                    <p className={css.title}>{t('card_3_title')}</p>

                    <p className={css.text}>{t('card_3_text')}</p>
                    <a href="#">{t('card_3_link')}</a>
                </div>
            </section>

            <section className={css.content}>
                <h2>{t('content_title')}</h2>
                <p className={css.text}>{t('content_text')}</p>
                <p className={css.text}>
                    <i>{t('content_network_title')}</i> <br/>
                    {t('content_network_text')}
                </p>
                <p className={css.text}>
                    <strong>{t('content_network_benefits_bold')}</strong>
                    {t('content_network_benefits')}
                </p>
                <p className={css.text}>
                    <i>{t('content_WebsiteEmail_title')}</i> <br/>
                    {t('content_WebsiteEmail_text')}
                </p>
                <p className={css.text}>
                    <strong>{t('content_WebsiteEmail_benefits_bold')}</strong>
                    {t('content_WebsiteEmail_benefits')}
                </p>
                <p className={css.text}>
                    <i>{t('content_DataTheft_title')}</i> <br/>
                    {t('content_DataTheft_text')}
                </p>
                <p className={css.text}>
                    <strong>{t('content_DataTheft_benefits_bold')}</strong>
                    {t('content_DataTheft_benefits')}
                </p>
                <p className={css.text}>
                    <i>{t('content_Phishing_title')}</i> <br/>
                    {t('content_Phishing_text')}
                </p>
                <p className={cn(css.text, css.last)}>
                    <strong>{t('content_Phishing_benefits_bold')}</strong>
                    {t('content_Phishing_benefits')}
                </p>

                <div className={css.box}>
                    <button onClick={() => router.push(getRegistrationUrl())}
                            className={cn('myBtn', css.btn)}>{t('content_btn')}</button>

                    <h2 className={css.lastTitle}>{t('faq')}</h2>


                    <Accordion className={cn('myAccordion', 'simple', css.accordion)} allowToggle>
                        <AccordionItem>
                            <AccordionButton className={css.aBtn}>
                                {t('ac_1_title')}
                            </AccordionButton>
                            <AccordionPanel>
                                <p className={css.aText}>
                                    {t('ac_1_text')}
                                </p>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton className={css.aBtn}>
                                {t('ac_2_title')}
                            </AccordionButton>
                            <AccordionPanel>
                                <p className={css.aText}>
                                    {t('ac_2_text')}
                                </p>
                                <ul>
                                    <li>{t('ac_2_l1')}</li>
                                    <li>{t('ac_2_l2')}</li>
                                    <li>{t('ac_2_l3')}</li>
                                    <li>{t('ac_2_l4')}</li>
                                    <li>{t('ac_2_l5')}</li>
                                </ul>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton className={css.aBtn}>
                                {t('ac_3_title')}
                            </AccordionButton>
                            <AccordionPanel>
                                <p className={css.aText}>
                                    {t('ac_3_text')}
                                </p>
                                <ul>
                                    <li>{t('ac_3_l1')}</li>
                                    <li>{t('ac_3_l2')}</li>
                                    <li>{t('ac_3_l3')}</li>
                                </ul>
                            </AccordionPanel>
                        </AccordionItem>
                        {
                            showMore &&
                            <>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_4_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_4_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_5_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_5_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_6_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_6_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_7_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_7_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_8_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_8_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_9_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_9_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_10_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_10_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_11_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_11_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_12_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_12_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.aBtn}>
                                        {t('ac_13_title')}
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className={css.aText}>
                                            {t('ac_13_text')}
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                            </>
                        }
                    </Accordion>

                    {
                        !showMore &&
                        <button onClick={() => setShowMore(true)}
                                className={cn('myBtn', 'white')}>
                            {t('ac_btn')}
                        </button>
                    }
                </div>

            </section>
        </div>
    )
}

export default OnePagerContent;
