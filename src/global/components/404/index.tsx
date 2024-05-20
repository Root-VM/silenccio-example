import {FC} from "react";

import css from "./404.module.scss";
import {useTranslations} from "use-intl";

const NotFoundComponent: FC = () => {
    const t = useTranslations('404_PAGE');

    return (
        <div className={css.wrap}>
            <header className="o-header">
                <div className="m-header-main">
                    <div className="m-header-main__box">
                        <div className="m-header-logo">
                            <a className="m-header-logo__link" href="/">
                                <img className="m-header-logo__img" src="/img/logo.svg" alt="AXA Logo" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="m-page-section m-page-section--padded m-page-section--bluebackxground">
                <div className="m-error">
                    <h1 className="m-error__heading">{t('title_1')}</h1>
                    <p className="m-error__message">{t('text_1')}</p>
                    <p className="m-error__greet">{t('info_1')}</p><a className="m-link m-link--motion m-link--arrow" href="mailto:content@axa.ch">
                    <svg viewBox="0 0 24 24" focusable="false" className="m-link__arrow chakra-icon css-onkibi"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    {t('link_1')}</a>

                </div>
                <div className="m-error">
                    <h1 className="m-error__heading">{t('title_2')}</h1>
                    <p className="m-error__message">{t('text_2')}</p>
                    <p className="m-error__greet">{t('info_2')}</p><a className="m-link m-link--motion m-link--arrow" href="mailto:content@axa.ch">
                    <svg viewBox="0 0 24 24" focusable="false" className="m-link__arrow chakra-icon css-onkibi"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    {t('link_2')}</a>
                </div>
                <div className="m-error">
                    <h1 className="m-error__heading">{t('title_3')}</h1>
                    <p className="m-error__message">{t('text_3')}</p>
                    <p className="m-error__greet">{t('info_3')}</p><a className="m-link m-link--motion m-link--arrow" href="mailto:content@axa.ch">
                    <svg viewBox="0 0 24 24" focusable="false" className="m-link__arrow chakra-icon css-onkibi"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    {t('link_3')}</a>
                </div>
                <div className="m-error">
                    <h1 className="m-error__heading">{t('title_4')}</h1>
                    <p className="m-error__message">{t('text_4')}</p>
                    <p className="m-error__greet">{t('info_4')}</p><a className="m-link m-link--motion m-link--arrow" href="mailto:content@axa.ch">
                    <svg viewBox="0 0 24 24" focusable="false" className="m-link__arrow chakra-icon css-onkibi"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    {t('link_4')}</a>
                </div>
            </div>

            <footer className="o-footer">
                <div className="m-footer-sub">
                    <div className="m-footer-sub__box">
                        <div className="m-footer-sub__row">
                            <div className="m-footer-legals">
                                <span className="m-footer-legals__copy" id="copy">{t('footer')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default NotFoundComponent;
